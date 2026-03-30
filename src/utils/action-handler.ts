/**
 * Lightweight action handler for detecting tap, hold, and double-tap
 * on a target element. Follows the same timing as HA's built-in
 * actionHandler directive (500ms hold, 250ms double-tap window).
 *
 * Uses `click` for tap/double-tap (reliable across all browsers and
 * touch/mouse) and `pointerdown` timer for hold detection.
 */

const HOLD_THRESHOLD_MS = 500;
const DOUBLE_TAP_WINDOW_MS = 250;

export interface ActionHandlerOptions {
  hasHold: boolean;
  hasDoubleTap: boolean;
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
  let doubleTapTimer: ReturnType<typeof setTimeout> | undefined;
  let isHeld = false;
  let pendingTap = false;

  const clearHold = (): void => {
    if (holdTimer !== undefined) {
      clearTimeout(holdTimer);
      holdTimer = undefined;
    }
  };

  // --- Hold detection via pointerdown/pointerup ---

  const handlePointerDown = (event: PointerEvent): void => {
    if (event.button !== 0) return;
    isHeld = false;
    if (!options.hasHold) return;
    clearHold();
    holdTimer = setTimeout(() => {
      isHeld = true;
      holdTimer = undefined;
      callbacks.onHold();
    }, HOLD_THRESHOLD_MS);
  };

  const handlePointerUp = (): void => {
    clearHold();
  };

  const handlePointerCancel = (): void => {
    clearHold();
    isHeld = false;
  };

  // --- Tap and double-tap detection via click ---

  const handleClick = (event: Event): void => {
    // Suppress click after hold
    if (isHeld) {
      isHeld = false;
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

  element.addEventListener("pointerdown", handlePointerDown);
  element.addEventListener("pointerup", handlePointerUp);
  element.addEventListener("pointercancel", handlePointerCancel);
  element.addEventListener("pointerleave", handlePointerCancel);
  element.addEventListener("click", handleClick);
  element.addEventListener("contextmenu", handleContextMenu);

  return {
    destroy: () => {
      clearHold();
      if (doubleTapTimer !== undefined) {
        clearTimeout(doubleTapTimer);
      }
      element.removeEventListener("pointerdown", handlePointerDown);
      element.removeEventListener("pointerup", handlePointerUp);
      element.removeEventListener("pointercancel", handlePointerCancel);
      element.removeEventListener("pointerleave", handlePointerCancel);
      element.removeEventListener("click", handleClick);
      element.removeEventListener("contextmenu", handleContextMenu);
    }
  };
};
