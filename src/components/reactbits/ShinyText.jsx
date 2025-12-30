'use client';

// ShinyText component from ReactBits - https://www.reactbits.dev/
export default function ShinyText({
  children,
  className = '',
  shimmerWidth = 100,
  disabled = false,
  speed = 2,
}) {
  return (
    <span
      className={`relative inline-block overflow-hidden ${className}`}
      style={{
        color: disabled ? 'inherit' : 'rgba(255, 255, 255, 0.7)',
      }}
    >
      {children}
      {!disabled && (
        <span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          style={{
            width: `${shimmerWidth}%`,
            animation: `shimmer ${speed}s infinite linear`,
            transform: 'translateX(-100%)',
          }}
        />
      )}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </span>
  );
}

