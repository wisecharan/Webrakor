import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Your existing page imports
import HomePage from "@/react-app/pages/Home";
import AboutPage from "@/react-app/pages/About";
import ReviewsPage from "@/react-app/pages/Reviews";
import WaitlistPage from "@/react-app/pages/Waitlist";
import ContactPage from "@/react-app/pages/Contact";
import PricingPage from "@/react-app/pages/Pricing";

// --- NEW IMPORTS ---
// Import the new pages and the protected route component
import Registration from "@/react-app/pages/Registration";
import AdminLogin from "@/react-app/pages/AdminLogin";
import AdminDashboard from "@/react-app/pages/AdminDashboard";
import ProtectedRoute from "@/react-app/components/ProtectedRoute"; // Make sure the path is correct

//scroll-to-top component (no changes needed here)
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
        {/* Your existing routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/waitlist" element={<WaitlistPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* --- NEW ROUTES --- */}
        {/* Public route for the workshop registration form */}
        <Route path="/register" element={<Registration />} />

        {/* Public route for the admin login page */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* A protected route for the admin dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}