import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorks from "@/components/landing/HowItWorks";
import UseCases from "@/components/landing/UseCases";
import AIAssistantSection from "@/components/landing/AIAssistantSection";
import PrivacySection from "@/components/landing/PrivacySection";
import TargetCustomers from "@/components/landing/TargetCustomers";
import Testimonials from "@/components/landing/Testimonials";
import PricingTeaser from "@/components/landing/PricingTeaser";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <HowItWorks />
        <UseCases />
        <AIAssistantSection />
        <PrivacySection />
        <TargetCustomers />
        <Testimonials />
        <PricingTeaser />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
