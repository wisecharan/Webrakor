import { Link } from 'react-router-dom';

export default function Footer() {
  const footerLinks = {
    company: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Reviews', href: '/reviews' },
      { name: 'Waitlist', href: '/waitlist' },
      { name: 'Contact', href: '/contact' }
    ],
    social: [
      {name: 'LinkedIn',href: 'https://www.linkedin.com/in/wisecharan/',target: '_blank', rel: 'noopener noreferrer'},
      { name: 'Instagram', href: 'https://www.instagram.com/webrakor.co/', target: '_blank', rel: 'noopener noreferrer' },
      { name: 'Github', href: 'https://github.com/wisecharan', target: '_blank', rel: 'noopener noreferrer' },
    ]
  };

  return (
    <footer className="bg-black text-white py-10 px-6 sm:px-16 lg:px-24 text-sm">
      <div className="max-w-7xl mx-auto">

        {/* Top Section: Flex row for desktop, column for mobile */}
        <div className="flex flex-col sm:flex-row justify-between gap-8 mb-10">

          {/* Links Column */}
          <div className="flex gap-12 sm:gap-16">
            {/* Company Links */}
            <div>
              <h3 className="text-[#c6f678] font-semibold uppercase mb-3">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-[#c6f678] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-[#c6f678] font-semibold uppercase mb-3">Social</h3>
              <ul className="space-y-2">
                {footerLinks.social.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      target={link.target || '_self'}
                      rel={link.rel || undefined}
                      className="text-gray-400 hover:text-[#c6f678] transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="flex flex-col sm:flex-col justify-start sm:justify-end">
            <h3 className="text-white font-semibold mb-3">Executive Insights</h3>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="executive@company.com"
                className="bg-gray-800 text-white px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#c6f678] text-sm flex-1"
              />
              <button className="bg-[#c6f678] text-black px-4 py-2 rounded-full font-medium hover:bg-[#b5e46d] transition-colors text-sm">
                Subscribe
              </button>
            </div>

            {/* Community */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <img
                    key={i}
                    src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i}.jpg`}
                    alt={`Community member ${i}`}
                    className="w-8 h-8 rounded-full border-2 border-black"
                  />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-white font-medium">
                Trusted by 500+ Enterprises
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6 mt-8 text-center sm:text-left">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#c6f678] mb-4">WebRakor.</h2>
          <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 sm:gap-6 text-gray-500 text-xs sm:text-sm">
            <div className="flex gap-4 sm:gap-6">
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-4 sm:gap-6 text-gray-500 text-xs sm:text-sm">
          <a href="#privacy" className="hover:text-[#c6f678] transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-[#c6f678] transition-colors">Terms</a>
          <span>© 2025 WebRakor. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
