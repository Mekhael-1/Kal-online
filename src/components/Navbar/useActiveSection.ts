import { useEffect, useState } from 'react';
import { navLinks, type SectionId } from '../../config/site';

/** Highlights the nav item for the section currently in the middle of the viewport. */
export function useActiveSection(defaultSection: SectionId = 'home'): SectionId {
  const [active, setActive] = useState<SectionId>(defaultSection);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.target.id) {
            setActive(e.target.id as SectionId);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    navLinks.forEach((item) => {
      if (!item.id) return;
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}
