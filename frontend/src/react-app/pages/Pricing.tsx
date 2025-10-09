import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import PricingSection from '@/react-app/components/PricingSection';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24">
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
