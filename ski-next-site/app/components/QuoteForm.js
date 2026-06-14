import { UploadCloud } from 'lucide-react';
export default function QuoteForm(){
 return <form className="quoteForm"><h3>UPLOAD YOUR KITCHEN PLAN</h3><label className="uploadBox"><UploadCloud size={50}/><strong>Drag & drop your files here</strong><span>or click to browse</span><input type="file" multiple /></label><input placeholder="Full Name"/><input placeholder="Email Address"/><input placeholder="Phone Number"/><select defaultValue=""><option value="" disabled>Service Area</option><option>Kansas City Metro</option><option>Lawrence</option></select><textarea placeholder="Project Details / Notes" rows="5"/><button type="button">GET MY FREE QUOTE</button></form>
}
