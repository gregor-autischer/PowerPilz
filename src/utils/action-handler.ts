/**
 * Lightweight action handler for detecting tap, hold, and double-tap
 * on a target element. Follows the same timing as HA's built-in
 * actionHandler directive (500ms hold, 250ms double-tap window).
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
  let singleTapTimer: ReturnType<typeof setTimeout> | undefined;
  let isHeld = false;
  let pendingTap = false;

  const clearHold = (): void => {
    if (holdTimer !== undefined) {
      clearTimeout(holdTimer);
      holdTimer = undefined;
    }
  };

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
    if (isHeld) {
      isHeld = false;
      return;
    }

    if (options.hasDoubleTap) {
      if (pendingTap) {
        pendingTap = false;
        if (singleTapTimer !== undefined) {
          clearTimeout(singleTapTimer);
          singleTapTimer = undefined;
        }
        callbacks.onDoubleTap();
      } else {
        pendingTap = true;
        singleTapTimer = setTimeout(() => {
          pendingTap = false;
          singleTapTimer = undefined;
          callbacks.onTap();
        }, DOUBLE_TAP_WINDOW_MS);
      }
    } else {
      // No double-tap configured: fire tap immediately (no 250ms delay)
      callbacks.onTap();
    }
  };

  const handlePointerCancel = (): void => {
    clearHold();
    isHeld = false;
    pendingTap = false;
    if (singleTapTimer !== undefined) {
      clearTimeout(singleTapTimer);
      singleTapTimer = undefined;
    }
  };

  const handleContextMenu = (event: Event): void => {
    // Prevent context menu while hold timer is active or hold already fired
    if (isHeld || holdTimer !== undefined) {
      event.preventDefault();
    }
  };

  element.addEventListener("pointerdown", handlePointerDown);
  element.addEventListener("pointerup", handlePointerUp);
  element.addEventListener("pointercancel", handlePointerCancel);
  element.addEventListener("pointerleave", handlePointerCancel);
  element.addEventListener("contextmenu", handleContextMenu);

  return {
    destroy: () => {
      clearHold();
      if (singleTapTimer !== undefined) {
        clearTimeout(singleTapTimer);
      }
      element.removeEventListener("pointerdown", handlePointerDown);
      element.removeEventListener("pointerup", handlePointerUp);
      element.removeEventListener("pointercancel", handlePointerCancel);
      element.removeEventListener("pointerleave", handlePointerCancel);
      element.removeEventListener("contextmenu", handleContextMenu);
    }
  };
};
