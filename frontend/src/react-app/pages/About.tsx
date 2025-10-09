import { Linkedin, Mail } from 'lucide-react';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import React, { useEffect, useRef, ReactNode } from 'react';

export default function About() {
  // Animation utility
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
          transform: 'translateY(30px)',
          willChange: 'opacity, transform',
        }}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Section: Page Header */}
          <AnimatedSection>
            <p className="text-xs sm:text-sm font-semibold text-gray-500 text-center tracking-widest uppercase mb-2">
              Behind the Rakor
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center text-gray-900 mb-0 break-words">
              Rakor Dynamics
            </h1>
          </AnimatedSection>

          {/* Section: About Hero */}
          <AnimatedSection delay={100}>
            <div className="relative z-10 w-full max-w-[90rem] mx-auto px-4 sm:px-8 py-8 sm:py-12 text-center">

              <AnimatedSection delay={200}>
                <div className="flex justify-center mb-4">
                  <div className="flex -space-x-3">
                    {/* Team Profile Images */}
                    {[
                      'https://media.licdn.com/dms/image/v2/D4D03AQGTRVrx25ibqA/profile-displayphoto-shrink_400_400/B4DZleNCr.JAAg-/0/1758222103889?e=1761177600&v=beta&t=retruOF-2V3ZHmZgARCBugQ6_sKOtwB19tsOr0LasM8',
                      'https://media.licdn.com/dms/image/v2/D5603AQG0t2EJOna3Sw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728107387117?e=1761177600&v=beta&t=4SPQWuhLLp9gGRbUOm9Yu8_tG4nP0ssxYFvpuc6bXy0',
                      'https://media.licdn.com/dms/image/v2/D5603AQFgsD-HFjjSRw/profile-displayphoto-shrink_400_400/B56Zb4s1p_HwAo-/0/1747929227438?e=1761177600&v=beta&t=_tTYg4XlpPAw19Z8tbFo5lnrm7Eqie6i3sDoBi84ubE',
                    ].map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt={`Profile ${idx + 1}`}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-snug max-w-4xl mx-auto break-words">
                  We are building AI-powered solutions that help businesses grow, guide students in careers, and create meaningful digital impact.
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={400}>
                <p className="mt-4 text-sm sm:text-base text-gray-500 px-2 sm:px-0">
                  Our vision is to bridge the gap between education, enterprises, and innovation <br />
                  through bold, simple, and effective solutions.
                </p>
              </AnimatedSection>
            </div>
          </AnimatedSection>

          {/* Section: Values */}
          <AnimatedSection delay={200}>
            <div className="mb-16">
              <AnimatedSection delay={300}>
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-10">
                  Our Guiding Principles
                </h2>
              </AnimatedSection>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
                {[
                  {
                    title: 'AI-Powered Innovation',
                    content:
                      'We continuously push the boundaries of what AI can achieve in web creation. Our platform is a testament to our commitment to innovation, delivering smarter, more effective solutions that keep you ahead of the curve.',
                  },
                  {
                    title: 'Effortless Experience',
                    content:
                      'Building a professional website shouldn’t be complicated. We eliminate the complexity and friction of traditional development, providing an intuitive platform that allows you to launch your site in days, not months.',
                  },
                  {
                    title: 'Your Success, Our Focus',
                    content:
                      'Your business goals are our mission. By providing the tools, insights, and dedicated support you need to succeed, we ensure that our platform is a powerful engine for your growth. We succeed when our clients succeed.',
                  },
                ].map((item, index) => (
                  <AnimatedSection key={index} delay={400 + index * 100}>
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                      <p className="text-gray-600">{item.content}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Section: Project Onboarding */}
          <AnimatedSection delay={300}>
            <div className="mb-16">
              <AnimatedSection delay={400}>
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-10">
                  Project Onboarding
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={500}>
                <p className="text-lg sm:text-xl text-gray-600 text-center max-w-3xl mx-auto mb-10 leading-relaxed px-2 sm:px-0">
                  What starts as a simple brief becomes a shared mission to build bold, custom digital experiences powered by Rakor craftsmanship.
                </p>
              </AnimatedSection>

              <div className="max-w-3xl mx-auto">
                {[
                  {
                    year: 'Step 1',
                    title: 'Discover & Define',
                    text: 'We start with deep-dive conversations to understand your vision, goals, and brand identity. Every project begins with listening not assumptions.',
                  },
                  {
                    year: 'Step 2',
                    title: 'Scoping & Strategy',
                    text: 'We map out the scope, define technical needs, and build a project roadmap. You’ll get clear timelines, deliverables, and what success looks like.',
                  },
                  {
                    year: 'Step 3',
                    title: 'Kickoff & Collaboration',
                    text: 'Your Rakor team is introduced. We establish communication channels, project tools, and workflows. You\'re not in the dark you\'re in the loop.',
                  },
                  {
                    year: 'Step 4',
                    title: 'Design & Development Onboarding',
                    text: 'Assets, access, and brand guidelines are aligned. We onboard your project into our systems, ensuring our devs build with your exact vision in mind.',
                  },
                  {
                    year: 'Step 5',
                    title: 'Launch-Ready Sync',
                    text: 'Before any code goes live, we sync with you one last time to align on quality checks, final feedback, and go-to-market readiness.',
                  },
                ].map((item, index) => (
                  <AnimatedSection key={index} delay={600 + index * 100}>
                    <div className="border-l-2 border-gray-200 pl-6 sm:pl-8 pb-8 relative">
                      <div className="absolute w-4 h-4 bg-[#c3f376] rounded-full -left-2 top-0"></div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{item.year}</h3>
                      <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">{item.title}</h4>
                      <p className="text-gray-600">{item.text}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Section: Team */}
          <AnimatedSection delay={400}>
            <div className="mb-16">
              <div className="text-center mb-8">
                <AnimatedSection delay={700}>
                  <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">
                    Let's Meet Our Team
                  </h2>
                </AnimatedSection>

                <AnimatedSection delay={800}>
                  <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
                    We are a team of innovators, engineers, and problem-solvers passionate about building AI products that transform businesses and careers.
                  </p>
                </AnimatedSection>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-10">
                {/* Team members */}
                {[
                  {
                    name: 'Sai Charan Puduthala',
                    role: 'Founder & CEO',
                    description: 'Leading WebRakor with a mission to deliver AI-powered growth solutions and empower learners.',
                    img: 'https://media.licdn.com/dms/image/v2/D4D03AQGTRVrx25ibqA/profile-displayphoto-shrink_400_400/B4DZleNCr.JAAg-/0/1758222103889?e=1761177600&v=beta&t=retruOF-2V3ZHmZgARCBugQ6_sKOtwB19tsOr0LasM8',
                    social: {
                      email: 'mailto:charans.workspace@gmail.com',
                      linkedin: 'https://www.linkedin.com/in/wisecharan/',
                    },
                  },
                  {
                    name: 'Omkar Sai Kshitij',
                    role: 'Co-Founder',
                    description: 'Focused on building WebRakor’s AI ecosystem and scaling impactful solutions.',
                    img: 'https://media.licdn.com/dms/image/v2/D5603AQFcUPbSHdXlvA/profile-displayphoto-scale_400_400/B56Zk8__kSHkAg-/0/1757665034623?e=1761177600&v=beta&t=iMsk5tkSfBbRcCppbd0Z1lYJY8FxDt1setBrydK2-nY',
                    social: {
                      email: 'mailto:',
                      linkedin: 'https://www.linkedin.com/in/kshitijomkar/',
                    },
                  },
                  {
                    name: 'Rama Manikanth',
                    role: 'Chief Data Analyst',
                    description: 'Bringing insights to life with data-driven decisions and scalable AI solutions.',
                    img: 'https://media.licdn.com/dms/image/v2/D5603AQG0t2EJOna3Sw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728107387117?e=1761177600&v=beta&t=4SPQWuhLLp9gGRbUOm9Yu8_tG4nP0ssxYFvpuc6bXy0',
                    social: {
                      email: 'mailto:',
                      linkedin: 'https://www.linkedin.com/in/rmkp888/',
                    },
                  },
                  {
                    name: 'Rohith Kandula',
                    role: 'Chief Financial Officer',
                    description: 'Driving WebRakor’s finance, growth, and long-term strategic vision.',
                    img: 'https://media.licdn.com/dms/image/v2/D5603AQFgsD-HFjjSRw/profile-displayphoto-shrink_400_400/B56Zb4s1p_HwAo-/0/1747929227438?e=1761177600&v=beta&t=_tTYg4XlpPAw19Z8tbFo5lnrm7Eqie6i3sDoBi84ubE',
                    social: {
                      email: 'mailto:',
                      linkedin: 'https://www.linkedin.com/in/ksgl-rohith/',
                    },
                  },
                ].map((member, idx) => (
                  <AnimatedSection key={idx} delay={1000 + idx * 100}>
                    <div className="bg-white p-6 rounded-2xl text-center shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                      <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full border-2 border-gray-200">
                        <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-sm text-gray-500 mb-4">{member.role}</p>
                      <p className="text-sm text-gray-600 mb-6">{member.description}</p>
                      <div className="flex justify-center space-x-4">
                        <a
                          href={member.social.email}
                          aria-label="Email"
                          className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Mail className="w-5 h-5" />
                        </a>
                        <a
                          href={member.social.linkedin}
                          aria-label="LinkedIn"
                          className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  );
}