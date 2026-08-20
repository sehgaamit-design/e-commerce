// Base64url encoding helper
const base64urlEncode = (str) => {
  const bytes = new TextEncoder().encode(str);
  const binString = String.fromCodePoint(...bytes);
  return btoa(binString)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

// Base64url decoding helper
const base64urlDecode = (str) => {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binString = atob(base64);
  const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0));
  return new TextDecoder().decode(bytes);
};

// Generate mock JWT token
export const generateToken = (payload) => {
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = base64urlEncode(JSON.stringify(header));
  const encodedPayload = base64urlEncode(JSON.stringify(payload));
  
  // Custom mock secret to sign the token signature part
  const secret = "ecommerce_jwt_secret_2026";
  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  const signature = base64urlEncode(signatureInput + secret);
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

// Verify and decode JWT token
export const verifyAndDecodeToken = (token) => {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  
  const [encodedHeader, encodedPayload, signature] = parts;
  
  try {
    const secret = "ecommerce_jwt_secret_2026";
    const expectedSignature = base64urlEncode(`${encodedHeader}.${encodedPayload}${secret}`);
    
    if (signature !== expectedSignature) {
      console.error("JWT token verification failed: Signature mismatch");
      return null;
    }
    
    const payloadStr = base64urlDecode(encodedPayload);
    const payload = JSON.parse(payloadStr);
    
    // Check if the token has expired
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      console.warn("JWT token has expired");
      return null;
    }
    
    return payload;
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
};
