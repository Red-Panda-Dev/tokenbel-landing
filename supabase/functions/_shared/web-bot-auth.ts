/**
 * Web Bot Auth (IETF WebBotAuth WG) — HTTP Message Signatures (RFC 9421)
 * signer for outbound requests made by the TokenBel agent/bot.
 *
 * Public keys are published as a JWKS at:
 *   https://tokenbel.info/.well-known/http-message-signatures-directory
 *
 * The matching Ed25519 private key lives in the WEB_BOT_AUTH_PRIVATE_JWK secret.
 */

const SIGNATURE_AGENT = "https://tokenbel.info";
const KEY_ID = "rtk3c5hUFmeJbfdbbc0CdCryXyozNRWBrYaHRHxRKuE";

function b64url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

let cachedKey: CryptoKey | null = null;

async function getPrivateKey(): Promise<CryptoKey> {
  if (cachedKey) return cachedKey;
  const raw = Deno.env.get("WEB_BOT_AUTH_PRIVATE_JWK");
  if (!raw) throw new Error("WEB_BOT_AUTH_PRIVATE_JWK is not configured");
  const jwk = JSON.parse(raw);
  cachedKey = await crypto.subtle.importKey(
    "jwk",
    { ...jwk, key_ops: ["sign"], ext: true },
    { name: "Ed25519" },
    false,
    ["sign"],
  );
  return cachedKey;
}

/**
 * Returns `Signature-Agent`, `Signature-Input` and `Signature` headers that
 * authenticate an outbound request per Web Bot Auth.
 */
export async function webBotAuthHeaders(
  request: Request,
  { expiresInSeconds = 300 }: { expiresInSeconds?: number } = {},
): Promise<Record<string, string>> {
  const url = new URL(request.url);
  const created = Math.floor(Date.now() / 1000);
  const expires = created + expiresInSeconds;
  const nonce = b64url(crypto.getRandomValues(new Uint8Array(16)));
  const signatureAgent = `"${SIGNATURE_AGENT}"`;

  const covered = `("@method" "@target-uri" "signature-agent")`;
  const params =
    `;created=${created};expires=${expires};keyid="${KEY_ID}";alg="ed25519";nonce="${nonce}";tag="web-bot-auth"`;
  const signatureParams = `${covered}${params}`;

  const base = [
    `"@method": ${request.method.toUpperCase()}`,
    `"@target-uri": ${url.toString()}`,
    `"signature-agent": ${signatureAgent}`,
    `"@signature-params": ${signatureParams}`,
  ].join("\n");

  const signature = new Uint8Array(
    await crypto.subtle.sign(
      { name: "Ed25519" },
      await getPrivateKey(),
      new TextEncoder().encode(base),
    ),
  );

  return {
    "Signature-Agent": signatureAgent,
    "Signature-Input": `sig1=${signatureParams}`,
    "Signature": `sig1=:${btoa(String.fromCharCode(...signature))}:`,
  };
}

/** Convenience wrapper: fetch with Web Bot Auth signature headers attached. */
export async function signedFetch(input: string | URL, init: RequestInit = {}) {
  const request = new Request(input, init);
  const headers = new Headers(request.headers);
  for (const [key, value] of Object.entries(await webBotAuthHeaders(request))) {
    headers.set(key, value);
  }
  return fetch(new Request(request, { headers }));
}
