import React, { useEffect, useRef, ReactNode } from 'react';

// Animation utility function
const animateOnScroll = (element: HTMLElement | null, delay: number = 0): void => {
  if (element) {
    element.style.transition = `opacity 700ms ease-out ${delay}ms, transform 700ms ease-out ${delay}ms`;
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }
};

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Animate only when it becomes visible
          if (entry.isIntersecting) {
            animateOnScroll(entry.target as HTMLElement, delay);
            // Stop observing once animated to prevent re-triggering
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]); // Effect depends only on the delay prop

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: 'translateY(30px)',
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;