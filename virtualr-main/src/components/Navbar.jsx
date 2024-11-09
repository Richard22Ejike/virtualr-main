import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../assets/logocrossln.png";
import { navItems, colors } from "../constants";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 py-3 border-b transition-colors duration-300 w-full ${
        isScrolled ? "backdrop-blur-lg bg-white/20" : "bg-transparent"
      }`}
      style={{ borderColor: `${colors.primaryOlive}80` }}
    >
      <div className="container px-4 mx-auto relative lg:text-sm justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 flex-shrink-0">
            <img className="h-10 w-10" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight">Empty Cross</span>
          </div>

          <ul className="hidden lg:flex ml-auto space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="text-sm font-medium transition-colors duration-200"
                  onClick={() => setMobileDrawerOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 w-full p-12 flex flex-col justify-center items-center lg:hidden backdrop-blur-lg bg-white/20">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a
                    href={item.href}
                    onClick={toggleNavbar} // Close drawer on selection
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
