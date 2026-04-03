'use client';

import { useState } from 'react';
import { Package } from 'lucide-react';

export default function ProductImage({
  src,
  slug,
  name,
  className = '',
}: {
  src?: string;
  slug: string;
  name: string;
  className?: string;
}) {
  const [error, setError] = useState(false);

  const imgSrc = src || `/images/products/${slug}.jpg`;

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-brand-blue-50 to-brand-pink-50 ${className}`}
      >
        <div className="text-center">
          <Package className="mx-auto h-12 w-12 text-brand-blue-300" />
          <p className="mt-2 text-xs text-brand-blue-400">{name}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={name}
      className={className}
      onError={() => setError(true)}
    />
  );
}
