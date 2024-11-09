import { CheckCircle2 } from "lucide-react";
import codeImg from "../assets/code.jpg";
import { checklistItems } from "../constants";
import { useColors } from "../constants";

const Workflow = () => {
  const colors = useColors();
  return (
    <div className="mt-20" style={{ backgroundColor: colors.backgroundLight }}>
      <h2
        className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide"
        style={{ color: colors.primaryOlive }}
      >
        Accelerate your{" "}
        <span
          className="text-transparent bg-clip-text"
          style={{
            backgroundImage: `linear-gradient(to right, ${colors.accentWarmBrown}, ${colors.primaryBrown})`,
          }}
        >
          coding workflow.
        </span>
      </h2>
      <div className="flex flex-wrap justify-center mt-10 lg:mt-20">
        <div className="p-2 w-full lg:w-1/2">
          <img src={codeImg} alt="Coding" className="rounded-lg shadow-lg" />
        </div>
        <div className="pt-12 w-full lg:w-1/2">
          {checklistItems.map((item, index) => (
            <div key={index} className="flex mb-12">
              <div
                className="flex items-center justify-center mx-6 h-10 w-10 p-2 rounded-full"
                style={{
                  backgroundColor: colors.primaryBrown,
                  color: colors.accentWarmBrown,
                }}
              >
                <CheckCircle2 />
              </div>
              <div>
                <h5
                  className="mt-1 mb-2 text-xl"
                  style={{ color: colors.primaryOlive }}
                >
                  {item.title}
                </h5>
                <p
                  className="text-md"
                  style={{ color: colors.primaryOlive }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workflow;
