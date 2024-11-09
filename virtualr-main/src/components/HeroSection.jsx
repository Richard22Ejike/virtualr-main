import video1 from "../assets/herosection.mp4";
import { colors } from "../constants";

const HeroSection = () => {


  if (Object.keys(colors).length === 0) {
    return <div>Loading colors...</div>;
  }

  return (
    
    
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src={video1} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1
          className="text-4xl sm:text-6xl lg:text-7xl tracking-wide"
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
            for users
          </span>
        </h1>

        <p
          className="mt-10 text-lg max-w-4xl"
          style={{ color: colors.backgroundLight }}
        >
          intuitive development tools. Get started today and turn your imagination
          into immersive reality!
        </p>

        <div className="flex justify-center my-10">
          <a
            href="#"
            className="py-3 px-4 mx-3 rounded-md"
            style={{
              backgroundImage: `linear-gradient(to right, ${colors.accentWarmBrown}, ${colors.primaryBrown})`,
              color: colors.backgroundLight,
            }}
          >
            Start for free
          </a>
          <a
            href="#"
            className="py-3 px-4 mx-3 rounded-md border"
            style={{
              borderColor: colors.primaryBrown,
              color: colors.primaryBrown,
            }}
          >
            Documentation
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
