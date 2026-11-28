const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');

async function loadHandler() {
  const calls = { mail: 0, pdf: 0, zip: 0, key: 0 };
  const context = vm.createContext({
    Response, Buffer, console,
    process: { env: { SMTP_USER: 'test@example.com', SMTP_APP_PASSWORD: 'test-only' } },
  });
  const moduleFromFile = (file) => new vm.SourceTextModule(fs.readFileSync(path.join(root, file), 'utf8'), { context });
  const modules = {
    '../../lib/quote-blocklist': moduleFromFile('app/lib/quote-blocklist.js'),
    '../../lib/project-address': moduleFromFile('app/lib/project-address.js'),
    '../../lib/smtp': new vm.SyntheticModule(['sendSmtpMail'], function () {
      this.setExport('sendSmtpMail', async () => { calls.mail++; });
    }, { context }),
    '../../lib/quote-package': new vm.SyntheticModule(['buildQuoteKey', 'buildQuotePdf', 'buildZip'], function () {
      this.setExport('buildQuoteKey', () => { calls.key++; return 'Test-Quote'; });
      this.setExport('buildQuotePdf', () => { calls.pdf++; return Buffer.from('test PDF'); });
      this.setExport('buildZip', () => { calls.zip++; return Buffer.from('test ZIP'); });
    }, { context }),
  };
  const route = moduleFromFile('app/api/quote/route.js');
  await route.link((specifier) => {
    assert.ok(modules[specifier], `Unexpected import: ${specifier}`);
    return modules[specifier];
  });
  await route.evaluate();
  return { POST: route.namespace.POST, calls };
}

function submission(overrides = {}) {
  const data = new FormData();
  const fields = {
    name: 'Test Customer', email: 'customer@example.com', phone: '9135550123',
    projectStreet: '123 Main St', projectCity: 'Shawnee', projectState: 'KS', projectZip: '66203',
    details: 'Please quote an IKEA kitchen installation.', ...overrides,
  };
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

const blockedContacts = [
  { email: 'connor@automaxrevenue.com' },
  { email: ' CONNOR@AUTOMAXREVENUE.COM ' },
  { email: 'another-salesperson@automaxrevenue.com' },
  { email: 'connor+new@automaxrevenue.com' },
  { email: 'sales@mail.automaxrevenue.com' },
  { phone: '4786062782' },
  { phone: '(478) 606-2782' },
  { phone: '+1 478-606-2782' },
  { phone: '1 (478) 606-2782 ext. 123' },
];

for (const contact of blockedContacts) {
  test(`quietly discards ${JSON.stringify(contact)} before files, PDFs or email`, async () => {
    const { POST, calls } = await loadHandler();
    const data = submission(contact);
    const response = await POST({ formData: async () => ({
      get: (key) => data.get(key),
      getAll: () => { throw Error('Blocked submission reached attachment processing'); },
    }) });
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.deepEqual(calls, { mail: 0, pdf: 0, zip: 0, key: 0 });
  });
}

for (const contact of [
  {},
  { email: 'customer@notautomaxrevenue.com' },
  { email: 'customer@automaxrevenue.com.example.org' },
  { email: 'automaxrevenue.com@example.org' },
  { phone: '4786062783' },
]) {
  test(`preserves legitimate submission ${JSON.stringify(contact)}`, async () => {
    const { POST, calls } = await loadHandler();
    const data = submission(contact);
    const response = await POST({ formData: async () => data });
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true, reference: 'Test-Quote' });
    assert.deepEqual(calls, { mail: 2, pdf: 1, zip: 0, key: 1 });
  });
}

test('preserves existing required-field validation for other visitors', async () => {
  const { POST, calls } = await loadHandler();
  const response = await POST({ formData: async () => submission({ projectStreet: '' }) });
  assert.equal(response.status, 400);
  assert.equal(calls.mail, 0);
  assert.equal(calls.pdf, 0);
});

test('only counts submissions with a server-issued quote reference as leads and conversions', async () => {
  const events = [];
  const context = vm.createContext({ URL, window: {
    location: { href: 'https://swedishkitcheninstallers.com/quote' },
    gtag: (...args) => events.push(args),
  } });
  const analytics = new vm.SourceTextModule(fs.readFileSync(path.join(root, 'app/lib/analytics.js'), 'utf8'), { context });
  await analytics.link(() => { throw Error('Unexpected analytics import'); });
  await analytics.evaluate();
  const { POST } = await loadHandler();
  const blockedData = submission({ email: 'connor@automaxrevenue.com' });
  const discarded = await POST({ formData: async () => blockedData });
  analytics.namespace.trackQuoteSuccess(blockedData, await discarded.json());
  assert.equal(events.length, 0);

  const legitimateData = submission();
  const accepted = await POST({ formData: async () => legitimateData });
  analytics.namespace.trackQuoteSuccess(legitimateData, await accepted.json());
  assert.equal(events.length, 2);
  assert.equal(events[0][1], 'generate_lead');
  assert.equal(events[1][1], 'conversion');
});
