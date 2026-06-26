# Changelog

All notable changes to the AetherFlow AI Platform landing page project will be documented in this file. This project follows [Semantic Versioning](https://semver.org/).

---

## [1.0.0] - 2026-06-26

### Added
*   **Dynamic Metadata Generators**: Dynamic sitemap routing (`sitemap.ts`), robots instructions (`robots.ts`), and progressive web app parameters (`manifest.ts`) in the Next.js App Router layer.
*   **next/script JSON-LD Injection**: Replaced native tags with next/script `Script` tags inside `<head>` to prevent paint locks.
*   **Vercel Config**: Created `vercel.json` with HSTS, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy headers.
*   **Production Guides**: Added `.env.example`, `deployment_checklist.md`, and `demo_walkthrough.md`.
*   **Clean Outlines**: Resolved heading jumps in `SocialProof.tsx`, `StatsSection.tsx`, and `NewsletterCTA.tsx` for accessibility and SEO.
*   **Technical FAQ accordion**: Added `FAQ.tsx` containing 6 categories of questions. Implements height transitions and keyboard arrow cycling controls.
*   **Newsletter CTA form**: Added `NewsletterCTA.tsx` with regular expression validations, ARIA error alerts, and success welcome cards.
*   **Global Footer**: Added `Footer.tsx` with multi-column maps, text-only social lists, and a reactive scroll-top floating arrow.
*   **Social Proof Brand Wall**: Added `SocialProof.tsx` with typographic company logo marks and 150-200ms ease-out transitions.
*   **Operational metrics**: Added `StatsSection.tsx` with IntersectionObserver count-up animations using requestAnimationFrame.
*   **Testimonials grid**: Added `Testimonials.tsx` with 3-column semantic articles (`<blockquote>` and `<cite>`).
*   **Closing CTA card**: Added `CTASection.tsx` with conversion triggers and ambient background aurora glows.
*   **Bento ⟷ Accordion Layout**: Added `BentoAccordion.tsx` and `AccordionItem.tsx` responsive switcher.
*   **Context Lock State Store**: Added `useBentoAccordionState.ts` pub-sub external store, synchronizing grid active indexes with mobile accordion panels.
*   **Isolated Pricing Matrix**: Added `PricingEngine.tsx`, `PricingCard.tsx`, `BillingToggle.tsx`, and `CurrencySelector.tsx` price models.
*   **Direct DOM Price replacements**: Added `usePricingEngine.ts` DOM Цена Registry to bypass React re-renders.
*   **WebGL particle hero canvas**: Lazy-loaded `HeroCanvas.tsx` using Next.js `dynamic()` imports to optimize FCP.
*   **Global Layout & Header**: Created `layout.tsx` preloading fonts, skipping content anchors, and `Header.tsx` drawer navigation.
