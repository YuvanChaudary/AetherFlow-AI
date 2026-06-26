"use client";

import React, { useState, useEffect } from "react";
import { useScroll } from "@/hooks/useScroll";
import { Icon } from "@/components/core/Icon";

export function Header() {
  const isScrolled = useScroll(20);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Technology", href: "#technology" },
    { label: "Pricing", href: "#pricing" },
    { label: "Docs", href: "#docs" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 ${
        isScrolled
          ? "bg-oceanic-noir/80 border-b border-mystic-mint/10 backdrop-blur-md py-4"
          : "bg-transparent border-b border-transparent py-6"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-6 flex items-center justify-between"
        aria-label="Global Directory"
      >
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group focus-visible:outline-2 focus-visible:outline-forsythia rounded-md"
          aria-label="AetherFlow AI Homepage"
        >
          <Icon
            name="cube-16-solid"
            size={20}
            className="text-forsythia transition-transform duration-300 group-hover:rotate-45"
          />
          <span className="font-technical text-md font-bold tracking-wider text-forsythia">
            AETHERFLOW<span className="text-deep-saffron">.AI</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div
          className="hidden md:flex items-center gap-8"
          role="menubar"
          aria-label="Primary Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-mystic-mint hover:text-arctic-powder transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-forsythia rounded-sm px-1.5 py-0.5"
              role="menuitem"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Action CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#docs"
            className="text-sm font-medium text-mystic-mint hover:text-arctic-powder transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-forsythia rounded-sm px-1.5 py-0.5"
          >
            Sign In
          </a>
          <a
            href="#pricing"
            className="btn-primary py-2 px-5 text-sm"
          >
            Deploy Engine
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 rounded-md hover:bg-nocturnal-expedition/50 text-arctic-powder transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-forsythia"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation-drawer"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <div className="relative w-5 h-4">
            <span
              className={`absolute block w-5 h-0.5 bg-current rounded transition-all duration-300 ${
                isMobileMenuOpen ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute block w-5 h-0.5 bg-current rounded transition-all duration-300 top-1.5 ${
                isMobileMenuOpen ? "opacity-0 translate-x-3" : "opacity-1"
              }`}
            />
            <span
              className={`absolute block w-5 h-0.5 bg-current rounded transition-all duration-300 ${
                isMobileMenuOpen ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        id="mobile-navigation-drawer"
        className={`fixed inset-0 top-[65px] z-50 bg-oceanic-noir/95 backdrop-blur-lg md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col p-8 gap-6 h-full" role="menu">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-technical font-medium text-mystic-mint hover:text-forsythia transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-forsythia rounded-md py-2"
              role="menuitem"
            >
              {link.label}
            </a>
          ))}
          
          <hr className="border-mystic-mint/10 my-4" />
          
          <a
            href="#signin"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg font-technical font-medium text-mystic-mint hover:text-forsythia transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-forsythia rounded-md py-2"
          >
            Sign In
          </a>
          
          <a
            href="#pricing"
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn-primary w-full py-3 mt-4 text-center text-md font-technical"
          >
            Deploy Engine
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
