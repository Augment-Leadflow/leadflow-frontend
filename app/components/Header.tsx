"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, LogIn, UserPlus } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      setTimeout(() => {
        window.history.pushState(null, "", href);
      }, 600);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Top Bar */}
      <div className={`hidden md:block transition-all duration-500 ${scrolled ? "bg-slate-900/95 backdrop-blur-md" : "bg-gradient-to-r from-indigo-600 to-purple-600"} text-white text-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9">
            <div className="flex items-center gap-6">
              <span className="text-xs opacity-90">✓ 50,000+ businesses worldwide</span>
            </div>
            <div className="text-xs opacity-80">
              <a href="tel:+15551234567" className="hover:underline">+1 (555) 123-4567</a> | 
              <a href="mailto:hello@leadflow.com" className="hover:underline ml-2">hello@leadflow.com</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-700/50" : "bg-white/80 shadow-sm"} backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Leadflow</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleSmoothNavigation(e, link.href)}
                  className="text-slate-600 hover:text-indigo-600 font-medium transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-indigo-600 font-medium transition-all duration-300 hover:bg-slate-50 rounded-lg"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-2 px-5 py-2 text-white font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm"
              >
                <UserPlus className="w-4 h-4" />
                Register Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200 animate-slide-in bg-white/95 backdrop-blur-sm">
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      handleSmoothNavigation(e, link.href);
                      closeMenu();
                    }}
                    className="px-4 py-3 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg"
                    onClick={closeMenu}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center justify-center gap-2 px-4 py-3 text-white font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg"
                    onClick={closeMenu}
                  >
                    Register Now
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
