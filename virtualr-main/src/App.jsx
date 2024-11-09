import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ShowSection from "./components/ShowSection";
import Footer from "./components/Footer";
import AboutUsSection from "./components/AboutUsSection";
import SponsorshipSection from "./components/SponsorShipSection";
import Testimonials from "./components/Testimonials";
import PodcastSection from "./components/PodcastSection";
import ContactUsSection from "./components/ContactUsSection";
import Dashboard from "./components/DashboardSection";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <div className="max-w-7xl mx-auto pt-20 px-6">
              <ShowSection />
              <AboutUsSection />
              <SponsorshipSection />
              <PodcastSection />
              <ContactUsSection />
              <Testimonials />
             
            </div>
          </>
        } />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
