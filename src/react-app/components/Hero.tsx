import { Star } from 'lucide-react';
import { Settings, Target, Lightbulb, TrendingUp, ShieldCheck, Users } from "lucide-react";
import { useEffect, useRef, FC, ReactNode } from 'react';

// Define the types for the props of the AnimatedSection component
interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
}

/**
 * Animates a given HTML element by applying a fade-in and slide-up effect.
 * @param element The HTMLElement to animate. It can be null initially.
 * @param delay The delay in milliseconds before the animation starts.
 */
const animateOnScroll = (element: HTMLElement | null, delay = 0) => {
  if (element) {
    element.style.transition = `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`;
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }
};

/**
 * A wrapper component that applies a fade-in and slide-up animation when it becomes visible on screen.
 * @param children The content to be wrapped and animated.
 * @param delay The delay for the animation.
 */
const AnimatedSection: FC<AnimatedSectionProps> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current; // ✅ capture ref once
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Call the animation function on the observed element.
            animateOnScroll(entry.target as HTMLElement, delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node); // ✅ always cleanup the same node
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: 'translateY(20px)',
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};

export default function Hero() {
  return (
    <section className="pt-16 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center">

        {/* Announcement Banner */}
        <AnimatedSection>
          <div className="flex justify-center mb-4 sm:mb-6 mt-6">
            <div className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium border">
              <span className="text-[#c6f678] font-semibold mr-2">●</span>
              Trusted by 500+ businesses worldwide
            </div>
          </div>
        </AnimatedSection>

        {/* Main Heading */}
        <AnimatedSection delay={100}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-snug mb-4 sm:mb-6">
            A High-Performance Website.<br />
            Built for Your Success.
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8">
            Launch a stunning website faster<br />
            than you ever imagined.
          </p>
        </AnimatedSection>

        {/* CTA Button */}
        <AnimatedSection delay={300}>
          <button className="bg-black text-white px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-800 shadow-md transition-colors mb-6">
            Get Started for free
          </button>
        </AnimatedSection>

        {/* Social Proof */}
        <AnimatedSection delay={400}>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 text-gray-500 mb-6 sm:mb-8">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-4 h-4 fill-[#c6f678] text-[#c6f678]" />
              ))}
              <div className="relative w-4 h-4">
                <Star className="w-4 h-4 text-[#c6f678] absolute" />
                <Star
                  className="w-4 h-4 fill-[#c6f678] text-[#c6f678] absolute"
                  style={{ clipPath: 'inset(0 50% 0 0)' }}
                />
              </div>
            </div>
            <span className="text-xs sm:text-sm">Over 500+ Five Star Reviews</span>
          </div>
        </AnimatedSection>

        {/* YouTube Video Embed */}
        <AnimatedSection delay={500}>
          <div className="w-full max-w-xs sm:max-w-5xl mx-auto aspect-video sm:aspect-video rounded-lg overflow-hidden shadow-2xl shadow-gray-900/50 mb-12 sm:mb-16">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/CNsvts6pVzo?si=VQ9_NVYDTt3kuubC"
              title="No-Code Website Building"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </AnimatedSection>

        {/* Performance Logos Section */}
        <AnimatedSection>
          <div className="mt-8 sm:mt-12 px-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
              When quality matters, they <br />choose <span className="text-[#a3e635]">Webrakor.</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-16">
              <span className="flex-shrink text-center text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-gray-900">
                Print<span className="text-[#a3e635]">Smart</span>
              </span>
              <span className="flex-shrink text-center text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-gray-900">
                Ori<span className="underline decoration-[#a3e635] underline-offset-4">gin</span>
              </span>
              <span className="flex-shrink text-center text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-gray-900">
                Au<span className="text-[#a3e635] font-regular">nine</span>
              </span>
            </div>
          </div>
        </AnimatedSection>

        {/* Benefits Section */}
        <AnimatedSection>
          <section className="py-10 sm:py-12 relative">
            <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="bg-black rounded-3xl p-6 sm:p-10 relative overflow-hidden">
                {/* Background grid effect */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                {/* Tag */}
                <div className="relative text-center mb-4">
                  <span className="bg-[#a3e635] text-black text-xs sm:text-sm font-semibold px-3 py-1 rounded-full uppercase">
                    Innovation in Action
                  </span>
                </div>

                {/* Heading */}
                <h2 className="relative text-center text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                  Redefining Web Development with AI.
                </h2>

                {/* Subtitle */}
                <p className="relative text-center text-sm sm:text-base text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8">
                  Our AI-powered platform automates and optimizes every step of the web creation process, from design to deployment, ensuring a superior result every time.
                </p>

                {/* Cards */}
                <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {[
                    {
                      icon: Settings,
                      title: "Effortless Customization",
                      text: "Your website is built exactly to your specifications with our AI's intuitive and flexible design capabilities."
                    },
                    {
                      icon: Lightbulb,
                      title: "AI-Driven Design",
                      text: "Our AI generates a stunning, modern design in minutes, reflecting your brand's unique identity and style."
                    },
                    {
                      icon: TrendingUp,
                      title: "Performance & SEO",
                      text: "Websites are built with speed and search engine optimization in mind from the start, giving you a competitive edge."
                    },
                    {
                      icon: ShieldCheck,
                      title: "Enterprise-Grade Security",
                      text: "We prioritize your data with advanced security protocols and robust, reliable infrastructure."
                    },
                    {
                      icon: Users,
                      title: "Scalable Solutions",
                      text: "Whether you're a startup or a large enterprise, our platform scales with your business needs."
                    },
                    {
                      icon: Target,
                      title: "Ongoing Support",
                      text: "Our team is here to provide dedicated support and maintenance to keep your site running smoothly."
                    }
                  ].map((item, idx) => (
                    <AnimatedSection key={idx} delay={idx * 100}>
                      <div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-md rounded-2xl p-4 sm:p-5 text-center border border-white/10 relative z-10">
                        <div className="mb-2 sm:mb-3 flex justify-center">
                          <item.icon className="w-6 h-6 text-[#a3e635]" />
                        </div>
                        <h3 className="text-sm sm:text-base font-semibold text-white mb-1">{item.title}</h3>
                        <p className="text-gray-400 text-xs sm:text-sm">{item.text}</p>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Features Section */}
        <AnimatedSection>
          <section className="py-8 sm:py-12 bg-white">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 text-center">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-[2px] sm:w-16 bg-gray-300 rounded-full"></div>
              </div>
              <AnimatedSection delay={100}>
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#a3e635] uppercase">
                  Core Capabilities
                </span>
              </AnimatedSection>
              <AnimatedSection delay={200}>
                <h2 className="mt-3 text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900">
                  Build, Brand, and Grow,<br /> All with AI.
                </h2>
              </AnimatedSection>
              <AnimatedSection delay={300}>
                <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
                  Webrakor provides a comprehensive suite of AI-driven solutions to create, manage, and scale your online presence, freeing you to focus on your business goals.
                </p>
              </AnimatedSection>

              {/* Feature Card */}
              <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 items-center">
                <AnimatedSection delay={400}>
                  <div className="bg-gray-50 rounded-3xl p-4 sm:p-6 text-left shadow-sm">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Unified AI-Powered Platform</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                      From intuitive design to automated content generation and strategic SEO, every tool you need is integrated into one seamless workflow.
                    </p>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {["AI-Driven Design", "No-Code Development", "Content & SEO", "Ongoing Maintenance"].map((tag, idx) => (
                        <span key={idx} className="px-2 sm:px-3 py-1 bg-white border rounded-full text-xs sm:text-sm font-medium text-gray-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
                <AnimatedSection delay={500}>
                  <div className="relative w-full rounded-3xl overflow-hidden shadow-lg h-64 sm:h-80 lg:h-full">
                    <img
                      src="https://images.unsplash.com/photo-1553877522-43269d4ea984"
                      alt="Webrakor Dashboard"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </AnimatedSection>
              </div>
            </div>

            {/* PrintSmart Case Study */}
            <AnimatedSection>
              <section className="py-12 sm:py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                  {/* Header */}
                  <div className="text-center mb-8 sm:mb-12">
                    <AnimatedSection delay={100}>
                      <p className="text-[10px] sm:text-xs font-semibold tracking-wider text-[#a3e635] uppercase mb-1 sm:mb-2">
                        Featured Work
                      </p>
                    </AnimatedSection>
                    <AnimatedSection delay={200}>
                      <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-snug">
                        PrintSmart Works <br />
                        <span className="text-[#a3e635]">Case Study</span>
                      </h2>
                    </AnimatedSection>
                  </div>

                  {/* Project Showcase */}
                  <AnimatedSection delay={300}>
                    <div className="flex flex-col lg:flex-row gap-6 items-start bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 shadow-sm p-6 lg:p-8 w-full">

                      {/* Project Image */}
                      <div className="w-full lg:w-1/2 h-64 lg:h-[400px] hidden lg:block">
                        <div className="relative w-full h-full rounded-2xl overflow-hidden">
                          <img
                            src="https://images.unsplash.com/photo-1548745908-2315705892fb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3"
                            alt="PrintSmart printing materials"
                            className="w-full h-full object-cover rounded-2xl"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/30 rounded-2xl"></div>
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="w-full lg:w-1/2 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src="/printlogo.jpg"
                              alt="PrintSmart logo"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-sm sm:text-base">printsmart.info</h3>
                            <p className="text-[10px] sm:text-xs text-gray-500">Printing & Branding</p>
                          </div>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-snug text-left">
                          Turning Ideas into Premium Prints
                        </h3>

                        <p className="text-xs sm:text-sm text-gray-600 mb-4 text-justify leading-relaxed">
                          At PrintSmart, we believe printing is where artistry meets technology. Founded in 2024, we help businesses elevate their brand with high-quality printed materials that leave a lasting impression. Our expertise spans from business cards to large format displays, combining premium materials, modern technology, and precise craftsmanship to deliver exceptional results every time.
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {["Premium Materials", "Precision Craftsmanship", "Brand Consistency", "Modern Technology"].map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-white rounded-full text-[10px] sm:text-xs font-medium text-gray-700 border border-gray-200 shadow-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Button placed for better UX */}
                        <div className="mt-auto flex justify-start">
                          <a
                            href="https://printsmart.info"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#a3e635] hover:bg-[#8ac62a] text-black 
              px-3 py-2 sm:px-6 sm:py-3 
              rounded-full text-xs sm:text-sm font-medium 
              transition-colors shadow-md"
                          >
                            Explore Our Work
                          </a>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              </section>
            </AnimatedSection>
          </section>
        </AnimatedSection>
      </div>
    </section>
  );
}