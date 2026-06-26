"use client";

import React, { useState, useCallback } from "react";
import { Icon } from "@/components/core/Icon";

/**
 * NewsletterCTA
 *
 * Premium inline email subscription card.
 * Uses semantic form structures and client-side validation with fully compliant
 * ARIA error feedback and success state transitions.
 */
export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(null);
  }, [error]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clean inputs
    const cleanEmail = email.trim();
    
    // Regular Expression for simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!cleanEmail) {
      setError("Email address is required.");
      return;
    }

    if (!emailRegex.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Success transition
    setIsSubscribed(true);
    setError(null);
  }, [email]);

  return (
    <section
      id="newsletter"
      aria-label="Newsletter Subscription"
      className="w-full bg-oceanic-noir py-16 px-6"
    >
      <div className="max-w-5xl mx-auto glass-panel rounded-2xl p-8 md:p-12 border border-mystic-mint/10 bg-nocturnal-expedition/5 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-forsythia/5 blur-[80px] pointer-events-none" />
        
        {isSubscribed ? (
          /* Success State Card */
          <div 
            className="flex flex-col items-center justify-center text-center py-6 animate-fade-in"
            role="region"
            aria-live="polite"
          >
            <div className="p-3 rounded-full bg-forsythia/10 border border-forsythia/30 text-forsythia mb-4 animate-bounce">
              <Icon name="cube-16-solid" size={24} />
            </div>
            <h3 className="font-technical text-lg font-bold text-arctic-powder mb-2">
              Welcome to AetherMail
            </h3>
            <p className="text-xs text-mystic-mint/70 max-w-sm">
              Your subscription is active. We will notify you whenever new engine benchmarks compile.
            </p>
          </div>
        ) : (
          /* Form State Card */
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            {/* Title & Copy */}
            <div className="flex flex-col text-center lg:text-left gap-2 max-w-md">
              <span className="font-mono text-[9px] text-forsythia uppercase tracking-[0.2em] font-bold">
                WEEKLY DIGEST
              </span>
              <h2 className="font-technical text-md md:text-lg font-bold text-arctic-powder">
                Subscribe to AetherMail
              </h2>
              <p className="text-xs text-mystic-mint/65 leading-relaxed">
                Receive technical deep-dives, benchmark results, and autonomous systems architecture updates directly in your inbox.
              </p>
            </div>

            {/* Subscription Form */}
            <div className="w-full max-w-sm flex flex-col">
              <form 
                onSubmit={handleSubmit} 
                className="flex flex-col sm:flex-row gap-3 w-full"
                noValidate
              >
                <div className="flex-1 flex flex-col relative">
                  {/* Accessible Label linked to the input ID */}
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email Address
                  </label>
                  
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="enter developer email"
                    aria-invalid={!!error}
                    aria-describedby={error ? "newsletter-error" : undefined}
                    className={`bg-oceanic-noir/50 border rounded-lg px-4 py-3 text-xs text-arctic-powder placeholder-mystic-mint/30 focus:outline-none focus:ring-1 focus:ring-forsythia tracking-wide font-technical transition-colors duration-200 ${
                      error 
                        ? "border-deep-saffron focus:border-deep-saffron" 
                        : "border-mystic-mint/20 focus:border-forsythia"
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary py-3 px-6 text-xs shrink-0 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-forsythia"
                >
                  Subscribe
                </button>
              </form>

              {/* Accessible, visible validation errors */}
              {error && (
                <p
                  id="newsletter-error"
                  role="alert"
                  aria-live="assertive"
                  className="text-[10px] text-deep-saffron font-technical mt-2 text-left"
                >
                  {error}
                </p>
              )}

              {/* Consent Privacy copy */}
              <p className="text-[9px] text-mystic-mint/40 leading-relaxed mt-3 text-left">
                By subscribing, you agree to our data practices. No spam. Unsubscribe instantly at any time.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default NewsletterCTA;
