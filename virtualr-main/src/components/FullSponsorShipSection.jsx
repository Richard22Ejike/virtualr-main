
import  { useState, useEffect } from 'react';
import { BACKEND_URL } from '../constants';
import { colors } from "../constants";
import background_pic from "../assets/profile-pictures/podcast1.jpg";

 // Import background image

const FullSponsorshipSection = () => {
  const [sponsors, setSponsors] = useState([]);


  // Fetch all testimonials from the server
  const fetchSponsors = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/sponsors`);
      const data = await response.json();
      setSponsors(data);
    } catch (error) {
      console.error("Error fetching spons0rs:", error);
    }
  };


  // Delete a testimonial by user name


  useEffect(() => {
    fetchSponsors();
  }, []);

  return (
    <section id='Sponsors'
    className="flex flex-col items-center   ">
 
        <div className="relative h-screen w-screen overflow-hidden ">
  {/* Poster Image Background */}


  {/* Content Overlay */}
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 ">
  <img
    src="https://img1.wsimg.com/isteam/videos/uA41GmyyG8IMaxXdb"
    alt="Background Poster"
    className="absolute top-0 left-0 w-full h-full object-cover -z-10"
  />
    <h1
      className="text-4xl sm:text-6xl lg:text-7xl tracking-wide"
      style={{
        color: colors.backgroundLight,
      }}
    >
      Our Partners
 
    </h1>

    <p
      className="mt-10 text-lg max-w-4xl"
      style={{ color: colors.backgroundLight }}
    >
      Intuitive development tools. Get started today and turn your imagination
      into immersive reality!
    </p>

   
  </div>
</div>
<div   
 className="bg-cover bg-center bg-no-repeat h-screen w-screen content-center justify-items-center "
      style={{
        backgroundImage: `url(${background_pic})`,
      }}>
     <div className="bg-cover bg-center bg-no-repeat h-screen w-screen content-center justify-items-center bg-black bg-opacity-50 "     >

     
      <p className="text-center text-white max-w-2xl mb-12">
        We are grateful for the support of our sponsors who make our mission possible. Thank you for partnering with us on this journey.
      </p>

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
            <h3 className="text-lg font-semibold text-white">{sponsor.name}</h3>
            <p className="text-sm text-white">{sponsor.description}</p>
          </a>
        ))}
      </div>

      {/* Call to action section */}
      <div className="flex flex-col items-center bg-zinc-700 text-white rounded-lg p-8 max-w-xl text-center transition duration-300 hover:bg-zinc-500 shadow-lg">
        <h3 className="text-2xl font-bold mb-4 ">Interested in Sponsoring Us?</h3>
        <p className="mb-6">
          Join our family of sponsors and help drive our mission forward. Reach out to us to learn about sponsorship opportunities.
        </p>
        <a
          href="/sponsorship-opportunities"
          className="px-6 py-3 bg-white text-green-950 font-semibold rounded-full hover:bg-gray-100 transition duration-300"
        >
          Become a Sponsor
        </a>
      </div>
      </div>
      </div>
  
    </section>
  );
};

export default FullSponsorshipSection;
