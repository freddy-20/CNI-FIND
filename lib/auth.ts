import bcrypt from "bcryptjs";

const encoder = new TextEncoder();

function toBase64Url(buffer: ArrayBuffer | Uint8Array) {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let str = "";
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(
    value.length + ((4 - (value.length % 4)) % 4),
    "="
  );
  const str = atob(padded);
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) bytes[i] = str.charCodeAt(i);
  return bytes;
}

async function getKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function requireSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET manquant dans .env");
  return secret;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

// Session signée (HMAC) — remplace le cookie en clair "authenticated"
export async function createSessionToken(email: string) {
  const secret = requireSecret();
  const expires = Date.now() + 1000 * 60 * 60 * 24; // 24h

  const payload = toBase64Url(encoder.encode(JSON.stringify({ email, expires })));
  const key = await getKey(secret);
  const signature = toBase64Url(await crypto.subtle.sign("HMAC", key, encoder.encode(payload)));

  return `${payload}.${signature}`;
}

export async function verifySessionToken(token?: string | null) {
  if (!token) return false;

  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  try {
    const key = await getKey(secret);
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(signature),
      encoder.encode(payload)
    );

    if (!valid) return false;

    const data = JSON.parse(new TextDecoder().decode(fromBase64Url(payload)));
    return typeof data.expires === "number" && data.expires > Date.now();
  } catch {
    return false;
  }
}

export async function getSessionEmail(token?: string | null) {
  if (!token) return null;

  const valid = await verifySessionToken(token);
  if (!valid) return null;

  const [payload] = token.split(".");

  try {
    const json = JSON.parse(new TextDecoder().decode(fromBase64UrlPublic(payload)));
    return typeof json.email === "string" ? json.email : null;
  } catch {
    return null;
  }
}

function fromBase64UrlPublic(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(
    value.length + ((4 - (value.length % 4)) % 4),
    "="
  );
  const str = atob(padded);
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) bytes[i] = str.charCodeAt(i);
  return bytes;
}
