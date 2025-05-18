import { FeatureSection } from "src/components/FeatureSection";
import Hero from "src/components/Hero";
import { ModelingServicesSection } from "src/components/ModelingService";
import { ServicesSection } from "src/components/Service";
import { TestimonialsSection } from "src/components/Testimonial";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <FeatureSection />
      <ModelingServicesSection />
      <TestimonialsSection />
    </>
  );
}
