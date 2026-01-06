'use client';

export default function LoadingDots() {
  return (
    <div className="flex items-center space-x-1.5 px-4 py-3">
      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
    </div>
  );
}
