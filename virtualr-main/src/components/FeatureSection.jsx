import { features } from "../constants";
import { colors } from "../constants";

const FeatureSection = () => {
  return (
    <div
      className="relative mt-20 min-h-[800px]"
      style={{
        borderBottom: `1px solid ${colors.primaryBrown}`,
        backgroundColor: colors.backgroundLight,
      }}
    >
      <div className="text-center">
        <span
          className="rounded-full h-6 text-sm font-medium px-2 py-1 uppercase"
          style={{
            backgroundColor: colors.primaryOlive,
            color: colors.accentWarmBrown,
          }}
        >
          Feature
        </span>
        <h2
          className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide"
          style={{ color: colors.primaryOlive }}
        >
          Easily build{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: `linear-gradient(to right, ${colors.accentWarmBrown}, ${colors.primaryBrown})`,
            }}
          >
            your code
          </span>
        </h2>
      </div>
      <div className="flex flex-wrap mt-10 lg:mt-20">
        {features.map((feature, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
            <div className="flex">
              <div
                className="flex mx-6 h-10 w-10 p-2 justify-center items-center rounded-full"
                style={{
                  backgroundColor: colors.primaryBrown,
                  color: colors.accentWarmBrown,
                }}
              >
                {feature.icon}
              </div>
              <div>
                <h5
                  className="mt-1 mb-6 text-xl"
                  style={{ color: colors.primaryOlive }}
                >
                  {feature.text}
                </h5>
                <p
                  className="text-md p-2 mb-20"
                  style={{ color: colors.primaryOlive }}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
