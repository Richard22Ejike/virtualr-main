import { FaSpotify, FaApple, FaGooglePlay } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Slider from "react-slick";
import { BACKEND_URL } from '../constants';
import podcast1 from "../assets/profile-pictures/podcast1.jpg";
import podcast2 from "../assets/profile-pictures/podcast2.jpg";
import podcast3 from "../assets/profile-pictures/podcast3.jpg";
import podcast4 from "../assets/profile-pictures/podcast4.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <section id="Podcasts">
      <div className="flex flex-col items-center">
        <div className="relative h-screen w-screen overflow-hidden mb-10 bg-black bg-opacity-70">
          {/* Slider Component */}
          <Slider {...sliderSettings} className="absolute top-0 left-0 w-full h-full -z-10">
            {[podcast1, podcast2, podcast3, podcast4].map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Podcast ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Slider>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl tracking-wide rodeo-title">
              Our Podcast
            </h1>

            <p className="mt-10 text-lg max-w-4xl rodeo-description">
              Intuitive development tools. Get started today and turn your imagination
              into immersive reality!
            </p>
          </div>
        </div>
        {podcasts.length === 0 ? (
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
        Podcast In Production.
      </div>
      <div
      style={{
        fontFamily:"freight-sans-pro",
        fontWeight: 400,
        fontSize: "18px",
        lineHeight: "1.6em",
      }}
      >
      Saddle up for our upcoming Rodeo Podcast! We are diving into
       the heart of the rodeo world, bringing you exciting stories, expert 
       insights, and behind-the-scenes moments that celebrate the spirit of the rodeo.
        Stay tuned for our launch!
        </div>
      </div>
     
    ) : (
      <>

        <h2
          className="text-4xl font-bold text-black mb-6"
          style={{
            fontFamily: "omnes-pro",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "42px",
          }}
        >
          Podcast Episodes
        </h2>
        <p
          className="text-center text-black max-w-2xl mb-12"
          style={{
            fontFamily: "freight-sans-pro",
            fontStyle: "normal",
          }}
        >
          Dive into our latest episodes on key topics from industry experts and thought leaders. Available on your favorite platforms.
        </p>

        {/* Podcast Episode Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl mb-12">
          {podcasts.map((podcast, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden text-black"
            >
              <img
                src={podcast.thumbnail}
                alt={podcast.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-black">{podcast.title}</h3>
                <p className="text-gray-800 text-sm mb-2">{podcast.date}</p>
                <p className="text-gray-900 mb-4">{podcast.description}</p>
                <div className="flex space-x-4">
                  <a
                    href={podcast.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    <FaSpotify size={24} />
                  </a>
                  <a
                    href={podcast.apple}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400"
                  >
                    <FaApple size={24} />
                  </a>
                  <a
                    href={podcast.google}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600"
                  >
                    <FaGooglePlay size={24} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        </>)}
      </div>
      
    </section>
  );
};

export default FullPodcastSection;
