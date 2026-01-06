'use client';

export default function BackgroundPattern() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gray-50">
      {/* Dotted pattern */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      
      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(16, 185, 129, 0.15), transparent 50%), radial-gradient(circle at 70% 80%, rgba(251, 191, 36, 0.15), transparent 50%)',
        }}
      />
    </div>
  );
}
