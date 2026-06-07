import Hero from "src/components/Hero";
import { FeatureSection } from "src/components/FeatureSection";
import { ModelingServicesSection } from "src/components/ModelingService";
import { ServicesSection } from "src/components/Service";
import { TestimonialsSection } from "src/components/Testimonial";
import {
  StatsBar,
  HowItWorks,
  MaterialsShowcase,
  WhyChooseUs,
  IndustriesSection,
  FaqSection,
  CtaBand,
} from "src/components/HomeSections";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <HowItWorks />
      <ServicesSection />
      <MaterialsShowcase />
      <WhyChooseUs />
      <FeatureSection />
      <IndustriesSection />
      <ModelingServicesSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaBand />
    </>
  );
}
