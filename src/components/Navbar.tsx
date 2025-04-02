
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Fake authentication state (to be replaced with real auth)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: "Home", path: "/", auth: false },
    { name: "Lobby", path: "/lobby", auth: true },
    { name: "Leaderboard", path: "/leaderboard", auth: true },
  ];

  // For demo purposes
  const fakeLogin = () => setIsAuthenticated(true);
  const fakeLogout = () => setIsAuthenticated(false);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-200/50 py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800 flex items-center group">
          <span className="mr-2 text-blue-600">Q</span>
          <span className="group-hover:translate-x-0.5 transition-transform">TriviaCraft</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems
            .filter(item => !item.auth || (item.auth && isAuthenticated))
            .map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  location.pathname === item.path
                    ? "text-blue-600"
                    : "text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            ))}

          <div className="pl-4 border-l border-gray-200">
            {isAuthenticated ? (
              <Button variant="outline" size="sm" onClick={fakeLogout} className="shadow-sm">
                Sign Out
              </Button>
            ) : (
              <div className="flex space-x-3">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="shadow-sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="shadow-sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-800"
          >
            {isMenuOpen ? (
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm animate-fade-in shadow-lg">
          <div className="px-4 py-5 space-y-5 border-t">
            {navItems
              .filter(item => !item.auth || (item.auth && isAuthenticated))
              .map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

            <div className="pt-4 border-t border-gray-100">
              {isAuthenticated ? (
                <Button className="w-full" variant="outline" size="sm" onClick={fakeLogout}>
                  Sign Out
                </Button>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link to="/login" className="w-full">
                    <Button variant="outline" size="sm" className="w-full shadow-sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register" className="w-full">
                    <Button size="sm" className="w-full shadow-sm">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
