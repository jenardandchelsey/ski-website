'use client';

import { useState } from 'react';
import { UploadCloud, X } from 'lucide-react';

const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
const ACCEPTED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];

export default function QuoteForm(){
  const [isCloset, setIsCloset] = useState(false);
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  function chooseFiles(fileList) {
    const selected = Array.from(fileList || []);
    const invalid = selected.find((file) => !ACCEPTED_TYPES.includes(file.type));
    const totalSize = selected.reduce((sum, file) => sum + file.size, 0);

    if (invalid) {
      setStatus({ type: 'error', message: 'Please upload PDF, JPG, PNG, or WEBP files only.' });
      return;
    }
    if (totalSize > MAX_UPLOAD_BYTES) {
      setStatus({ type: 'error', message: 'Your combined attachments must be 4 MB or less.' });
      return;
    }

    setFiles(selected);
    setStatus({ type: '', message: '' });
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
      <span>or click to browse (PDF, JPG, PNG, WEBP; 4 MB total)</span>
      <input type="file" name="plans" accept=".pdf,.jpg,.jpeg,.png,.webp" multiple onChange={(event) => chooseFiles(event.target.files)} />
    </label>

    {files.length > 0 && <ul className="fileList">{files.map((file) => <li key={`${file.name}-${file.size}`}><span>{file.name}</span><button type="button" aria-label={`Remove ${file.name}`} onClick={() => setFiles((current) => current.filter((item) => item !== file))}><X size={15}/></button></li>)}</ul>}

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

    <textarea name="details" placeholder="Project Details / Notes" rows="5" required/>
    <input className="honeypot" type="text" name="companyWebsite" tabIndex="-1" autoComplete="off" aria-hidden="true"/>
    <button type="submit" disabled={submitting}>{submitting ? 'SENDING...' : 'GET MY FREE QUOTE'}</button>
    {status.message && <p className={`formStatus ${status.type}`} role="status">{status.message}</p>}
  </form>
}
