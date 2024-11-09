
import  { useState, useEffect } from 'react';


const SponsorshipSection = () => {
  const [sponsors, setSponsors] = useState([]);
  const [newSponsor, setNewSponsor] = useState({
    name: '',
    link: '',
    description: '',
    logo: ''
  });

  // Fetch all testimonials from the server
  const fetchSponsors = async () => {
    try {
      const response = await fetch('http://localhost:5000/sponsors');
      const data = await response.json();
      setSponsors(data);
    } catch (error) {
      console.error("Error fetching spons0rs:", error);
    }
  };

  // Add a new testimonial to the server
  const addSpons0r = async () => {
    try {
      await fetch('http://localhost:5000/spons0rs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSponsor)
      });
      fetchSponsors(); // Refresh testimonials after adding
      setNewSponsor({ name: '', link: '', description: '', logo: '' }); // Clear form
    } catch (error) {
      console.error("Error adding sponsor:", error);
    }
  };

  // Delete a testimonial by user name
  const deleteSponsor = async (user) => {
    try {
      await fetch(`http://localhost:5000/sponsors/${user}`, {
        method: 'DELETE'
      });
          fetchSponsors(); // Refresh testimonials after deletion
    } catch (error) {
      
      console.error("Error deleting sponsor:", error);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  return (
    <section id='Sponsors'>
    <div className="flex flex-col items-center p-8 lg:p-16 bg-green-700 mb-8">
      <h2 className="text-4xl font-bold text-white mb-6">Our Sponsors</h2>
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
      <div className="flex flex-col items-center bg-green-950 text-white rounded-lg p-8 max-w-xl text-center transition duration-300 hover:bg-green-700 shadow-lg">
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
    </section>
  );
};

export default SponsorshipSection;
