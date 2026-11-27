// Keep all checkout authorization and payment processing in the existing SKI service.
export const dynamic='force-dynamic';
const CHECKOUT='https://script.google.com/macros/s/AKfycbwo6wHErZrzc_4xAp_D5aVnIZfYPPGZLg4W47kBzFaLlT-0tlIkLF5WmYvL3W3_5TLj/exec';
const headers={'Cache-Control':'private, no-store','Referrer-Policy':'no-referrer','X-Robots-Tag':'noindex, nofollow','X-Content-Type-Options':'nosniff'};
export function GET(_request,{params}){
  const code=String(params?.code||'');
  if(!/^[A-Za-z0-9_-]{43}$/.test(code))return new Response('Payment link not found.',{status:404,headers});
  const bytes=Buffer.from(code,'base64url');
  if(bytes.length!==32||bytes.toString('base64url')!==code)return new Response('Payment link not found.',{status:404,headers});
  const hex=bytes.toString('hex');
  const uuid=s=>s.slice(0,8)+'-'+s.slice(8,12)+'-'+s.slice(12,16)+'-'+s.slice(16,20)+'-'+s.slice(20);
  const token=uuid(hex.slice(0,32))+uuid(hex.slice(32));
  return new Response(null,{status:307,headers:{...headers,Location:CHECKOUT+'?pay='+encodeURIComponent(token)}});
}
