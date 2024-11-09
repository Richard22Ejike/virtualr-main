import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from 'react';
import { colors } from "../constants";
import Slider from "react-slick";
import { BACKEND_URL } from '../constants';
const ShowSection = () => {
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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    centerMode: true,
  };

  return (
    <section id="Show">
    <div className="flex flex-col items-center mt-6 lg:mt-20 w-full px-4 lg:px-0">
      <h2 className="text-2xl lg:text-3xl text-center my-6 lg:my-10">
        Featured Videos
      </h2>

      <Slider {...sliderSettings} className="w-full max-w-7xl bg-green-950">
        {shows.map((show, index) => (
          <div key={index} className="flex pr-10 pl-10 flex-col md:flex-row bg-green-950 md:max-w-5xl mx-auto h-auto md:h-[500px] w-full">
            <div className="flex flex-col md:flex-row md:max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden h-auto md:h-[500px] w-full">
            <div className="md:w-1/2">
  <iframe
    src={
      show.video.includes("youtube.com") || show.video.includes("youtu.be")
        ? `https://www.youtube.com/embed/${show.video.split("/").pop()}`
        : show.video
    }
    title="YouTube video"
    className="w-full h-60 md:h-full object-cover rounded-t-md md:rounded-none md:rounded-l-md"
    frameBorder="0"
    allow="autoplay; encrypted-media"
    allowFullScreen
  ></iframe>
</div>

              <div className="p-4 md:p-8 flex flex-col justify-center md:w-1/2">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{show.subtitle}</div>
                <a href={show.link} className="block mt-1 text-lg lg:text-xl leading-tight font-medium text-black hover:underline">
                  {show.title}
                </a>
                <p className="mt-2 text-slate-500">
                  {show.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    </section>
  );
};

export default ShowSection;
