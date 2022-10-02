import { useEffect } from "react";

const confirmationMessage = "You have unsaved changes. Continue?";

/**
 *
 * Change edit draft slug to an id.
 * Slug should be generated only when posts are published
 */

export const useConfirmTabClose = (isUnsafeTabClose) => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isUnsafeTabClose) {
        event.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isUnsafeTabClose]);
};