// eslint-disable-next-line @typescript-eslint/no-require-imports
const paypal = require('@paypal/checkout-server-sdk');

const clientId = process.env.PAYPAL_CLIENT_ID || 'sb-placeholder';
const clientSecret = process.env.PAYPAL_CLIENT_SECRET || 'placeholder';
const mode = process.env.PAYPAL_MODE || 'sandbox';

function environment() {
  if (mode === 'live') {
    return new paypal.core.LiveEnvironment(clientId, clientSecret);
  }
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

export function paypalClient() {
  return new paypal.core.PayPalHttpClient(environment());
}

export { paypal };
