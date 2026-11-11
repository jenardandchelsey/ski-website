const ZIP = /^\d{5}(?:-\d{4})?$/;
const STATES = new Set('AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY AS GU MP PR VI'.split(' '));

export function readProjectAddress(formData) {
  const read = (key, limit) => {
    const value = formData.get(key);
    return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ').slice(0, limit) : '';
  };
  const street = read('projectStreet', 180);
  const city = read('projectCity', 80);
  const state = read('projectState', 12).toUpperCase();
  const zip = read('projectZip', 20);
  if (!street || !city || !STATES.has(state) || !ZIP.test(zip)) return '';
  return `${street}\n${city}, ${state} ${zip}`;
}
