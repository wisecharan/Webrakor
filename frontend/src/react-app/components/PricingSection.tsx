import { useState, useEffect, useRef, ReactNode } from 'react';
import { Check, X, ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';

// Animation utility function
const animateOnScroll = (element: HTMLElement, delay = 0) => {
  element.style.transition = `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`;
  element.style.opacity = '1';
  element.style.transform = 'translateY(0)';
};

// Component wrapper with animationcode that van e
interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current; 
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            animateOnScroll(entry.target, delay);
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
        transform: 'translateY(20px)',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

interface Feature {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  category: string;
}

// Main Pricing Section Component
export default function PricingSection() {
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<Record<string, boolean>>({});
  const [showContactCard, setShowContactCard] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const exchangeRate = 83; // Placeholder

  const formatPrice = (usd: number) => {
    return currency === 'USD' ? `$${usd.toLocaleString()}` : `₹${(usd * exchangeRate).toLocaleString()}`;
  };

  // Define all available features
  const allFeatures: Feature[] = [
    { id: 'responsive', name: 'Responsive Design (Mobile-First)', description: 'Looks great on all devices', basePrice: 500, category: 'Design' },
    { id: 'custom_ui', name: 'Custom UI/UX Design', description: 'Tailored interface for your brand', basePrice: 1000, category: 'Design' },
    { id: 'cms', name: 'Content Management System', description: 'Easy content updates', basePrice: 1500, category: 'Functionality' },
    { id: 'seo', name: 'Advanced SEO Implementation', description: 'Better search engine visibility', basePrice: 800, category: 'Marketing' },
    { id: 'ecommerce', name: 'Basic E-commerce Functionality', description: 'Sell products online', basePrice: 2000, category: 'Functionality' },
    { id: 'contact_forms', name: 'Custom Contact Forms', description: 'Lead generation forms', basePrice: 300, category: 'Functionality' },
    { id: 'performance', name: 'Performance Optimization', description: 'Fast loading times', basePrice: 600, category: 'Technical' },
    { id: 'security', name: 'Security Features', description: 'Enhanced protection', basePrice: 700, category: 'Technical' },
    { id: 'maintenance', name: 'Post-launch Maintenance Plan', description: 'Ongoing support', basePrice: 1200, category: 'Service' },
  ];

  // Calculate total price based on selected features
  const calculateTotal = () => {
    return allFeatures.reduce((total, feature) => {
      return selectedFeatures[feature.id] ? total + feature.basePrice : total;
    }, 0);
  };

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => ({
      ...prev,
      [featureId]: !prev[featureId]
    }));
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleRequestQuote = () => {
    setShowContactCard(true);
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    alert(`Thank you ${contactName}! We'll contact you at ${contactEmail} with your custom quote.`);
    // Reset form
    setContactName('');
    setContactEmail('');
    setContactMessage('');
    setShowContactCard(false);
  };

  const plans = [
    {
      name: 'Starter Package',
      price: 1500,
      description: 'Ideal for informational websites, portfolios, or landing pages with a clean, professional design.',
      features: [
        { name: '1-3 Page Website', included: true },
        { name: 'Responsive Design (Mobile-First)', included: true },
        { name: 'Custom User Interface (UI) Design', included: true },
        { name: 'Frontend Development (HTML, CSS, JS)', included: true },
        { name: 'Performance Optimization', included: true },
        { name: 'Basic SEO Setup', included: true },
        { name: 'Full-stack Development', included: false },
        { name: 'Advanced Features', included: false },
        { name: 'Post-launch Maintenance Plan', included: false },
        { name: 'Content Management System (CMS)', included: false },
      ],
      cta: 'Request a Quote',
      popular: false,
    },
    {
      name: 'Business Package',
      price: 3500,
      description: 'A comprehensive solution for businesses needing a robust website with dynamic content and advanced features.',
      features: [
        { name: 'Up to 10 Page Website', included: true },
        { name: 'Responsive Design (Mobile-First)', included: true },
        { name: 'Custom UI/UX Design', included: true },
        { name: 'Frontend Development (HTML, CSS, JS)', included: true },
        { name: 'Performance Optimization', included: true },
        { name: 'Advanced SEO Implementation', included: true },
        { name: 'Full-stack Development', included: true },
        { name: 'Integrated CMS (WordPress, Sanity, etc.)', included: true },
        { name: 'Custom Contact Forms & Lead Generation', included: true },
        { name: 'Basic E-commerce Functionality', included: true },
        { name: 'Post-launch Maintenance Plan', included: false },
      ],
      cta: 'Request a Quote',
      popular: true,
    }
  ];

  const faqQuestions = [
    {
      question: 'What is a "one-time, project-based fee"?',
      answer: 'This means you pay a single fee for the development of your website. There are no recurring charges for the development work itself. Any additional services like hosting or ongoing maintenance would be separate.',
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary greatly depending on the complexity and scope. A starter package might take a few weeks, while a business or enterprise project could take a few months. We will provide a detailed timeline in your custom project proposal.',
    },
    {
      question: 'What is the difference between frontend and full-stack development?',
      answer: 'Frontend development is what the user sees and interacts with (the design, buttons, and layout). Full-stack development includes the frontend plus the backend, which is the server, database, and application logic that runs behind the scenes.',
    },
    {
      question: 'How does the payment process work?',
      answer: 'We typically work on a milestone-based payment schedule. This means you will make an initial deposit to begin the project, with subsequent payments due upon the completion of agreed-upon project milestones. This ensures you are always in control of your budget.',
    },
    {
      question: 'What happens after the website is launched?',
      answer: 'Once your website is live, we provide a period of support to ensure everything is running smoothly. We also offer optional maintenance and support plans for ongoing updates, security, and feature enhancements, which can be arranged separately.',
    },
  ];

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  // Group features by category
  const featuresByCategory = allFeatures.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, Feature[]>);

  // Collapse all categories by default
  useEffect(() => {
    const initialExpanded: Record<string, boolean> = {};
    Object.keys(featuresByCategory).forEach(category => {
      initialExpanded[category] = false; // Collapsed by default
    });
    setExpandedCategories(initialExpanded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8" id="pricing">
      <div className="max-w-xs sm:max-w-5xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-10 sm:mb-16">
            <AnimatedSection delay={100}>
              <div className="text-xs sm:text-sm font-semibold text-gray-500 tracking-wider uppercase mb-3 sm:mb-4">
                Transparent Pricing
              </div>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <h2 className="text-3xl sm:text-6xl font-bold text-gray-900 mb-6">
                Website Packages <br />For Every Need.
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={300}>
              <p className="text-sm sm:text-lg text-gray-600 mb-4 max-w-2xl mx-auto">
                Choose from our predefined packages or build your own custom solution.
              </p>
            </AnimatedSection>

            {/* Currency Selector */}
            <AnimatedSection delay={400}>
              <div className="flex items-center justify-center gap-4">
                <span className="text-sm sm:text-base text-gray-500">Currency</span>
                <select
                  className="px-2 sm:px-3 py-0.5 sm:py-1 border rounded-md bg-white text-gray-900 text-sm"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as 'USD' | 'INR')}
                >
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                </select>
              </div>
            </AnimatedSection>
          </div>
        </AnimatedSection>

        {/* Pricing Cards - Moved to appear first */}
        <AnimatedSection delay={100}>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">Predefined Packages</h2>
          <p className="text-sm sm:text-lg text-gray-600 text-center max-w-2xl mx-auto mb-8">
            Select exactly the features you need. Watch your custom package price update in real-time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-4xl mx-auto mb-16">
            {plans.map((plan, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div
                  className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 border transition-all ${plan.popular
                      ? 'border-[#c6f678] bg-black text-[#c6f678] shadow-lg transform scale-[1.02]'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-[#c6f678] text-black px-4 sm:px-5 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide">
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="mb-8">
                    <h3
                      className={`text-sm font-bold tracking-widest uppercase mb-4 ${plan.popular ? 'text-[#c6f678]' : 'text-gray-500'
                        }`}
                    >
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-4xl sm:text-5xl font-bold">{formatPrice(plan.price)}</span>
                    </div>
                    <p className={`text-sm leading-relaxed ${plan.popular ? 'text-[#c6f678]/90' : 'text-gray-600'}`}>
                      {plan.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <ul className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          {feature.included ? (
                            <Check
                              className={`w-5 h-5 sm:w-6 sm:h-6 mr-3 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-[#c6f678]' : 'text-[#a3e635]'
                                }`}
                            />
                          ) : (
                            <X
                              className={`w-5 h-5 sm:w-6 sm:h-6 mr-3 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-gray-500' : 'text-gray-400'
                                }`}
                            />
                          )}
                          <span
                            className={`text-sm ${feature.included
                                ? plan.popular
                                  ? 'text-[#c6f678]'
                                  : 'text-gray-900'
                                : plan.popular
                                  ? 'text-gray-500'
                                  : 'text-gray-400'
                              }`}
                          >
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-3.5 rounded-lg font-semibold transition-all duration-200 text-sm ${plan.popular
                        ? 'bg-[#c6f678] text-black hover:bg-[#b8f566] hover:shadow-md'
                        : 'bg-black text-white hover:bg-gray-800 hover:shadow-md'
                      }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* Content Image Section */}
        <AnimatedSection delay={300}>
          <div className="mb-20 bg-gray-50 rounded-3xl overflow-hidden shadow-lg">
            <div className="grid md:grid-cols-2 gap-0 items-center">
              {/* Image Section */}
              <div className="h-80 md:h-full">
                <img
                  src="https://images.unsplash.com/photo-1743038547753-70a161ff3079?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8"
                  alt="Custom web solution"
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Content Section */}
              <div className="p-8 sm:p-12 lg:p-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Custom Web Solutions <br /> Built for Your Business
                </h2>
                <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-xl">
                  Whether you're launching a startup or scaling an enterprise product, we deliver tailor-made websites and platforms that align with your vision, goals, and timeline. Work directly with a team that values performance, design, and innovation.
                </p>
                <a
                  href="/Contact"
                  className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  Let's Build Together
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>


        {/* FAQ Section */}
        <AnimatedSection delay={400}>
          <div className="mt-12 sm:mt-20 max-w-4xl mx-auto px-2 sm:px-0">
            <AnimatedSection delay={100}>
              <h2 className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">Frequently Asked Questions</h2>
            </AnimatedSection>
            <div className="space-y-4 sm:space-y-6">
              {faqQuestions.map((faq, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <div
                    className="border rounded-lg p-4 sm:p-6 cursor-pointer"
                    onClick={() => toggleFaq(index)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm sm:text-base font-semibold">{faq.question}</h3>
                      {faqOpen === index ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                    {faqOpen === index && (
                      <p className="mt-2 text-xs sm:text-sm text-gray-600">{faq.answer}</p>
                    )}
                  </div>
                </AnimatedSection>  
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}