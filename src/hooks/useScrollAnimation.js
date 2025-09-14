import { useEffect, useRef } from 'react';

export const useScrollAnimation = (animationType = 'fadeInUp', threshold = 0.1) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add the animation class
            entry.target.classList.add(`animate-${animationType}`);
            entry.target.classList.remove('scroll-hidden');
            entry.target.classList.add('scroll-visible');
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Initially hide the element
    element.classList.add('scroll-hidden');
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [animationType, threshold]);

  return elementRef;
};

// Hook for staggered animations (for lists/grids)
export const useStaggeredScrollAnimation = (animationType = 'fadeInUp', staggerDelay = 100) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.children;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add staggered animations to children
            Array.from(children).forEach((child, index) => {
              setTimeout(() => {
                child.classList.add(`animate-${animationType}`);
                child.classList.remove('scroll-hidden');
                child.classList.add('scroll-visible');
              }, index * staggerDelay);
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Initially hide all children
    Array.from(children).forEach(child => {
      child.classList.add('scroll-hidden');
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [animationType, staggerDelay]);

  return containerRef;
};
