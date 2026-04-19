"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import InfiniteGallery from "@/components/ui/3d-gallery-photography";

const GALLERY_IMAGES = [
  { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", alt: "Architecture" },
  { src: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&q=80", alt: "Interior" },
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", alt: "Office" },
  { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80", alt: "Nature" },
  { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80", alt: "Landscape" },
  { src: "https://images.unsplash.com/photo-1506765515384-028b60a970df?w=600&q=80", alt: "Forest" },
  { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80", alt: "Woods" },
  { src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=80", alt: "Valley" },
  { src: "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=600&q=80", alt: "Desert" },
  { src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80", alt: "Mountains" },
  { src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80", alt: "Space" },
  { src: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&q=80", alt: "Animal" },
  { src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&q=80", alt: "Flower" },
  { src: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600&q=80", alt: "Sunrise" },
  { src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&q=80", alt: "Snow" },
  { src: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=600&q=80", alt: "City" },
  { src: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80", alt: "Town" },
  { src: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=600&q=80", alt: "Park" },
  { src: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=600&q=80", alt: "Abstract" },
  { src: "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=600&q=80", alt: "Dark" },
];

export default function GalleryPage() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  };

  const navButtonClass =
    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-[0.14em] uppercase transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(65%_0.28_290_/_45%)]";

  const navButtonStyle = {
    background: "oklch(10% 0.018 270 / 85%)",
    border: "1px solid oklch(24% 0.028 270)",
    color: "oklch(86% 0.005 270)",
    backdropFilter: "blur(8px)",
    boxShadow: "0 0 0 oklch(65% 0.28 290 / 0)",
  };

  return (
    <main className="min-h-screen h-full w-full bg-black">
      <div className="fixed top-5 left-5 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={handleBack}
          className={navButtonClass}
          style={navButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "oklch(65% 0.28 290 / 45%)";
            e.currentTarget.style.boxShadow = "0 0 24px oklch(65% 0.28 290 / 30%)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "oklch(24% 0.028 270)";
            e.currentTarget.style.boxShadow = "0 0 0 oklch(65% 0.28 290 / 0)";
          }}
        >
          <ArrowLeft size={14} />
          Back
        </button>

        <button
          type="button"
          onClick={() => router.push("/")}
          className={navButtonClass}
          style={navButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "oklch(65% 0.28 290 / 45%)";
            e.currentTarget.style.boxShadow = "0 0 24px oklch(65% 0.28 290 / 30%)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "oklch(24% 0.028 270)";
            e.currentTarget.style.boxShadow = "0 0 0 oklch(65% 0.28 290 / 0)";
          }}
        >
          Home
        </button>
      </div>

      <InfiniteGallery
        images={GALLERY_IMAGES}
        speed={1.2}
        visibleCount={12}
        className="h-screen w-full"
      />

      {/* Overlay title */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center text-center px-3 mix-blend-exclusion text-white z-10">
        <h1 className="font-serif text-4xl md:text-7xl tracking-tight select-none">
          <span className="italic">Arota</span>
        </h1>
      </div>

      {/* Instructions */}
      <div className="text-center fixed bottom-8 left-0 right-0 font-mono uppercase text-[11px] font-semibold text-white/40 pointer-events-none">
        <p>Use mouse wheel, arrow keys, or touch to navigate</p>
        <p className="opacity-60">Auto-play resumes after 3 seconds of inactivity</p>
      </div>
    </main>
  );
}
