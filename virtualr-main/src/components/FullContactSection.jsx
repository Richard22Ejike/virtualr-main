
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';

const FullContactUsSection = () => {
  return (
    <section id="Contact">
    <div className="flex flex-col items-center p-8 lg:p-16 bg-customGrey">
      {/* Section Header */}
      <h2 className="text-4xl font-bold text-gray-300 mb-4">Contact Us</h2>
      <p className="text-center text-gray-100 max-w-lg mb-10">
        Have questions or want to learn more? We’re here to help. Fill out the form below, and we’ll get back to you as soon as possible.
      </p>

      {/* Contact Form and Information */}
      <div className="flex flex-col lg:flex-row gap-12 w-full max-w-5xl">
        {/* Contact Form */}
        <form className="flex flex-col bg-zinc-700 p-8 rounded-lg shadow-lg w-full lg:w-2/3">
          <label className="text-gray-100 mb-2 font-semibold">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className="mb-4 p-3 border text-black border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />

          <label className="text-gray-100 mb-2 font-semibold">Email</label>
          <input
            type="email"
            placeholder="Your Email"
            className="mb-4 p-3 border text-black border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />

          <label className="text-gray-100 mb-2 font-semibold">Subject</label>
          <input
            type="text"
            placeholder="Subject"
            className="mb-4 p-3 border text-black border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />

          <label className="text-gray-100 mb-2 font-semibold">Message</label>
          <textarea
            placeholder="Write your message here"
            className="mb-4 p-3 text-black border border-gray-200 rounded focus:outline-none focus:ring focus:ring-green-200 h-32 resize-none"
          />

          <button
            type="submit"
            className="bg-zinc-900 text-white py-3 rounded-lg hover:bg-zinc-400 transition duration-300"
          >
            Send Message
          </button>
        </form>

        {/* Contact Information */}
        <div className="flex flex-col items-start space-y-6 w-full lg:w-1/3 text-gray-100">
          {/* Phone */}
          <div className="flex items-center space-x-4">
            <FaPhone className="text-orange-600" size={24} />
            <span>+123-456-7890</span>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-orange-600" size={24} />
            <span>contact@company.com</span>
          </div>

          {/* Address */}
          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="text-orange-600" size={24} />
            <span>123 Main Street, City, Country</span>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4 mt-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-orange-600">
              <FaLinkedin size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-orange-400">
              <FaTwitter size={24} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-orange-600">
              <FaFacebook size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default FullContactUsSection;
