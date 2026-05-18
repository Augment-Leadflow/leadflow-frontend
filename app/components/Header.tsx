"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, LogIn, UserPlus } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "About Us", href: "#about" },
  
  { label: "Contact", href: "#contact" },
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
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 shadow-2xl border-b border-white/10" 
          : "bg-white shadow-sm"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* ── Left Side: Brand Logo ── */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:rotate-12 transition-transform duration-300">
                <svg className="w-5 h-5 text-slate-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <span className={`text-2xl font-black tracking-tight transition-colors duration-300 ${
                scrolled ? "text-white" : "bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 bg-clip-text text-transparent"
              }`}>
                Leadflow
              </span>
            </Link>

            {/* ── Right Side: Navigation Links & Auth Actions ── */}
            <div className="hidden md:flex items-center gap-8 ml-auto">
              {/* Main Content Links */}
              <div className="flex items-center gap-7">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleSmoothNavigation(e, link.href)}
                    className={`font-semibold text-sm transition-colors duration-200 ${
                      scrolled ? "text-indigo-100 hover:text-white" : "text-slate-600 hover:text-indigo-600"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Desktop Authentication Controls */}
              <div className="flex items-center gap-3 border-l pl-6 border-slate-200/60">
                <Link
                  href="/login"
                  className={`flex items-center gap-1.5 px-4 py-2 font-bold rounded-xl border-2 transition-all duration-200 text-xs hover:-translate-y-0.5 ${
                    scrolled
                      ? "border-white/10 text-white hover:bg-white/10 hover:border-white/30"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-1.5 px-4 py-2 text-white font-bold bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-xs"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Sign Up
                </Link>
              </div>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-xl transition-colors ${
                scrolled ? "text-white hover:bg-white/10" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* ── Mobile Navigation Drawer ── */}
          {isMenuOpen && (
            <div className={`md:hidden py-4 border-t animate-fade-in ${
              scrolled ? "border-white/10 bg-slate-900/95" : "border-slate-100 bg-white"
            }`}>
              <div className="flex flex-col gap-1.5 px-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      handleSmoothNavigation(e, link.href);
                      closeMenu();
                    }}
                    className={`px-4 py-3 rounded-xl transition-colors font-semibold text-sm ${
                      scrolled 
                        ? "text-slate-300 hover:text-white hover:bg-white/5" 
                        : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
                
                <div className={`pt-4 mt-2 border-t flex flex-col gap-2.5 ${
                  scrolled ? "border-white/10" : "border-slate-100"
                }`}>
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-bold text-sm ${
                      scrolled ? "border-white/20 text-white hover:bg-white/5" : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Log In</span>
                  </Link>
                  <Link
                    href="/register"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 px-4 py-3 text-white font-bold bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg text-sm"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
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