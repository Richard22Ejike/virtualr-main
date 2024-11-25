import  { useState, useEffect } from 'react';
import { BACKEND_URL } from '../constants';
const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  // Fetch all testimonials from the server
  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/testimonials`);
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  // Add a new testimonial to the server
  

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <section id="Testimonial">
    <div className=" tracking-wide py-8 text-black">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20">
        What People are saying
      </h2>
      {testimonials.length === 0 ? (
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
      More testimonial to come
        </div>
      </div>
     
    ) : (
      <>
      <div className="flex flex-wrap justify-center">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2">
            <div className="rounded-md p-6 text-md font-thin bg-white rounded-lg shadow-lg overflow-hidden">
              <p className="mb-6">{testimonial.text}</p>
              <div className="flex items-start mt-8">
                <img
                  className="w-12 h-12 mr-6 rounded-full"
                  src={testimonial.image}
                  alt={testimonial.user}
                  style={{
                    border: `2px solid`,
                  }}
                />
                <div>
                  <h6 className="font-medium">{testimonial.user}</h6>
                  <span className="text-sm font-normal italic">{testimonial.company}</span>
                </div>
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

export default Testimonials;
