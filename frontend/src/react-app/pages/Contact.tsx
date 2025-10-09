import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import { Mail, Phone, Instagram, Linkedin, MapPin } from 'lucide-react';
import React, { useEffect, useRef, ReactNode } from 'react';

export default function Contact() {
  // Faster & minimal animation utility
  const animateOnScroll = (element: HTMLElement | null, delay: number = 0): void => {
    if (element) {
      element.style.transition = `opacity 400ms ease-out ${delay}ms, transform 400ms ease-out ${delay}ms`;
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
            if (entry.isIntersecting) {
              animateOnScroll(entry.target as HTMLElement, delay);
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
    }, [delay]);

    return (
      <div
        ref={ref}
        style={{
          opacity: 0,
          transform: 'translateY(15px)', // reduced movement
          willChange: 'opacity, transform'
        }}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 pb-14 px-4 sm:px-6 lg:px-8"> 
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <AnimatedSection>
            <div className="text-center mb-16 sm:mb-20"> 
              <AnimatedSection delay={100}>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Let's Connect
                </h1>
              </AnimatedSection>
              <AnimatedSection delay={200}>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                  Our team is ready to provide exceptional support and guidance for your financial journey.
                </p>
              </AnimatedSection>
            </div>
          </AnimatedSection>

          {/* Main Contact Card */}
          <AnimatedSection delay={300}>
            <div className="max-w-6xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-md sm:shadow-xl overflow-hidden border border-gray-100">
              <div className="flex flex-col-reverse lg:grid lg:grid-cols-2">

                {/* Contact Info Side */}
                <div className="bg-gradient-to-br from-gray-50 to-[#f7fcf0] p-6 sm:p-10 md:p-12">
                  <AnimatedSection delay={400}>
                    <div className="mb-6 sm:mb-10">
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Contact Information</h2>
                      <p className="text-gray-600 text-sm sm:text-base">Reach out through any channel below</p>
                    </div>
                  </AnimatedSection>

                  {/* Contact Methods */}
                  <div className="space-y-6 sm:space-y-8">
                    {[
                      { icon: Mail, title: "Email Us", detail: "getwebrakor@gmail.com" },
                      { icon: Phone, title: "Call Us", detail: "+91 90327 83863" },
                      { icon: MapPin, title: "Visit Us", detail: "Secunderabad, Hyderabad" }
                    ].map((item, i) => (
                      <AnimatedSection key={i} delay={500 + i * 100}>
                        <div className="flex items-start space-x-3 sm:space-x-4">
                          <div className="bg-white p-2.5 sm:p-3 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                            <item.icon className="text-[#c1f174] w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 text-sm sm:text-base">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.detail}</p>
                          </div>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>

                  {/* Social Media */}
                  <AnimatedSection delay={800}>
                    <div className="mt-8 sm:mt-12">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Follow Us</h3>
                      <div className="flex space-x-3 sm:space-x-4">
                        <a
                          href="https://www.instagram.com/webrakor/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white p-2.5 sm:p-3 rounded-full shadow-sm border border-gray-200 hover:border-[#c1f174] transition-colors flex items-center justify-center"
                        >
                          <Instagram className="text-[#c1f174] w-5 h-5 sm:w-6 sm:h-6" />
                        </a>
                        <a
                          href="https://www.linkedin.com/in/wisecharan/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white p-2.5 sm:p-3 rounded-full shadow-sm border border-gray-200 hover:border-[#c1f174] transition-colors flex items-center justify-center"
                        >
                          <Linkedin className="text-[#c1f174] w-5 h-5 sm:w-6 sm:h-6" />
                        </a>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>

                {/* Form Side */}
                <div className="p-6 sm:p-10 md:p-12 bg-white">
                  <AnimatedSection delay={400}>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Send us a message</h2>
                  </AnimatedSection>
                  <AnimatedSection delay={500}>
                    <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">We'll get back to you within 24 hours</p>
                  </AnimatedSection>

                  {/* Formspree integration */}
                  <form 
                    className="space-y-5 sm:space-y-6" 
                    action="https://formspree.io/f/xandlyqj" 
                    method="POST"
                  >
                    {[
                      { id: "name", label: "Full Name", type: "text" },
                      { id: "email", label: "Email Address", type: "email" },
                      { id: "phone", label: "Phone Number", type: "tel" }
                    ].map((field, i) => (
                      <AnimatedSection key={i} delay={600 + i * 100}>
                        <div className="relative">
                          <input
                            type={field.type}
                            id={field.id}
                            name={field.id}
                            required
                            className="peer h-10 sm:h-12 w-full border-b-2 border-gray-200 text-gray-900 placeholder-transparent focus:outline-none focus:border-[#c1f174]"
                            placeholder=" "
                          />
                          <label
                            htmlFor={field.id}
                            className="absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#c1f174]"
                          >
                            {field.label}
                          </label>
                        </div>
                      </AnimatedSection>
                    ))}

                    <AnimatedSection delay={900}>
                      <div className="relative pt-3">
                        <textarea
                          id="message"
                          name="message"
                          rows={3}
                          required
                          className="peer w-full border-b-2 border-gray-200 text-gray-900 placeholder-transparent focus:outline-none focus:border-[#c1f174] resize-none"
                          placeholder=" "
                        />
                        <label
                          htmlFor="message"
                          className="absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#c1f174]"
                        >
                          Your Message
                        </label>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection delay={1000}>
                      <button
                        type="submit"
                        className="w-full bg-[#c1f174] text-gray-900 font-medium py-2.5 sm:py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
                      >
                        <span>Send Message</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </AnimatedSection>
                  </form>
                </div>

              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </div>
  );
}
