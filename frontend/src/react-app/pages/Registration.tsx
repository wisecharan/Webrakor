import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import { CheckCircle } from 'lucide-react';
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import apiClient from '@/api/axios';

// This is the complete, restyled Registration component
const Registration = () => {
  // --- Animation Logic from Waitlist Component ---
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
      if (currentRef) observer.observe(currentRef);
      return () => {
        if (currentRef) observer.unobserve(currentRef);
      };
    }, [delay]);
    return (
      <div
        ref={ref}
        style={{ opacity: 0, transform: 'translateY(30px)', willChange: 'opacity, transform' }}
      >
        {children}
      </div>
    );
  };

  // --- Original Registration State and Logic ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNo: '',
    collegeName: '',
    courseSpecialization: '',
    yearOfStudy: '',
    howDidYouHear: 'Social Media',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { name, email, contactNo, collegeName, courseSpecialization, yearOfStudy, howDidYouHear } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const res = await apiClient.post('/api/register', formData);
      setMessage(res.data.msg);
      setFormData({
        name: '', email: '', contactNo: '', collegeName: '',
        courseSpecialization: '', yearOfStudy: '', howDidYouHear: 'Social Media',
      });
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Something went wrong!');
    }
  };
  
  // --- New Content and Layout ---
  const benefits = [
    "Gain hands-on experience with industry-relevant tools",
    "Receive a certificate of completion",
    "Network with professionals and peers",
    "Get exclusive access to our resource library",
    "Direct Q&A sessions with expert instructors"
  ];

  // Configuration for the form fields
  const formFields = [
    { name: 'name', type: 'text', placeholder: 'Your Full Name', value: name, required: true },
    { name: 'email', type: 'email', placeholder: 'your.email@college.edu', value: email, required: true },
    { name: 'contactNo', type: 'text', placeholder: '10-digit mobile number', value: contactNo, required: true },
    { name: 'collegeName', type: 'text', placeholder: 'Name of Your College', value: collegeName, required: true },
    { name: 'yearOfStudy', type: 'text', placeholder: 'e.g., Third Year', value: yearOfStudy, required: true },
    { name: 'courseSpecialization', type: 'text', placeholder: 'e.g., Computer Science (Optional)', value: courseSpecialization, required: false },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <AnimatedSection>
            <div className="text-center mb-14 sm:mb-20">
              <AnimatedSection delay={100}>
                <div className="inline-flex items-center bg-gray-100 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium border border-gray-200 shadow-sm mb-6 sm:mb-8">
                  <span className="text-[#c6f678] font-bold mr-2">●</span>
                  Limited Seats Available
                </div>
              </AnimatedSection>
              <AnimatedSection delay={200}>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-black tracking-tight mb-4 sm:mb-6 break-words">
                  Register for the Workshop
                </h1>
              </AnimatedSection>
              <AnimatedSection delay={300}>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
                  Join students from across India in this exclusive hands-on workshop to boost your skills and career prospects.
                </p>
              </AnimatedSection>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            {/* Benefits Column */}
            <div>
              <AnimatedSection delay={400}>
                <h2 className="text-xl sm:text-2xl font-semibold text-black mb-3 sm:mb-5 text-center sm:text-left">
                  What You'll Gain
                </h2>
              </AnimatedSection>
              <ul className="space-y-3 sm:space-y-4">
                {benefits.map((benefit, index) => (
                  <AnimatedSection key={index} delay={500 + (index * 100)}>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#c6f678] mr-2.5 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800 text-xs sm:text-sm leading-snug">{benefit}</span>
                    </li>
                  </AnimatedSection>
                ))}
              </ul>
            </div>

            {/* Form Column */}
            <AnimatedSection delay={400}>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">
                  Secure Your Spot
                </h3>

                <form onSubmit={onSubmit} className="space-y-5 sm:space-y-6">
                  {formFields.map((field, idx) => (
                    <AnimatedSection key={field.name} delay={500 + (idx * 100)}>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                          {field.placeholder.includes('Optional') ? field.name.replace(/([A-Z])/g, ' $1').trim() : `${field.name.replace(/([A-Z])/g, ' $1').trim()} *`}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={field.value}
                          onChange={onChange}
                          placeholder={field.placeholder}
                          required={field.required}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#c6f678] focus:ring-2 focus:ring-[#c6f678]/20 transition-all text-sm sm:text-base"
                        />
                      </div>
                    </AnimatedSection>
                  ))}
                  
                  <AnimatedSection delay={1100}>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                        How did you hear about us? *
                      </label>
                      <select name="howDidYouHear" value={howDidYouHear} onChange={onChange} required className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#c6f678] focus:ring-2 focus:ring-[#c6f678]/20 transition-all text-sm sm:text-base bg-white">
                        <option>Social Media</option>
                        <option>College</option>
                        <option>Friend</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </AnimatedSection>
                  
                  <AnimatedSection delay={1200}>
                    <button type="submit" className="w-full bg-black text-[#c6f678] py-3 sm:py-4 rounded-full font-semibold hover:scale-[1.02] transition-transform text-sm sm:text-base">
                      Register Now
                    </button>
                  </AnimatedSection>
                </form>

                <AnimatedSection delay={1300}>
                  {message && <p className="text-green-500 text-center mt-4">{message}</p>}
                  {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                </AnimatedSection>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Registration;