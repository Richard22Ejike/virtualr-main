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
    <div className=" tracking-wide py-8">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20">
        What People are saying
      </h2>
      <div className="flex flex-wrap justify-center">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2">
            <div className="rounded-md p-6 text-md font-thin bg-customlightBrown">
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

      
    </div>
    </section>
  );
};

export default Testimonials;
