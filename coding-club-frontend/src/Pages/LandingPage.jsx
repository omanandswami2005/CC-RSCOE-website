import LandingSection from '../Components/LandingSection.jsx';
import AboutPage from '../Components/AboutPage.jsx';
import Footer from '../Components/Footer.jsx';
import PricingSection from '../Components/PricingSection.jsx';
import DynamicFAQs from '../Components/DynamicFAQs.jsx';
import DynamicTimeline from '../Components/DynamicTimeline.jsx';
import DynamicTestimonials from '../Components/DynamicTestimonials.jsx';
import AchievementsSection from '../Components/AchievementsSection.jsx';
import Discord from '../Components/Discord.jsx';

function LandingPage() {
  return (
    <>
      <div id="landing">
        <LandingSection />
      </div>
      <div id="about">
        <AboutPage />
      </div>
      <div id="teams">
        <DynamicTestimonials />
      </div>
      <div id="achievements">
        <AchievementsSection />
      </div>
      <div id="timeline">
        <DynamicTimeline />
      </div>
      <div id="pricing">
        <PricingSection />
      </div>
      <div id="discord">
        <Discord />
      </div>
      <div id="faqs">
        <DynamicFAQs />
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;