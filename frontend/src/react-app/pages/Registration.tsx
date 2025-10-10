import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import { CheckCircle, ExternalLink } from 'lucide-react';
import React, { useState, useMemo, Fragment } from 'react';
import apiClient from '@/api/axios';
import AnimatedSection from '@/react-app/components/AnimatedSection';
import { Dialog, Transition } from '@headlessui/react';

const Registration = () => {
  // --- State and Logic (No changes here) ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNo: '',
    collegeName: '',
    courseSpecialization: '',
    yearOfStudy: '',
    howDidYouHear: 'Social Media',
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      await apiClient.post('/api/register', formData);
      setIsModalOpen(true);
      setFormData({
        name: '', email: '', contactNo: '', collegeName: '',
        courseSpecialization: '', yearOfStudy: '', howDidYouHear: 'Social Media',
      });
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Something went wrong!');
    }
  };

  // --- Content (No changes here) ---
  const benefits = [
    "Get a real-world overview of software development",
    "Clarify your career doubts with experienced seniors",
    "Understand what skills matter beyond academics",
    "Connect with a community of like-minded peers",
    "Get a head start on your tech journey"
  ];

  const formFields = useMemo(() => [
    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your Full Name', required: true },
    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your.email@college.edu', required: true },
    { name: 'contactNo', label: 'Contact No.', type: 'text', placeholder: '10-digit mobile number', required: true },
    { name: 'collegeName', label: 'College Name', type: 'text', placeholder: 'Name of Your College', required: true },
    { name: 'yearOfStudy', label: 'Year of Study', type: 'text', placeholder: 'e.g., Second Year', required: true },
    { name: 'courseSpecialization', label: 'Course/Branch', type: 'text', placeholder: 'e.g., Computer Science', required: false },
  ], []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section and Form remain the same */}
          <AnimatedSection>
            <div className="text-center mb-14 sm:mb-20">
              <AnimatedSection delay={100}>
                <div className="inline-flex items-center bg-gray-100 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium border border-gray-200 shadow-sm mb-6 sm:mb-8">
                  <span className="text-[#c6f678] font-bold mr-2">●</span>
                  A Session by Rakors, for Beginners
                </div>
              </AnimatedSection>
              <AnimatedSection delay={200}>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-black tracking-tight mb-4 sm:mb-6 break-words">
                  Rakor Rise
                </h1>
              </AnimatedSection>
              <AnimatedSection delay={300}>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
                  Join us for a session to explore the world of software development beyond your syllabus and get your career questions answered.
                </p>
              </AnimatedSection>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            <div>
              <AnimatedSection delay={400}>
                <h2 className="text-xl sm:text-2xl font-semibold text-black mb-3 sm:mb-5 text-center sm:text-left">
                  What to Expect
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

            <AnimatedSection delay={400}>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">
                  Register for the Session
                </h3>
                <form onSubmit={onSubmit} className="space-y-5 sm:space-y-6">
                  {formFields.map((field, idx) => (
                    <div key={field.name}>
                      <AnimatedSection delay={500 + (idx * 100)}>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                          {field.label}{field.required ? ' *' : ''}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={onChange}
                          placeholder={field.placeholder}
                          required={field.required}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#c6f678] focus:ring-2 focus:ring-[#c6f678]/20 transition-all text-sm sm:text-base"
                        />
                      </AnimatedSection>
                    </div>
                  ))}
                  <AnimatedSection delay={1100}>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      How did you hear about us? *
                    </label>
                    <select name="howDidYouHear" value={formData.howDidYouHear} onChange={onChange} required className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#c6f678] focus:ring-2 focus:ring-[#c6f678]/20 transition-all text-sm sm:text-base bg-white">
                      <option>Social Media</option>
                      <option>College</option>
                      <option>Friend</option>
                      <option>Other</option>
                    </select>
                  </AnimatedSection>
                  <AnimatedSection delay={1200}>
                    <button type="submit" className="w-full bg-black text-[#c6f678] py-3 sm:py-4 rounded-full font-semibold hover:scale-[1.02] transition-transform text-sm sm:text-base">
                      Confirm My Spot
                    </button>
                  </AnimatedSection>
                </form>
                <AnimatedSection delay={1300}>
                  {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                </AnimatedSection>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </main>
      <Footer />

      {/* --- REFINED Success Modal --- */}
      <Transition appear show={isModalOpen} as={Fragment}>
        {/* UPDATED: onClose is set to an empty function to prevent closing on overlay click */}
        <Dialog as="div" className="relative z-50" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                      You're In!
                    </div>
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Next Step:</span> Join the WhatsApp group for all session details, reminders, and resources.
                    </p>
                  </div>
                  <div className="mt-6">
                    <a
                      href="https://chat.whatsapp.com/HauSmsP4FdADYe5Zk71eBu?mode=wwc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full justify-center items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    >
                      Join WhatsApp Group
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                   <div className="mt-4">
                    {/* UPDATED: Close button is now visible */}
                    <button
                      type="button"
                      className="text-xs text-gray-500 hover:underline"
                      onClick={() => setIsModalOpen(false)}
                    >
                      I'll join later
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Registration;