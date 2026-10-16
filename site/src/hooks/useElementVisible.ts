import { useEffect, useState } from "react";

export function useElementVisible(id: string, initial = false): boolean {
  const [visible, setVisible] = useState(initial);

  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [id]);

  return visible;
}
