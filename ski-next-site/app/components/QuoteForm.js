'use client';

import { useEffect, useMemo, useState } from 'react';
import { FileText, Save, UploadCloud, X } from 'lucide-react';
import { buildQuoteKey, buildQuotePdf, buildZip } from '../lib/quote-package';

const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
const MAX_FILES = 10;
const ACCEPTED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];

export default function QuoteForm(){
  const [isCloset, setIsCloset] = useState(false);
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const previews = useMemo(() => files.map((file) => ({ file, url: file.type.startsWith('image/') ? URL.createObjectURL(file) : '' })), [files]);

  useEffect(() => () => previews.forEach((preview) => preview.url && URL.revokeObjectURL(preview.url)), [previews]);

  function chooseFiles(fileList) {
    const selected = Array.from(fileList || []);
    const combined = [...files, ...selected].filter((file, index, all) => all.findIndex((item) => item.name === file.name && item.size === file.size && item.lastModified === file.lastModified) === index);
    const invalid = combined.find((file) => !ACCEPTED_TYPES.includes(file.type));
    const totalSize = combined.reduce((sum, file) => sum + file.size, 0);

    if (combined.length > MAX_FILES) {
      setStatus({ type: 'error', message: `Please upload no more than ${MAX_FILES} files.` });
      return;
    }
    if (invalid) {
      setStatus({ type: 'error', message: 'Please upload PDF, JPG, PNG, or WEBP files only.' });
      return;
    }
    if (totalSize > MAX_UPLOAD_BYTES) {
      setStatus({ type: 'error', message: 'Your combined attachments must be 4 MB or less.' });
      return;
    }

    setFiles(combined);
    setStatus({ type: '', message: '' });
  }

  async function saveQuoteCopy(event) {
    const form = event.currentTarget.form;
    const formData = new FormData(form);
    const submission = {
      name: formData.get('name'), email: formData.get('email'), phone: formData.get('phone'), area: formData.get('area'),
      isCloset: formData.get('isCloset') === 'Yes' ? 'Yes' : 'No', closetType: formData.get('closetType') || 'Not selected',
      designAssistance: formData.get('designAssistance') === 'Yes' ? 'Yes' : 'No', inventoryService: formData.get('inventoryService') === 'Yes' ? 'Yes' : 'No',
      expeditedService: formData.get('expeditedService') === 'Yes' ? 'Yes' : 'No', details: formData.get('details'),
    };
    if (!submission.name) {
      setStatus({ type: 'error', message: 'Enter the customer name before saving a copy.' });
      return;
    }
    const quoteKey = buildQuoteKey(submission);
    const pdf = buildQuotePdf(submission, files.map((file) => file.name));
    const entries = [{ name: `${quoteKey}.pdf`, content: pdf }];
    for (const file of files) entries.push({ name: file.name, content: new Uint8Array(await file.arrayBuffer()) });
    const archive = buildZip(entries);
    const url = URL.createObjectURL(new Blob([archive], { type: 'application/zip' }));
    const link = document.createElement('a');
    link.href = url; link.download = `${quoteKey}-quote-package.zip`; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus({ type: 'success', message: 'Saved a ZIP containing the quote PDF and all uploaded files.' });
  }

  async function submitQuote(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitting(true);
    setStatus({ type: '', message: '' });

    const formData = new FormData(form);
    formData.delete('plans');
    files.forEach((file) => formData.append('plans', file));

    try {
      const response = await fetch('/api/quote', { method: 'POST', body: formData });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Your request could not be sent.');

      form.reset();
      setIsCloset(false);
      setFiles([]);
      setStatus({ type: 'success', message: 'Thank you. Your quote request and attachments were sent to SKI.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return <form className="quoteForm" onSubmit={submitQuote}>
    <h3>UPLOAD YOUR KITCHEN PLAN</h3>
    <p className="formNotice">Share your plan, photos, and project details. We will send everything securely to our quote team.</p>

    <label className="uploadBox" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); chooseFiles(event.dataTransfer.files); }}>
      <UploadCloud size={42}/>
      <strong>Drag & drop your files here</strong>
      <span>or click to browse (up to 10 PDF, JPG, PNG, or WEBP files; 4 MB total)</span>
      <input type="file" name="plans" accept=".pdf,.jpg,.jpeg,.png,.webp" multiple onChange={(event) => { chooseFiles(event.target.files); event.target.value = ''; }} />
    </label>

    {files.length > 0 && <div className="filePreviewGrid">{previews.map(({ file, url }) => <article key={`${file.name}-${file.size}`}><div className="filePreview">{url ? <img src={url} alt=""/> : <FileText size={30}/>}</div><span title={file.name}>{file.name}</span><button type="button" aria-label={`Remove ${file.name}`} onClick={() => setFiles((current) => current.filter((item) => item !== file))}><X size={15}/></button></article>)}</div>}

    <input name="name" placeholder="Full Name" autoComplete="name" required/>
    <input name="email" type="email" placeholder="Email Address" autoComplete="email" required/>
    <input name="phone" type="tel" placeholder="Phone Number" autoComplete="tel" required/>
    <select name="area" defaultValue="" required><option value="" disabled>Service Area</option><option>Kansas City Metro</option><option>Lawrence</option><option>Other / Not Sure</option></select>

    <fieldset className="projectQuestions">
      <legend>A couple quick questions</legend>
      <label><input type="checkbox" name="isCloset" value="Yes" checked={isCloset} onChange={(event) => setIsCloset(event.target.checked)}/><span>Is this for a closet?</span></label>
      {isCloset && <div className="closetChoice"><span>Select the closet type:</span>{['Reach-in Closet', 'Small Walk-in Closet', 'Large Walk-in Closet', 'Master Bedroom Boutique-style'].map((type) => <label key={type}><input type="radio" name="closetType" value={type} required={isCloset}/><span>{type}</span></label>)}<label className="designAssistance"><input type="checkbox" name="designAssistance" value="Yes"/><span>Do you need closet design assistance?</span></label></div>}
      <label><input type="checkbox" name="inventoryService" value="Yes"/><span>Do you want us to perform inventory for you?</span></label>
      <label><input type="checkbox" name="expeditedService" value="Yes"/><span>Do you need expedited services?</span></label>
    </fieldset>

    <textarea name="details" placeholder="Project Details / Notes (optional)" rows="5"/>
    <input className="honeypot" type="text" name="companyWebsite" tabIndex="-1" autoComplete="off" aria-hidden="true"/>
    <div className="formActions"><button type="submit" disabled={submitting}>{submitting ? 'SENDING...' : 'GET MY FREE QUOTE'}</button><button className="saveQuoteButton" type="button" onClick={saveQuoteCopy} title="Download the quote PDF and all selected files in one ZIP"><Save size={18}/> SAVE A COPY</button></div>
    {status.message && <p className={`formStatus ${status.type}`} role="status">{status.message}</p>}
  </form>
}
