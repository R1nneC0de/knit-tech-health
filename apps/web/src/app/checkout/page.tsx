'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Wallet } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import StripePayment from '@/components/checkout/StripePayment';
import PayPalPayment from '@/components/checkout/PayPalPayment';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { authApiFetch } from '@/lib/api';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');
const TAX_RATE = 0.07;

interface PaymentIntentData {
  clientSecret: string;
  paymentIntentId: string;
  subtotal: number;
  tax: number;
  total: number;
}

function CheckoutContent() {
  const router = useRouter();
  const { cart, isLoading: cartLoading } = useCart();
  const { accessToken } = useAuth();
  const [tab, setTab] = useState<'card' | 'digital'>('card');
  const [paymentIntentData, setPaymentIntentData] = useState<PaymentIntentData | null>(null);
  const [loadingIntent, setLoadingIntent] = useState(false);
  const [error, setError] = useState('');
  const [shippingAddress, setShippingAddress] = useState({ street: '', city: '', state: '', zip: '', country: 'US' });

  const subtotal = cart?.items.reduce((sum, item) => sum + Number(item.product?.price ?? 0) * item.quantity, 0) ?? 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  useEffect(() => {
    if (tab === 'card' && accessToken && cart && cart.items.length > 0 && !paymentIntentData) {
      setLoadingIntent(true);
      authApiFetch<PaymentIntentData>('/checkout/create-payment-intent', accessToken, { method: 'POST' })
        .then(setPaymentIntentData)
        .catch((err) => setError(err.message))
        .finally(() => setLoadingIntent(false));
    }
  }, [tab, accessToken, cart, paymentIntentData]);

  async function handleSuccess(paymentId: string, paymentMethod: string) {
    if (!accessToken) return;
    try {
      const order = await authApiFetch<{ id: string }>('/checkout/confirm', accessToken, {
        method: 'POST',
        body: JSON.stringify({ paymentMethod, paymentId, shippingAddress }),
      });
      router.push(`/order-confirmation/${order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Order confirmation failed');
    }
  }

  if (cartLoading) {
    return <div className="mx-auto max-w-5xl px-4 py-12"><div className="h-48 animate-pulse rounded-xl bg-gray-100" /></div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 text-center">
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  const inputClass = 'mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-brand-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-100';

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-bold text-brand-blue-900">Checkout</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        {/* Left: Shipping + Payment */}
        <div className="space-y-6 lg:col-span-3">
          {/* Shipping address */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-brand-blue-900">Shipping Address</h2>
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-brand-blue-700">Street Address</label>
                <input type="text" value={shippingAddress.street} onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })} className={inputClass} placeholder="123 Main St" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-brand-blue-700">City</label>
                  <input type="text" value={shippingAddress.city} onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-blue-700">State</label>
                  <input type="text" value={shippingAddress.state} onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })} className={inputClass} placeholder="GA" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-blue-700">ZIP Code</label>
                <input type="text" value={shippingAddress.zip} onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })} className={inputClass} placeholder="30301" />
              </div>
            </div>
          </div>

          {/* Payment method */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-brand-blue-900">Payment Method</h2>

            {/* Tabs */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setTab('card')}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${tab === 'card' ? 'bg-brand-blue-700 text-white' : 'border border-gray-200 text-brand-blue-700 hover:bg-brand-blue-50'}`}
              >
                <CreditCard className="h-4 w-4" />
                Credit / Debit Card
              </button>
              <button
                onClick={() => setTab('digital')}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${tab === 'digital' ? 'bg-brand-blue-700 text-white' : 'border border-gray-200 text-brand-blue-700 hover:bg-brand-blue-50'}`}
              >
                <Wallet className="h-4 w-4" />
                PayPal / Venmo / Cash App
              </button>
            </div>

            <div className="mt-6">
              {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

              {tab === 'card' && (
                <>
                  {loadingIntent ? (
                    <div className="h-32 animate-pulse rounded-lg bg-gray-100" />
                  ) : paymentIntentData?.clientSecret ? (
                    <Elements
                      stripe={stripePromise}
                      options={{ clientSecret: paymentIntentData.clientSecret, appearance: { theme: 'stripe' } }}
                    >
                      <StripePayment
                        onSuccess={(id) => handleSuccess(id, 'stripe')}
                        onError={setError}
                      />
                    </Elements>
                  ) : (
                    <div className="rounded-lg border border-gray-200 p-4 text-center">
                      <p className="text-sm text-gray-500">Could not load payment form.</p>
                      <button
                        onClick={() => {
                          setError('');
                          setPaymentIntentData(null);
                        }}
                        className="mt-2 text-sm font-medium text-brand-blue-700 underline"
                      >
                        Try again
                      </button>
                    </div>
                  )}
                </>
              )}

              {tab === 'digital' && accessToken && (
                <PayPalScriptProvider
                  options={{
                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'sb-placeholder',
                    currency: 'USD',
                    intent: 'capture',
                    components: 'buttons',
                    enableFunding: 'venmo',
                  }}
                >
                  <PayPalPayment
                    accessToken={accessToken}
                    onSuccess={handleSuccess}
                    onError={setError}
                  />
                </PayPalScriptProvider>
              )}
            </div>
          </div>
        </div>

        {/* Right: Order summary */}
        <div className="h-fit rounded-xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="font-heading text-lg font-bold text-brand-blue-900">Order Summary</h2>
          <ul className="mt-4 divide-y divide-gray-100">
            {cart.items.map((item) => (
              <li key={item.id} className="flex justify-between py-3 text-sm">
                <span className="text-gray-700">
                  {item.product?.name} <span className="text-gray-400">x{item.quantity}</span>
                </span>
                <span className="font-medium text-brand-blue-800">
                  ${(Number(item.product?.price ?? 0) * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1.5 border-t border-gray-100 pt-4 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (7%)</span><span>${tax.toFixed(2)}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-gray-100 pt-2 font-bold text-brand-blue-900">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <CheckoutContent />
    </ProtectedRoute>
  );
}
