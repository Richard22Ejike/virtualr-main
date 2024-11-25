import { useState, useEffect } from 'react';
import { BACKEND_URL } from '../constants';
import { colors } from "../constants";
import pics1 from "../assets/profile-pictures/podcast3.jpg"
const FullAboutUsSection = () => {
  const [abouts, setAbouts] = useState([]);
  
  // Fetch about data from the server
  const fetchAbouts = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/abouts`);
      const data = await response.json();
      setAbouts(data);
    } catch (error) {
      console.error("Error fetching abouts:", error);
    }
  };

  useEffect(() => {
    fetchAbouts();
  }, []);

  return (
    <section id="About">
    <div className="flex flex-col items-center w-full  ">
    <div className="relative h-screen w-screen overflow-hidden mb-10">
  {/* Poster Image Background */}
  <img
    src={pics1}
    alt="Background Poster"
    className="absolute top-0 left-0 w-full h-full object-cover -z-10"
  />

  {/* Content Overlay */}
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 ">
    <h1
      className="text-4xl sm:text-6xl lg:text-7xl tracking-wide"
      style={{
        color: colors.backgroundLight,
      }}
    >
       About Us
 
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
{abouts.length === 0 ? (
      // Centered placeholder text when no events exist
      <div className="flex flex-col items-center justify-center h-[300px] text-center text-xl font-semibold text-black">
 <div 
      style={{
        fontFamily:"omnes-pro",
        fontWeight: 400,
        fontSize: "42px",
        lineHeight: "1.2em",
    
      }}
      className=" text-xl font-semibold text-black mb-20">
        More information to come.
      </div>
      <div
      style={{
        fontFamily:"freight-sans-pro",
        fontWeight: 400,
        fontSize: "18px",
        lineHeight: "1.6em",
      }}
      >
      More about us coming soon 
        </div>
      </div>
     
    ) : (
      <>
<h1 className="text-4xl font-bold text-center mb-10 text-black" style={{
              fontFamily: "omnes-pro",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "42px",
            }}>About Us</h1>

      {abouts.map((about, index) => (
        <div
          key={index}
          className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center lg:items-start w-full mb-16`}
        >
          {/* Image */}
          <div className={`lg:w-1/2 flex justify-center ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'} mb-6 lg:mb-0`}>
            <img
              src={about.image}
              alt={about.title}
              className="w-3/4 rounded-lg shadow-lg"
            />
          </div>
          
          {/* Text */}
          <div className="lg:w-1/2 lg:pl-10  text-black"
            >
            <h2 className="text-2xl font-semibold mb-4" style={{
              fontFamily: "omnes-pro",
              fontStyle: "normal",
            }}>{about.title}</h2>
            <p style={{
               fontFamily: 'freight-sans-pro',
               fontWeight: 400,
               fontStyle: 'normal',
            }
                 }>{about.text}</p>
          </div>
        </div>
      ))},</>)}
    </div>
    </section>
  );
};

export default FullAboutUsSection;
