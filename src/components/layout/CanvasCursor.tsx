"use client";

import { useEffect } from "react";

export function CanvasCursor() {
  useEffect(() => {
    import("@/components/ui/canvas").then(({ renderCanvas }) => {
      renderCanvas();
    });
  }, []);

  return (
    <canvas
      id="canvas"
      className="pointer-events-none fixed inset-0 z-[9998]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
