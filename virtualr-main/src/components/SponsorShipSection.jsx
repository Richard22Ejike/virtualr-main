import { useState, useEffect } from "react";
import { BACKEND_URL } from "../constants";
import background_pic from "../assets/profile-pictures/podcast1.jpg"; // Import background image

const SponsorshipSection = () => {
  const [sponsors, setSponsors] = useState([]);

  // Fetch all sponsors from the server
  const fetchSponsors = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/sponsors`);
      const data = await response.json();
      setSponsors(data);
    } catch (error) {
      console.error("Error fetching sponsors:", error);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  return (
    <section
      id="Sponsors"
      className="bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${background_pic})`,
      }}
    >
      {/* Overlay for readability */}
      <div className="bg-black bg-opacity-50 w-full h-full">
        <div className="flex flex-col items-center p-8 lg:p-16">
          <h2 className="text-4xl font-bold text-white mb-6">Our Partners</h2>
          <p className="text-center text-white max-w-2xl mb-12">
            We are grateful for the support of our partners who make our mission
            possible. Thank you for partnering with us on this journey.
          </p>
          {sponsors.length === 0 ? (
      // Centered placeholder text when no events exist
      <div className="flex flex-col items-center justify-center h-[200px] text-center text-xl font-semibold">
 <div 
      style={{
        fontFamily:"omnes-pro",
        fontWeight: 400,
        fontSize: "42px",
        lineHeight: "1.2em",
    
      }}
      className=" text-xl font-semibold mb-20">
        More information to come.
      </div>
    
   
      </div>
     
    ) : (
      <>
          {/* Sponsor logos and descriptions grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full max-w-5xl mb-12">
            {sponsors.map((sponsor, index) => (
              <a
                href={sponsor.link}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                className="flex flex-col items-center text-center transform transition duration-300 hover:scale-105"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="w-full h-28 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold text-white">
                  {sponsor.name}
                </h3>
                <p className="text-sm text-white">{sponsor.description}</p>
              </a>
            ))}
          </div>

          {/* Call to action section */}
          <div className="flex flex-col items-center bg-zinc-700 text-white rounded-lg p-8 max-w-xl text-center transition duration-300 hover:bg-zinc-500 shadow-lg">
            <h3 className="text-2xl font-bold mb-4">
              Interested in Sponsoring Us?
            </h3>
            <p className="mb-6">
              Join our family of sponsors and help drive our mission forward.
              Reach out to us to learn about sponsorship opportunities.
            </p>
           
          </div>
          </> )}
        </div>
      
      </div>
    </section>
  );
};

export default SponsorshipSection;
