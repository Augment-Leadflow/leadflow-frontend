import { Header }              from './components/Header';
import { HeroSection }         from './components/sections/HeroSection';
import { AboutSection }        from './components/sections/AboutSection';
import { FeaturesSection }     from './components/sections/FeaturesSection';
import { LeadFeaturesSection } from './components/sections/LeadFeaturesSection';
import { StatsSection }        from './components/sections/StatsSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { ContactSection }      from './components/sections/ContactSection';
import { Footer }              from './components/Footer';

export const metadata = {
  title: 'LeadFlow — Smart Lead Management CRM',
  description:
    'LeadFlow is the all-in-one CRM platform to capture, nurture and convert leads faster. Trusted by 50,000+ businesses worldwide.',
};

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <LeadFeaturesSection />
        <StatsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}