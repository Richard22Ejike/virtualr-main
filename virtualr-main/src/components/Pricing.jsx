import { CheckCircle2 } from "lucide-react";
import { pricingOptions } from "../constants";
import { colors } from "../constants";

const Pricing = () => {
  return (
    <div
      className="mt-20"
      style={{ backgroundColor: colors.backgroundLight }}
    >
      <h2
        className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide"
        style={{ color: colors.primaryOlive }}
      >
        Pricing
      </h2>
      <div className="flex flex-wrap justify-center">
        {pricingOptions.map((option, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2">
            <div
              className="p-10 rounded-xl"
              style={{
                border: `1px solid ${colors.primaryOlive}`,
                backgroundColor: colors.primaryBrown,
                color: colors.accentWarmBrown,
              }}
            >
              <p className="text-4xl mb-8">
                {option.title}
                {option.title === "Pro" && (
                  <span
                    className="text-xl mb-4 ml-2"
                    style={{
                      background: `linear-gradient(to right, ${colors.primaryOrange}, ${colors.primaryRed})`,
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    (Most Popular)
                  </span>
                )}
              </p>
              <p className="mb-8">
                <span className="text-5xl mt-6 mr-2">{option.price}</span>
                <span
                  className="tracking-tight"
                  style={{ color: colors.secondaryText }}
                >
                  /Month
                </span>
              </p>
              <ul>
                {option.features.map((feature, index) => (
                  <li key={index} className="mt-8 flex items-center">
                    <CheckCircle2 color={colors.primaryOlive} />
                    <span className="ml-2">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="inline-flex justify-center items-center text-center w-full h-12 p-5 mt-20 tracking-tight text-xl rounded-lg transition duration-200"
                style={{
                  border: `1px solid ${colors.primaryOrange}`,
                  color: colors.primaryOrange,
                  backgroundColor: colors.backgroundLight,
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = colors.primaryOrange)
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = colors.backgroundLight)
                }
              >
                Subscribe
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
