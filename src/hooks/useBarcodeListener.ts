import { useEffect, useRef } from "react";

export function useBarcodeListener(onBarcodeScanned: (barcode: string) => void, timeout = 3000) {
  const buffer = useRef("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement && (document.activeElement as HTMLElement).tagName === "INPUT") {
        return;
      }
      if (/^\d$/.test(e.key)) {
        buffer.current += e.key;
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          buffer.current = "";
        }, timeout);

        if (buffer.current.length === 13) {
          onBarcodeScanned(buffer.current);
          buffer.current = "";
          if (timer.current) clearTimeout(timer.current);
        }
      } else {
        buffer.current = "";
        if (timer.current) clearTimeout(timer.current);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onBarcodeScanned, timeout]);
} 