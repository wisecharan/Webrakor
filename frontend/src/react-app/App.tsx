import { Routes, Route } from "react-router-dom"; 
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HomePage from "@/react-app/pages/Home";
import AboutPage from "@/react-app/pages/About";
import ReviewsPage from "@/react-app/pages/Reviews";
import WaitlistPage from "@/react-app/pages/Waitlist";
import ContactPage from "@/react-app/pages/Contact";
import PricingPage from "@/react-app/pages/Pricing";

//scroll-to-top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/waitlist" element={<WaitlistPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}
