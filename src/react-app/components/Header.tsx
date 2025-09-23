import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronUp } from "lucide-react"; // scroll-to-top icon

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const navItems = [
    { to: "/about", label: "About Us" },
    { to: "/pricing", label: "Plans & Pricing" },
    { to: "/reviews", label: "Success Stories" },
    { to: "/waitlist", label: "Waitlist" },
    { to: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white border-b border-gray-200 shadow-sm"
            : "bg-white"
        }`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16 relative">
          <div className="flex-shrink-0 mr-auto">
            <Link to="/" onClick={handleLinkClick} className="flex items-center">
              <img src="/LOGO.png" alt="Company Logo" className="h-5 w-auto" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Webrakor
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex flex-1 justify-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={handleLinkClick}
                className={`text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm ${
                  location.pathname === item.to ? "font-semibold" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex ml-auto">
            <Link to="/contact" onClick={handleLinkClick}>
              <button className="bg-black text-white px-3 py-1 rounded-full font-medium hover:bg-gray-800 transition-colors text-sm">
                Go Live
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden ml-auto w-10 h-8 p-1 flex items-center justify-center bg-black rounded-lg"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 z-[60] flex ${
            isMobileMenuOpen ? "visible" : "invisible"
          }`}
        >
          {/* Background with fade + blur */}
          <div
            className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ease-in-out ${
              isMobileMenuOpen
                ? "opacity-100 backdrop-blur-sm"
                : "opacity-0 backdrop-blur-none"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Slide-in Menu Panel */}
          <div
            ref={menuRef}
            className={`relative ml-auto h-full w-3/4 max-w-sm bg-white p-6 shadow-xl transform transition-transform duration-500 ease-in-out z-[70] ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center mb-8">
              <Link
                to="/"
                onClick={handleLinkClick}
                className="flex items-center space-x-2"
              >
                <img src="/LOGO.png" alt="Company Logo" className="h-6 w-auto" />
                <span className="text-xl font-bold text-gray-900">
                  Webrakor
                </span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={handleLinkClick}
                  className={`block text-gray-800 hover:text-gray-900 font-medium transition-colors p-3 rounded-lg ${
                    location.pathname === item.to ? "bg-gray-100" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Scroll-to-top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black text-white shadow-md hover:bg-gray-800 transition duration-300 transform
        ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
        aria-label="Scroll to top"
      >
        <ChevronUp size={20} />
      </button>
    </>
  );
}
