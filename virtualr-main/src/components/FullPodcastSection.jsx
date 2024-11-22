
import { FaSpotify, FaApple, FaGooglePlay } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { BACKEND_URL } from '../constants';
import pics1 from "../assets/profile-pictures/podcast2.jpg"

const FullPodcastSection = () => {
  const [podcasts, setPodcasts] = useState([]);


  const loadPodcasts = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/podcasts`);
      const data = await response.json();
      setPodcasts(data);
    
    } catch (error) {
      console.error("Error loading podcasts:", error);
    }
  };


  useEffect(() => {
    loadPodcasts();
  }, []);


  return (
    <section id="Podcasts" >
    <div className="flex flex-col items-center  ">
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
     
    >
      Our Podcast
 
    </h1>

    <p
      className="mt-10 text-lg max-w-4xl"

    >
      Intuitive development tools. Get started today and turn your imagination
      into immersive reality!
    </p>

   
  </div>
</div>
      <h2 className="text-4xl font-bold text-white mb-6">Podcast Episodes</h2>
      <p className="text-center text-white max-w-2xl mb-12">
        Dive into our latest episodes on key topics from industry experts and thought leaders. Available on your favorite platforms.
      </p>

      {/* Podcast Episode Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl mb-12">
        {podcasts.map((podcast, index) => (
          <div key={index} className="bg-customBrown rounded-lg shadow-lg overflow-hidden">
            <img src={podcast.thumbnail} alt={podcast.title} className="w-full h-40 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white">{podcast.title}</h3>
              <p className="text-gray-100 text-sm mb-2">{podcast.date}</p>
              <p className="text-gray-200 mb-4">{podcast.description}</p>
              <div className="flex space-x-4">
                <a href={podcast.spotify} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                  <FaSpotify size={24} />
                </a>
                <a href={podcast.apple} target="_blank" rel="noopener noreferrer" className="text-gray-400">
                  <FaApple size={24} />
                </a>
                <a href={podcast.google} target="_blank" rel="noopener noreferrer" className="text-red-600">
                  <FaGooglePlay size={24} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Episodes Button */}
      <a
        href="/all-episodes"
        className="px-6 py-3 bg-customBrown text-white rounded-full hover:bg-gray-950 hover:bg-opacity-0 transition duration-300"
      >
        View All Episodes
      </a>
    </div>
    </section>
  );
};

export default FullPodcastSection;
