import { BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ShowSection from "./components/ShowSection";
import FullShowSection from "./components/FullShowSection";
import FullAboutUsSection from "./components/FullAboutUsSection";
import FullSponsorshipSection from "./components/FullSponsorShipSection";
import Footer from "./components/Footer";
import AboutUsSection from "./components/AboutUsSection";
import SponsorshipSection from "./components/SponsorShipSection";
import Testimonials from "./components/Testimonials";
import PodcastSection from "./components/PodcastSection";
import ContactUsSection from "./components/ContactUsSection";

import Dashboard from "./components/DashboardSection";
import FullPodcastSection from "./components/FullPodcastSection";
import FullRodeoSection from "./components/RodeoEventSection";
import PasscodeSection from "./components/PasscodeSection";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <ShowSection />
            <div className="max-w-7xl mx-auto pt-20 px-6">
             
        
             
            </div>
          
              <AboutUsSection />
              <SponsorshipSection />
              <PodcastSection />
              {/* <ContactUsSection /> */}
              <Testimonials />
          </>
        } />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/show" element={<FullShowSection />} />
        <Route path="/podcast" element={<FullPodcastSection />} />
        <Route path="/about" element={<FullAboutUsSection />} />
        <Route path="/sponsor" element={<FullSponsorshipSection />} />
        <Route path="/rodeo" element={<FullRodeoSection/>}/>
        <Route path="/passcode" element={<PasscodeSection/>}/>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
