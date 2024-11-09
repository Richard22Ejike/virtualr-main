
import { FaSpotify, FaApple, FaGooglePlay } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const PodcastSection = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [newPodcast, setNewPodcast] = useState({
    title: '',
    description: '',
    date: '',
    thumbnail: '',
    platforms: {}
  });

  const loadPodcasts = async () => {
    try {
      const response = await fetch('http://localhost:5000/podcasts');
      const data = await response.json();
      setPodcasts(data);
    
    } catch (error) {
      console.error("Error loading podcasts:", error);
    }
  };

  const addPodcast = async () => {
    try {
      await fetch('http://localhost:5000/podcasts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPodcast)
      });
      loadPodcasts(); // Reload the podcasts
    } catch (error) {
      console.error("Error adding podcast:", error);
    }
  };

  const deletePodcast = async (title) => {
    try {
      await fetch(`http://localhost:5000/podcasts/${title}`, {
        method: 'DELETE'
      });
      loadPodcasts(); // Reload the podcasts
    } catch (error) {
      console.error("Error deleting podcast:", error);
    }
  };

  useEffect(() => {
    loadPodcasts();
  }, []);


  return (
    <section id="Podcasts" >
    <div className="flex flex-col items-center p-8 lg:p-16 bg-green-700">
      <h2 className="text-4xl font-bold text-white mb-6">Podcast Episodes</h2>
      <p className="text-center text-white max-w-2xl mb-12">
        Dive into our latest episodes on key topics from industry experts and thought leaders. Available on your favorite platforms.
      </p>

      {/* Podcast Episode Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl mb-12">
        {podcasts.map((podcast, index) => (
          <div key={index} className="bg-green-950 rounded-lg shadow-lg overflow-hidden">
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
        className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300"
      >
        View All Episodes
      </a>
    </div>
    </section>
  );
};

export default PodcastSection;