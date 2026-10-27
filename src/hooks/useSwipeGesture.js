import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * High-performance hook for detecting swipe gestures (swipe-to-go-back, swipe-to-dismiss).
 * Provides live drag coordinates for fluid iOS/Android-style edge back animations.
 *
 * @param {Object} options
 * @param {Function} [options.onSwipeRight] - Callback fired on successful right swipe
 * @param {Function} [options.onSwipeLeft] - Callback fired on successful left swipe
 * @param {Function} [options.onSwipeDown] - Callback fired on successful down swipe
 * @param {number} [options.threshold=60] - Minimum px distance to trigger gesture
 * @param {number} [options.edgeWidth=50] - For edge-only swipes, max start X from screen edge
 * @param {boolean} [options.edgeOnly=false] - If true, swipe must begin within edgeWidth
 * @param {boolean} [options.disabled=false] - Whether gesture detection is active
 */
export function useSwipeGesture({
  onSwipeRight,
  onSwipeLeft,
  onSwipeDown,
  threshold = 60,
  edgeWidth = 50,
  edgeOnly = false,
  disabled = false,
} = {}) {
  const [gestureState, setGestureState] = useState({
    isSwiping: false,
    direction: null, // 'right' | 'left' | 'down' | null
    distanceX: 0,
    distanceY: 0,
    isTriggered: false,
  });

  const touchStart = useRef({ x: 0, y: 0, time: 0 });
  const isTracking = useRef(false);

  const handleTouchStart = useCallback(
    (e) => {
      if (disabled || !e.touches || e.touches.length === 0) return;

      const touch = e.touches[0];
      const startX = touch.clientX;
      const startY = touch.clientY;

      if (edgeOnly && startX > edgeWidth) {
        isTracking.current = false;
        return;
      }

      touchStart.current = { x: startX, y: startY, time: Date.now() };
      isTracking.current = true;
    },
    [disabled, edgeOnly, edgeWidth]
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (!isTracking.current || !e.touches || e.touches.length === 0) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStart.current.x;
      const deltaY = touch.clientY - touchStart.current.y;

      // Determine predominant direction
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      // Only engage if moving past jitter threshold (> 10px)
      if (absX < 10 && absY < 10) return;

      const isHorizontal = absX > absY * 0.9;
      const isRight = isHorizontal && deltaX > 0;
      const isLeft = isHorizontal && deltaX < 0;
      const isDown = !isHorizontal && deltaY > 0;

      let currentDir = null;
      if (isRight) currentDir = 'right';
      else if (isLeft) currentDir = 'left';
      else if (isDown) currentDir = 'down';

      const triggered =
        (isRight && deltaX >= threshold) ||
        (isLeft && Math.abs(deltaX) >= threshold) ||
        (isDown && deltaY >= threshold);

      setGestureState({
        isSwiping: true,
        direction: currentDir,
        distanceX: Math.max(0, deltaX),
        distanceY: Math.max(0, deltaY),
        isTriggered: triggered,
      });
    },
    [threshold]
  );

  const handleTouchEnd = useCallback(
    (e) => {
      if (!isTracking.current) return;
      isTracking.current = false;

      const touch = e.changedTouches ? e.changedTouches[0] : null;
      if (!touch) {
        setGestureState({
          isSwiping: false,
          direction: null,
          distanceX: 0,
          distanceY: 0,
          isTriggered: false,
        });
        return;
      }

      const deltaX = touch.clientX - touchStart.current.x;
      const deltaY = touch.clientY - touchStart.current.y;
      const elapsed = Date.now() - touchStart.current.time;
      const velocityX = deltaX / Math.max(1, elapsed);

      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      // Swipe right detection (distance > threshold OR fast flick with positive delta)
      if (deltaX > 0 && absX > absY * 0.8 && (deltaX >= threshold || (deltaX > 35 && velocityX > 0.35))) {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          try { navigator.vibrate(12); } catch (_) {}
        }
        if (onSwipeRight) onSwipeRight();
      } else if (deltaX < 0 && absX > absY * 0.8 && (absX >= threshold || (absX > 35 && velocityX < -0.35))) {
        if (onSwipeLeft) onSwipeLeft();
      } else if (deltaY > 0 && absY > absX * 1.2 && deltaY >= threshold) {
        if (onSwipeDown) onSwipeDown();
      }

      setGestureState({
        isSwiping: false,
        direction: null,
        distanceX: 0,
        distanceY: 0,
        isTriggered: false,
      });
    },
    [threshold, onSwipeRight, onSwipeLeft, onSwipeDown]
  );

  const handleTouchCancel = useCallback(() => {
    isTracking.current = false;
    setGestureState({
      isSwiping: false,
      direction: null,
      distanceX: 0,
      distanceY: 0,
      isTriggered: false,
    });
  }, []);

  return {
    gestureState,
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onTouchCancel: handleTouchCancel,
    },
  };
}

export default useSwipeGesture;
