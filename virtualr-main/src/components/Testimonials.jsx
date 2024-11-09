import  { useState, useEffect } from 'react';


const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({
    user: '',
    text: '',
    company: '',
    image: ''
  });

  // Fetch all testimonials from the server
  const fetchTestimonials = async () => {
    try {
      const response = await fetch('http://localhost:5000/testimonials');
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  // Add a new testimonial to the server
  const addTestimonial = async () => {
    try {
      await fetch('http://localhost:5000/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTestimonial)
      });
      fetchTestimonials(); // Refresh testimonials after adding
      setNewTestimonial({ user: '', text: '', company: '', image: '' }); // Clear form
    } catch (error) {
      console.error("Error adding testimonial:", error);
    }
  };

  // Delete a testimonial by user name
  const deleteTestimonial = async (user) => {
    try {
      await fetch(`http://localhost:5000/testimonials/${user}`, {
        method: 'DELETE'
      });
          fetchTestimonials(); // Refresh testimonials after deletion
    } catch (error) {
      
      console.error("Error deleting testimonial:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <section id="Testimonial">
    <div className="mt-20 tracking-wide bg-green-700 py-8">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20">
        What People are saying
      </h2>
      <div className="flex flex-wrap justify-center">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2">
            <div className="rounded-md p-6 text-md font-thin bg-green-950">
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
            <button onClick={() => deleteTestimonial(testimonial.user)} className="mt-2 text-red-500">
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Form to add a new testimonial */}
      <div className="mt-8 text-center">
        <h3 className="text-2xl font-medium text-white mb-4">Add a Testimonial</h3>
        <div className="mb-4">
          <input
            type="text"
            placeholder="User"
            value={newTestimonial.user}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, user: e.target.value })}
            className="px-4 py-2 rounded-md text-black"
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Testimonial text"
            value={newTestimonial.text}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, text: e.target.value })}
            className="px-4 py-2 rounded-md text-black w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Company"
            value={newTestimonial.company}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
            className="px-4 py-2 rounded-md text-black"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Image URL"
            value={newTestimonial.image}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, image: e.target.value })}
            className="px-4 py-2 rounded-md text-black"
          />
        </div>
        <button onClick={addTestimonial} className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300">
          Add Testimonial
        </button>
      </div>
    </div>
    </section>
  );
};

export default Testimonials;
