import { useEffect, useRef, useState } from "react";

export function useCounter(target, { suffix = "", duration = 1800 } = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let raf;
    const animate = (start) => {
      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
      const tick = (now) => {
        const elapsed = now - start;
        const t = Math.min(elapsed / duration, 1);
        const current = Math.floor(easeOutCubic(t) * target);
        setValue(current);
        if (t < 1) raf = requestAnimationFrame(tick);
        else setValue(target);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(performance.now());
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  const formatted = value.toLocaleString("es-ES");
  return { ref, display: formatted + suffix };
}