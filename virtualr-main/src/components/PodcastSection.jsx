
import { FaSpotify, FaApple, FaGooglePlay } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { BACKEND_URL } from '../constants';
const PodcastSection = () => {
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
    <div className="flex flex-col items-center p-8 lg:p-16 ">
      <h2 className="text-4xl font-bold text-black mb-6"   style={{
          fontFamily: "omnes-pro",
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: "42px",
        }}>Podcast Episodes</h2>
      <p className="text-center text-black max-w-2xl mb-12"   style={{
            fontFamily: "freight-sans-pro",
            fontStyle: "normal",
          }}>
        Dive into our latest episodes on key topics from industry experts and thought leaders. Available on your favorite platforms.
      </p>

      {/* Podcast Episode Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl mb-12">
        {podcasts.map((podcast, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden text-black">
            <img src={podcast.thumbnail} alt={podcast.title} className="w-full h-40 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-black">{podcast.title}</h3>
              <p className="text-gray-800 text-sm mb-2 ">{podcast.date}</p>
              <p className="text-gray-900 mb-4">{podcast.description}</p>
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
        className="px-6 py-3 bg-gray-300 text-black rounded-full hover:bg- hover:bg-opacity-0 transition duration-300"
      >
        View All Episodes
      </a>
    </div>
    </section>
  );
};

export default PodcastSection;
