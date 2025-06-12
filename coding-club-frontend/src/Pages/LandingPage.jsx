
import LandingSection from '../Components/LandingSection.jsx';
import AboutPage from '../Components/AboutPage.jsx';
import Footer from '../Components/Footer.jsx';
import PricingSection from '../Components/PricingSection.jsx';
import FAQs from '../Components/FAQs.jsx';
import Timeline from '../Components/Timeline.jsx';
import Teams from '../Components/Teams.jsx';
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
        <Teams />
      </div>
      <div id="timeline">
        <Timeline />
      </div>
      <div id="pricing">
        <PricingSection />
      </div>
      <div id="discord">
        <Discord />
      </div>
      <div id="faqs">
        <FAQs />
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;