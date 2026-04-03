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
    <div className="space-y-4">
      {/* PayPal button */}
      <PayPalButtons
        style={{ layout: 'vertical', shape: 'rect', label: 'paypal', height: 48 }}
        fundingSource={FUNDING.PAYPAL}
        createOrder={createOrder}
        onApprove={async (data) => onSuccess(data.orderID, 'paypal')}
        onError={() => onError('PayPal payment failed. Please try again.')}
      />

      {/* Venmo button — US only, hidden automatically outside US */}
      <PayPalButtons
        style={{ layout: 'vertical', shape: 'rect', height: 48 }}
        fundingSource={FUNDING.VENMO}
        createOrder={createOrder}
        onApprove={async (data) => onSuccess(data.orderID, 'venmo')}
        onError={() => onError('Venmo payment failed. Please try again.')}
      />
    </div>
  );
}
