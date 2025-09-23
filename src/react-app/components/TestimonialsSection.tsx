import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef, FC, ReactNode } from "react";

// Animation utility function
const animateOnScroll = (element: HTMLElement | null, delay = 0) => {
  if (element) {
    element.style.transition = `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`;
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
  }
};

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
}

const AnimatedSection: FC<AnimatedSectionProps> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateOnScroll(entry.target as HTMLElement, delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(20px)",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};

export default function TestimonialsSection() {
  return (
    <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        {/* Black Curved Rectangle Wrapper with Grid Background */}
        <AnimatedSection>
          <div className="relative rounded-2xl sm:rounded-3xl px-4 sm:px-8 py-10 sm:py-16 text-white shadow-lg overflow-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 bg-black bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

            {/* Content */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
              {/* Left side - Content */}
              <div>
                <AnimatedSection delay={100}>
                  <div className="text-[#c6f678] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 sm:mb-4">
                    TESTIMONIALS
                  </div>
                </AnimatedSection>
                <AnimatedSection delay={200}>
                  <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 leading-snug">
                    Trusted by Businesses & Startups
                  </h2>
                </AnimatedSection>
                <AnimatedSection delay={300}>
                  <p className="text-gray-400 text-sm sm:text-lg leading-relaxed">
                    Discover how Webrakor helps startups, solopreneurs, and
                    students launch professional websites quickly with
                    AI-powered design and human-crafted quality.
                  </p>
                </AnimatedSection>
              </div>

              {/* Right side - Testimonial */}
              <div className="relative">
                <AnimatedSection delay={400}>
                  <div className="bg-gray-900 rounded-2xl p-6 sm:p-8 relative">
                    {/* Profile */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center mb-4 sm:mb-6">
                      <img
                        src="https://media.licdn.com/dms/image/v2/D4D03AQGTRVrx25ibqA/profile-displayphoto-shrink_400_400/B4DZleNCr.JAAg-/0/1758222103889?e=1761177600&v=beta&t=retruOF-2V3ZHmZgARCBugQ6_sKOtwB19tsOr0LasM8"
                        alt="Sai Charan Puduthala"
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full mr-3 sm:mr-4 flex-shrink-0"
                      />
                      <div>
                        <h4 className="text-lg sm:text-xl font-semibold text-white">
                          Sai Charan Puduthala
                        </h4>
                        <p className="text-gray-400 text-xs sm:text-sm">
                          Founder & CEO, Webrakor
                        </p>
                      </div>
                    </div>

                    {/* Quote */}
                    <blockquote className="text-gray-300 text-sm sm:text-lg leading-relaxed mb-4 sm:mb-6">
                       “Webrakor isn’t just a developer team. We are Rakors, creative partners 
                       who bring care, curiosity, and skill to every project. That’s what sets us 
                       apart and why clients trust us.”
                    </blockquote>

                    {/* Quote mark */}
                    <div className="text-[#c6f678] text-4xl sm:text-6xl font-bold absolute top-3 sm:top-4 right-4 sm:right-6 opacity-20">
                      "
                    </div>
                  </div>
                </AnimatedSection>

                {/* Bottom CTA */}
                <AnimatedSection delay={500}>
                  <div className="mt-6 sm:mt-8">
                    <Link
                      to="/reviews"
                      className="bg-[#c6f678] rounded-full px-2 sm:px-4 py-1.5 sm:py-2 inline-flex flex-wrap sm:flex-nowrap items-center justify-center space-x-2 sm:space-x-4 hover:bg-[#b5e46d] transition-colors cursor-pointer"
                    >
                      {/* Avatar group */}
                      <div className="flex -space-x-2 mb-1 sm:mb-0">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <img
                            key={i}
                            src={`https://i.pravatar.cc/80?img=${i}`}
                            alt={`Client ${i}`}
                            className="w-7 h-7 sm:w-10 sm:h-10 rounded-full border-2 border-white"
                            loading="lazy"
                          />
                        ))}
                      </div>

                      {/* Text */}
                      <span className="text-gray-900 font-semibold text-xs sm:text-lg pr-1 sm:pr-4 text-center sm:text-left">
                        Read All Client Stories
                      </span>

                      {/* Icon */}
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" />
                    </Link>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
