import { useState, useEffect } from "react";
import Slider from "react-slick";
import { colors } from "../constants";
import { BACKEND_URL } from "../constants";
import show from "../assets/profile-pictures/show.jpg";
import show1 from "../assets/profile-pictures/show1.jpg";
import show2 from "../assets/profile-pictures/show2.jpg";
import show3 from "../assets/profile-pictures/show3.jpg";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const FullShowSection = () => {
  const [shows, setShows] = useState([]);

  // Fetch all shows from the server
  const fetchShows = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/shows`);
      const data = await response.json();
      setShows(data);
    } catch (error) {
      console.error("Error fetching shows:", error);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  if (Object.keys(colors).length === 0) {
    return <div>Loading colors...</div>;
  }

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  const lastShow = shows[shows.length - 1];
  const otherShows = shows.slice(0, shows.length - 1);

  const sliderImages = [show, show1, show2, show3];

  return (
    <section
      id="Show"
      className="flex flex-col items-center justify-center w-full min-h-screen text-white"
    >
      {/* Slider Background */}
      <div className="relative h-screen w-screen overflow-hidden mb-10">
        <Slider {...sliderSettings} className="absolute top-0 left-0 w-full h-full">
          {sliderImages.map((image, index) => (
            <div key={index} className="w-full h-full">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Slider>

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-6">
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl tracking-wide"
            style={{
              color: colors.backgroundLight,
            }}
          >
            Rodeo Thrills: Featured Videos
          </h1>

          <p
            className="mt-10 text-lg max-w-4xl"
            style={{ color: colors.backgroundLight }}
          >
          Step into the world of thundering hooves, daring cowboys, and heart-pounding excitement.
          </p>
        </div>
      </div>
      {shows.length === 0 ? (
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
      Get ready to experience the thrill of the rodeo like never before! Our upcoming rodeo show will feature electrifying performances, daring competitions, and the untamed spirit of the Wild West. Stay tuned as we gear up to bring you an unforgettable show!
        </div>
      </div>
     
    ) : (
      <>
      {/* Main Content */}
      <div className="w-full max-w-7xl px-4 lg:px-0">
        {/* Display the last show at the top */}
        {lastShow && (
          <div className="flex flex-col bg-white text-black rounded-xl shadow-lg overflow-hidden mb-8 lg:mb-16 h-[700px]">
            {/* Video Section */}
            <div>
              <iframe
                src={
                  lastShow.video.includes("youtube.com") ||
                  lastShow.video.includes("youtu.be")
                    ? `https://www.youtube.com/embed/${lastShow.video
                        .split("/")
                        .pop()}`
                    : lastShow.video
                }
                title="YouTube video"
                className="w-full h-[500px] object-cover"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>

            {/* Text Content Section */}
            <div className="p-6 flex flex-col">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {lastShow.subtitle}
              </div>
              <a
                href={lastShow.link}
                className="block mt-2 text-2xl font-bold leading-tight hover:underline"
              >
                {lastShow.title}
              </a>
              <p className="mt-4 text-lg text-gray-600">{lastShow.text}</p>
            </div>
          </div>
        )}

        {/* Show Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherShows
            .slice()
            .reverse()
            .map((show, index) => (
              <div
                key={index}
                className="flex flex-col bg-white text-black rounded-xl shadow-lg overflow-hidden"
              >
                {/* Video Section */}
                <div>
                  <iframe
                    src={
                      show.video.includes("youtube.com") ||
                      show.video.includes("youtu.be")
                        ? `https://www.youtube.com/embed/${show.video
                            .split("/")
                            .pop()}`
                        : show.video
                    }
                    title="YouTube video"
                    className="w-full h-60 object-cover"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Text Content Section */}
                <div className="p-6 flex flex-col">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    {show.subtitle}
                  </div>
                  <a
                    href={show.link}
                    className="block mt-2 text-2xl font-bold leading-tight hover:underline"
                  >
                    {show.title}
                  </a>
                  <p className="mt-4 text-lg text-gray-600">{show.text}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      </>)}
    </section>
  );
};

export default FullShowSection;
