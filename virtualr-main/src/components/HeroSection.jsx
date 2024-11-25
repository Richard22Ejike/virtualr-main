import homePic from "../assets/profile-pictures/home.jpg";
import { colors } from "../constants";

const HeroSection = () => {
  if (Object.keys(colors).length === 0) {
    return <div>Loading colors...</div>;
  }

  return (
    <div
      className="relative h-screen w-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${homePic})`,
      }}
    >
      {/* Content Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-6">
        <h1
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-wide"
          style={{
            color: colors.backgroundLight,
          }}
        >
          Empty Cross Promotions
          <span
            className="bg-gradient-to-r text-transparent bg-clip-text"
            style={{
              backgroundImage: `linear-gradient(to right, ${colors.accentWarmBrown}, ${colors.primaryBrown})`,
            }}
          >
            {" "}
            Saddle Up
          </span>
        </h1>

        <p
          className="mt-10 text-lg max-w-4xl"
          style={{ color: colors.backgroundLight }}
        >
          Embrace the spirit of adventure and explore a world where grit meets
          grandeur. 
        </p>

       
      </div>
    </div>
  );
};

export default HeroSection;
