import React, { useState, useEffect } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/70 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
      <Container>
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <button onClick={() => navigate('/')} className="mr-4">
              <Logo width="70px" />
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => 
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => navigate(item.slug)}
                  className={`px-4 py-2 rounded-full transition-colors duration-300 ${isScrolled ? 'text-gray-800 hover:bg-gray-200' : 'text-white hover:bg-white/20'}`}
                >
                  {item.name}
                </button>
              ) : null
            )}
            {authStatus && (
              <LogoutBtn />
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`focus:outline-none ${isScrolled ? 'text-gray-800' : 'text-white'}`}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </Container>
      {isMenuOpen && (
        <div className="md:hidden bg-white/80 backdrop-blur-lg shadow-lg overflow-hidden">
          {navItems.map((item) => 
            item.active ? (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.slug);
                  setIsMenuOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200 transition-colors duration-300"
              >
                {item.name}
              </button>
            ) : null
          )}
          {authStatus && (
            <div className="px-4 py-2">
              <LogoutBtn />
            </div>
          )}
        </div>
      )}
    </header>
  );
}