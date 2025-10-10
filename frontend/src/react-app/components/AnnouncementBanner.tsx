import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const AnnouncementBanner = () => {
  return (
    // The main container for the section with vertical padding
    <div className="pt-10 sm:pt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* The card itself with a subtle background, border, and rounded corners */}
        <div className="bg-slate-50/75 border border-slate-200/75 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            
            {/* Left side: Text content */}
            <div className="flex-1">
              <div className="inline-flex items-center bg-white text-gray-800 px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 shadow-sm mb-4">
                <Sparkles className="w-4 h-4 text-[#c6f678] mr-2" />
                An Exclusive Session for Beginners
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
                Rakor Rise
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto md:mx-0">
                Join the Rakors for a friendly guide into the world of software development. No jargon, just real-world advice to kickstart your journey.
              </p>
            </div>

            {/* Right side: Call to action button */}
            <div className="flex-shrink-0 mt-4 md:mt-0">
              <Link
                to="/register"
                className="group inline-flex items-center justify-center px-6 py-3 rounded-full bg-black text-[#c6f678] font-semibold text-base shadow-lg hover:scale-[1.03] transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                Secure Your Spot
                <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;