import { useState, useEffect } from 'react';
import { BACKEND_URL } from '../constants';
const AboutUsSection = () => {
  const [abouts, setAbouts] = useState([]);
  
  // Fetch about data from the server
  const fetchAbouts = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/about`);
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
    <div className="flex flex-col items-center w-full p-8 lg:p-16">
      <h1 className="text-4xl font-bold text-center mb-10 text-white">About Us</h1>

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
          <div className="lg:w-1/2 lg:pl-10 text-white">
            <h2 className="text-2xl font-semibold mb-4">{about.title}</h2>
            <p>{about.text}</p>
          </div>
        </div>
      ))}
    </div>
    </section>
  );
};

export default AboutUsSection;
