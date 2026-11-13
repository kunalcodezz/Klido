import { useState } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClassName?: string;
  caption?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  aspectClassName = 'aspect-video',
  caption,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className="w-full">
      <div
        className={`relative overflow-hidden rounded-2xl border border-[#E5E9F2] bg-[#F7F9FE] ${aspectClassName} ${className}`}
      >
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#F7F9FE] p-6 text-center">
            <Layers className="h-6 w-6 text-[#6B7388]" aria-hidden="true" />
            <p className="max-w-xs text-sm font-medium text-[#4A5268]">{alt}</p>
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="mt-2.5 text-xs text-[#6B7388]">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
