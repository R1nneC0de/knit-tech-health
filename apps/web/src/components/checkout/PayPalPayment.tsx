'use client';

import { PayPalButtons, FUNDING, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { authApiFetch } from '@/lib/api';

interface Props {
  accessToken: string;
  onSuccess: (orderId: string, paymentMethod: string) => void;
  onError: (msg: string) => void;
}

export default function PayPalPayment({ accessToken, onSuccess, onError }: Props) {
  const [{ isPending }] = usePayPalScriptReducer();

  async function createOrder() {
    const { orderId } = await authApiFetch<{ orderId: string }>(
      '/checkout/create-paypal-order',
      accessToken,
      { method: 'POST' }
    );
    return orderId;
  }

  if (isPending) {
    return <div className="h-32 animate-pulse rounded-lg bg-gray-100" />;
  }

  return (
    <div className="space-y-3">
      {/* PayPal */}
      <PayPalButtons
        style={{ layout: 'vertical', shape: 'rect', label: 'paypal' }}
        fundingSource={FUNDING.PAYPAL}
        createOrder={createOrder}
        onApprove={async (data) => onSuccess(data.orderID, 'paypal')}
        onError={() => onError('PayPal payment failed')}
      />

      {/* Venmo (US only) */}
      <PayPalButtons
        style={{ layout: 'vertical', shape: 'rect' }}
        fundingSource={FUNDING.VENMO}
        createOrder={createOrder}
        onApprove={async (data) => onSuccess(data.orderID, 'venmo')}
        onError={() => onError('Venmo payment failed')}
      />

      <p className="text-center text-xs text-gray-400">
        Cash App Pay available via PayPal when signing in to your PayPal account.
      </p>
    </div>
  );
}
