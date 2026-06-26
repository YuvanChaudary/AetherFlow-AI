"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Icon } from "@/components/core/Icon";

const FOOTER_SECTIONS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Architecture", href: "#technology" },
      { label: "Performance", href: "#features" },
      { label: "Pricing plans", href: "#pricing" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Real-time ETL", href: "#features" },
      { label: "Vector search", href: "#features" },
      { label: "Secure compute", href: "#features" },
      { label: "Compliance", href: "#features" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "API Docs", href: "#docs" },
      { label: "System status", href: "#docs" },
      { label: "Change log", href: "#docs" },
      { label: "Developer kit", href: "#docs" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "#docs" },
      { label: "Careers", href: "#docs" },
      { label: "Contact sales", href: "#docs" },
      { label: "Press room", href: "#docs" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "#docs" },
      { label: "Terms of use", href: "#docs" },
      { label: "Security policy", href: "#docs" },
      { label: "SLA agreement", href: "#docs" },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: "GitHub", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Discord", href: "#" },
  { label: "LinkedIn", href: "#" },
];

/**
 * Footer
 *
 * Semantic multi-column global footer with responsive layout columns,
 * text-only social indexes, brand statements, and a scroll-triggered
 * Back-to-Top action.
 */
export function Footer() {
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      // Show button once user scrolls beyond 300px
      setIsScrollTopVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <footer className="w-full bg-oceanic-noir border-t border-mystic-mint/10 pt-20 pb-12 select-none relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-16">
        {/* Top: Brand Info + Multi-Column Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Brand Info Column */}
          <div className="col-span-2 flex flex-col gap-4">
            <a
              href="#"
              className="flex items-center gap-2 group focus-visible:outline-2 focus-visible:outline-forsythia rounded-md self-start"
              aria-label="AetherFlow AI Homepage"
            >
              <Icon
                name="cube-16-solid"
                size={18}
                className="text-forsythia transition-transform duration-300 group-hover:rotate-45"
              />
              <span className="font-technical text-sm font-bold tracking-wider text-forsythia">
                AETHERFLOW<span className="text-deep-saffron">.AI</span>
              </span>
            </a>
            
            <p className="text-xs text-mystic-mint/60 leading-relaxed max-w-sm">
              Orchestrate compute. Automate streams. Secure vectors. A premium Next-Gen AI platform delivering zero-trust, high-performance operations.
            </p>
          </div>

          {/* Sitemaps Columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h4 className="font-mono text-[9px] uppercase tracking-widest text-forsythia font-bold">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-2.5" role="list">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-mystic-mint/60 hover:text-arctic-powder transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-forsythia rounded-sm px-1 py-0.5"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom: Social links, copyright, and brand credentials */}
        <div className="border-t border-mystic-mint/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <p className="text-[10px] text-mystic-mint/40 font-mono">
              &copy; {new Date().getFullYear()} AetherFlow AI. All rights reserved.
            </p>
            <span className="hidden sm:inline text-mystic-mint/10">|</span>
            <p className="text-[10px] text-mystic-mint/45 font-mono uppercase tracking-wider">
              Secure Enclave Compute
            </p>
          </div>

          {/* Text-Only Social Links */}
          <div className="flex items-center gap-6" role="presentation">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-mystic-mint/50 hover:text-forsythia transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-forsythia rounded px-1 py-0.5 font-mono"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Back-to-Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-3.5 rounded-full bg-nocturnal-expedition border border-mystic-mint/15 text-forsythia hover:text-deep-saffron hover:border-forsythia/40 shadow-xl cursor-pointer focus-visible:outline-2 focus-visible:outline-forsythia transition-all duration-300 transform ${
          isScrollTopVisible 
            ? "opacity-100 translate-y-0 scale-100" 
            : "opacity-0 translate-y-4 scale-90 pointer-events-none"
        }`}
        aria-label="Scroll back to top of page"
      >
        <Icon name="chevron-up" size={16} />
      </button>
    </footer>
  );
}

export default Footer;
