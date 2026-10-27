import React from 'react';
import { ChevronLeft } from 'lucide-react';

/**
 * Visual edge indicator for touch swipe-to-go-back gesture.
 * Mimics native iOS / Android swipe navigation feedback.
 */
export default function GestureBackIndicator({ gestureState, label = 'Back' }) {
  if (!gestureState?.isSwiping || gestureState.direction !== 'right' || gestureState.distanceX < 12) {
    return null;
  }

  const { distanceX, isTriggered } = gestureState;
  const clampedX = Math.min(distanceX * 0.7, 72);
  const opacity = Math.min(distanceX / 40, 1);

  return (
    <div
      className="fixed left-0 top-1/2 -translate-y-1/2 z-[100] pointer-events-none select-none transition-transform duration-75 ease-out"
      style={{
        transform: `translate(${clampedX - 48}px, -50%)`,
        opacity,
      }}
      aria-hidden="true"
    >
      <div
        className={`flex items-center gap-1.5 pl-3 pr-4 py-2.5 rounded-r-full shadow-2xl backdrop-blur-md border border-white/20 text-white font-bold text-xs transition-colors duration-150 ${
          isTriggered
            ? 'bg-gradient-to-r from-red-600 to-red-700 shadow-red-600/50 scale-105'
            : 'bg-slate-900/85 shadow-black/40'
        }`}
      >
        <ChevronLeft
          className={`w-5 h-5 transition-transform duration-150 ${
            isTriggered ? '-translate-x-1 scale-110' : ''
          }`}
        />
        <span>{isTriggered ? `Release to ${label}` : label}</span>
      </div>
    </div>
  );
}
