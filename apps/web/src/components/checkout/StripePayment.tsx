'use client';

import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface Props {
  onSuccess: (paymentIntentId: string) => void;
  onError: (msg: string) => void;
  disabled?: boolean;
}

export default function StripePayment({ onSuccess, onError, disabled }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });
      if (error) {
        onError(error.message ?? 'Payment failed');
      } else if (paymentIntent?.status === 'succeeded') {
        onSuccess(paymentIntent.id);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading || disabled}
        className="w-full rounded-lg bg-brand-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-brand-blue-800 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Pay with Card'}
      </button>
    </form>
  );
}
