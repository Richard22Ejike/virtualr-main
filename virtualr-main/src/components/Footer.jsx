import { FaYoutube, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="mt-20 border-t py-10 border-neutral-700">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Show Page Section */}
        <div>
          <h3 className="text-md font-semibold mb-4">Show Page</h3>
          <ul className="space-y-2">
            <li>
              <a href="/show" className="text-neutral-300 hover:text-white">
                Our Show
              </a>
            </li>
            <li>
              <a href="/episodes" className="text-neutral-300 hover:text-white">
                Episodes
              </a>
            </li>
          </ul>
        </div>

        {/* Podcasts Section */}
        <div>
          <h3 className="text-md font-semibold mb-4">Podcasts</h3>
          <ul className="space-y-2">
            <li>
              <a href="/podcasts" className="text-neutral-300 hover:text-white">
                Latest Podcasts
              </a>
            </li>
            <li>
              <a href="/subscribe" className="text-neutral-300 hover:text-white">
                Subscribe
              </a>
            </li>
          </ul>
        </div>

        {/* Sponsorship Section */}
        <div>
          <h3 className="text-md font-semibold mb-4">Sponsorship</h3>
          <ul className="space-y-2">
            <li>
              <a href="/sponsorship" className="text-neutral-300 hover:text-white">
                Become a Sponsor
              </a>
            </li>
            <li>
              <a href="/partners" className="text-neutral-300 hover:text-white">
                Our Partners
              </a>
            </li>
          </ul>
        </div>

        {/* About Us & Contact Us Section */}
        <div>
          <h3 className="text-md font-semibold mb-4">About & Contact</h3>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="text-neutral-300 hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="text-neutral-300 hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <Link to="/dashboard" className="text-neutral-300 hover:text-white">Settings</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="flex justify-center space-x-6 mt-8">
        <a href="https://www.youtube.com" className="text-neutral-300 hover:text-red-500">
          <FaYoutube size={24} />
        </a>
        <a href="https://www.instagram.com" className="text-neutral-300 hover:text-pink-500">
          <FaInstagram size={24} />
        </a>
        <a href="https://www.facebook.com" className="text-neutral-300 hover:text-blue-500">
          <FaFacebook size={24} />
        </a>
        <a href="https://www.tiktok.com" className="text-neutral-300 hover:text-black">
          <FaTiktok size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
