"use client";

import React, { useState, useCallback } from "react";
import { Icon } from "@/components/core/Icon";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    category: "AI Automation",
    question: "How does AetherFlow ensure the reliability of autonomous self-healing loops?",
    answer: "AetherFlow utilizes isolated sandbox runtimes to simulate and validate self-healing steps before applying them to your production systems. By monitoring feedback signals dynamically, we achieve 99.8% recovery rates without human intervention.",
  },
  {
    id: 2,
    category: "Integrations",
    question: "Which data platforms and vector databases are supported out of the box?",
    answer: "We support major cloud data warehouses (including BigQuery, Snowflake, and Redshift) along with premium vector search engines (such as Pinecone, Milvus, Qdrant, and pgvector) with zero-copy stream processing pipelines.",
  },
  {
    id: 3,
    category: "Security",
    question: "What encryption standards and compliance certifications does AetherFlow adhere to?",
    answer: "We are SOC 2 Type II certified and adhere strictly to FIPS 140-3 standards. All pipeline payloads are encrypted end-to-end (AES-256) and processed inside secure enclave execution environments.",
  },
  {
    id: 4,
    category: "Pricing",
    question: "How is compute usage calculated, and is there a free tier?",
    answer: "Pricing is calculated based on active compute execution seconds. We offer a generous free tier of 500,000 execution seconds per month, after which pay-as-you-go pricing applies.",
  },
  {
    id: 5,
    category: "Enterprise",
    question: "Do you support self-hosted or VPC deployments for enterprise customers?",
    answer: "Yes, our Enterprise tier supports private VPC deployments, dedicated server clusters, and custom service level agreements (SLAs) tailored to your operational and regulatory compliance mandates.",
  },
  {
    id: 6,
    category: "Support",
    question: "What support channels are available for developer and enterprise plans?",
    answer: "Developer plans include community Slack and email support. Enterprise plans feature 24/7 dedicated engineer paging, custom integration assistance, and priority SLAs.",
  },
];

/**
 * FAQSection
 *
 * Renders a semantic, fully-accessible FAQ accordion strip.
 * Animation runs smoothly without height layout reflows by leveraging
 * the CSS Grid (0fr -> 1fr) technique.
 */
export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const buttons = Array.from(
          document.querySelectorAll<HTMLButtonElement>('[data-faq-header="true"]')
        );
        const currentIndex = buttons.indexOf(e.currentTarget);
        if (currentIndex !== -1) {
          const nextIndex =
            e.key === "ArrowDown"
              ? (currentIndex + 1) % buttons.length
              : (currentIndex - 1 + buttons.length) % buttons.length;
          buttons[nextIndex]?.focus();
        }
      }
    },
    []
  );

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="w-full bg-oceanic-noir py-24 select-none"
    >
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
        {/* Header Title */}
        <h2
          id="faq-heading"
          className="heading-section text-center text-arctic-powder mb-4"
        >
          Frequently Asked Questions
        </h2>
        <p className="text-body-premium text-center max-w-lg mb-16">
          Answers to technical details, pricing, security compliance, and platform integrations.
        </p>

        {/* FAQ Accordion List */}
        <div className="w-full border-t border-mystic-mint/10" role="presentation">
          {FAQ_DATA.map((item, idx) => {
            const isActive = activeIndex === idx;
            const headerId = `faq-header-${item.id}`;
            const contentId = `faq-content-${item.id}`;

            return (
              <div
                key={item.id}
                className={`border-b transition-colors duration-200 ${
                  isActive
                    ? "border-forsythia/30 bg-nocturnal-expedition/15"
                    : "border-mystic-mint/10 bg-transparent"
                }`}
              >
                {/* Accordion Trigger Header */}
                <h3 className="m-0 flex">
                  <button
                    id={headerId}
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={contentId}
                    data-faq-header="true"
                    onClick={() => handleToggle(idx)}
                    onKeyDown={handleKeyDown}
                    className="flex w-full items-center justify-between px-6 py-5 text-left select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-forsythia focus-visible:outline-offset-[-2px] group min-h-[56px]"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      {/* Technical category badge */}
                      <span className="font-mono text-[9px] uppercase tracking-wider text-forsythia/80 font-bold shrink-0">
                        [{item.category}]
                      </span>
                      
                      {/* Question text */}
                      <span
                        className={`font-technical text-sm font-semibold transition-colors duration-200 ${
                          isActive ? "text-forsythia" : "text-arctic-powder group-hover:text-forsythia"
                        }`}
                      >
                        {item.question}
                      </span>
                    </div>

                    {/* Chevron toggle icon */}
                    <div
                      className="text-mystic-mint/40 group-hover:text-forsythia transition-transform duration-layout ease-in-out shrink-0 ml-4"
                      style={{
                        transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform var(--duration-layout) var(--ease-in-out)",
                      }}
                    >
                      <Icon name="chevron-down" size={16} />
                    </div>
                  </button>
                </h3>

                {/* Accordion Content Panel - Animate using CSS Grid technique */}
                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={headerId}
                  aria-hidden={!isActive}
                  className="grid overflow-hidden"
                  style={{
                    gridTemplateRows: isActive ? "1fr" : "0fr",
                    opacity: isActive ? 1 : 0,
                    transition:
                      "grid-template-rows var(--duration-layout) var(--ease-in-out), opacity var(--duration-layout) var(--ease-in-out)",
                  }}
                >
                  <div className="min-h-0">
                    <p className="px-6 pb-6 pt-1 text-xs text-mystic-mint/70 leading-relaxed max-w-3xl">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
