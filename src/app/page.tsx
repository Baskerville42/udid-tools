import Header from "@/app/components/Header";
import HeroSection from "@/app/components/home/HeroSection";
import HowItWorksSection from "@/app/components/home/HowItWorksSection";
import FeaturesSection from "@/app/components/home/FeaturesSection";
import PrivacySection from "@/app/components/home/PrivacySection";
import CTASection from "@/app/components/home/CTASection";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <PrivacySection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
