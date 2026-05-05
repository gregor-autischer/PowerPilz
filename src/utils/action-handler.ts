/**
 * Lightweight action handler for detecting tap, hold, and double-tap
 * on a target element. Follows the same timing as HA's built-in
 * actionHandler directive (500ms hold, 250ms double-tap window).
 *
 * Uses `click` for tap/double-tap (reliable across all browsers and
 * touch/mouse) and `pointerdown` timer for hold detection.
 *
 * Touch-device hardening:
 *  - `touch-action: manipulation` prevents Safari double-tap-to-zoom.
 *  - `isHeld` auto-resets after a safety window to avoid stuck state
 *    when `pointercancel` fires before the post-hold click on iPad/Safari.
 *  - Passive pointer listeners improve scroll performance on touch devices.
 */

const HOLD_THRESHOLD_MS = 500;
const DOUBLE_TAP_WINDOW_MS = 250;
const HELD_SAFETY_RESET_MS = 1000;

export interface ActionHandlerOptions {
  hasHold: boolean;
  hasDoubleTap: boolean;
  /** When true, click and pointerdown events are stopped from bubbling
   *  past the bound element. Used by per-node handlers on the energy
   *  card so card-level actions don't double-fire on node clicks. */
  stopPropagation?: boolean;
}

export interface ActionHandlerCallbacks {
  onTap: () => void;
  onHold: () => void;
  onDoubleTap: () => void;
}

export interface ActionHandlerCleanup {
  destroy: () => void;
}

export const bindActionHandler = (
  element: HTMLElement,
  callbacks: ActionHandlerCallbacks,
  options: ActionHandlerOptions
): ActionHandlerCleanup => {
  let holdTimer: ReturnType<typeof setTimeout> | undefined;
  let heldResetTimer: ReturnType<typeof setTimeout> | undefined;
  let doubleTapTimer: ReturnType<typeof setTimeout> | undefined;
  let isHeld = false;
  let pendingTap = false;

  // Prevent Safari double-tap-to-zoom on the card element.
  const prevTouchAction = element.style.touchAction;
  element.style.touchAction = "manipulation";

  const clearHold = (): void => {
    if (holdTimer !== undefined) {
      clearTimeout(holdTimer);
      holdTimer = undefined;
    }
  };

  const clearHeldReset = (): void => {
    if (heldResetTimer !== undefined) {
      clearTimeout(heldResetTimer);
      heldResetTimer = undefined;
    }
  };

  // --- Hold detection via pointerdown/pointerup ---

  const handlePointerDown = (event: PointerEvent): void => {
    if (event.button !== 0) return;
    if (options.stopPropagation) {
      event.stopPropagation();
    }
    isHeld = false;
    clearHeldReset();
    if (!options.hasHold) return;
    clearHold();
    holdTimer = setTimeout(() => {
      isHeld = true;
      holdTimer = undefined;
      callbacks.onHold();
      // Safety: auto-clear isHeld after a reasonable window.
      // On iPad/Safari pointercancel can fire instead of pointerup,
      // and the subsequent click may never arrive to reset isHeld.
      heldResetTimer = setTimeout(() => {
        isHeld = false;
        heldResetTimer = undefined;
      }, HELD_SAFETY_RESET_MS);
    }, HOLD_THRESHOLD_MS);
  };

  const handlePointerUp = (): void => {
    clearHold();
  };

  const handlePointerCancel = (): void => {
    clearHold();
    // Only reset isHeld if the hold callback hasn't fired yet.
    // If it already fired (isHeld === true), the heldResetTimer
    // or the next click event will handle the reset.
    if (!isHeld) {
      isHeld = false;
    }
  };

  // --- Tap and double-tap detection via click ---

  const handleClick = (event: Event): void => {
    if (options.stopPropagation) {
      event.stopPropagation();
    }
    // Suppress click after hold
    if (isHeld) {
      isHeld = false;
      clearHeldReset();
      event.stopPropagation();
      return;
    }

    if (options.hasDoubleTap) {
      if (pendingTap) {
        // Second click within window -> double-tap
        pendingTap = false;
        if (doubleTapTimer !== undefined) {
          clearTimeout(doubleTapTimer);
          doubleTapTimer = undefined;
        }
        callbacks.onDoubleTap();
      } else {
        // First click -> wait for potential second
        pendingTap = true;
        doubleTapTimer = setTimeout(() => {
          pendingTap = false;
          doubleTapTimer = undefined;
          callbacks.onTap();
        }, DOUBLE_TAP_WINDOW_MS);
      }
    } else {
      // No double-tap: fire tap immediately
      callbacks.onTap();
    }
  };

  const handleContextMenu = (event: Event): void => {
    if (isHeld || holdTimer !== undefined) {
      event.preventDefault();
    }
  };

  element.addEventListener("pointerdown", handlePointerDown, { passive: true });
  element.addEventListener("pointerup", handlePointerUp, { passive: true });
  element.addEventListener("pointercancel", handlePointerCancel, { passive: true });
  element.addEventListener("pointerleave", handlePointerCancel, { passive: true });
  element.addEventListener("click", handleClick);
  element.addEventListener("contextmenu", handleContextMenu);

  return {
    destroy: () => {
      clearHold();
      clearHeldReset();
      if (doubleTapTimer !== undefined) {
        clearTimeout(doubleTapTimer);
      }
      element.removeEventListener("pointerdown", handlePointerDown);
      element.removeEventListener("pointerup", handlePointerUp);
      element.removeEventListener("pointercancel", handlePointerCancel);
      element.removeEventListener("pointerleave", handlePointerCancel);
      element.removeEventListener("click", handleClick);
      element.removeEventListener("contextmenu", handleContextMenu);
      element.style.touchAction = prevTouchAction;
    }
  };
};
