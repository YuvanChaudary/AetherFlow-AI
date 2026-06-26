"use client";

import React from "react";
import { BentoItem } from "@/types";
import { Icon, IconName } from "@/components/core/Icon";

interface AccordionItemProps {
  item: BentoItem;
  index: number;
  isActive: boolean;
  onToggle: (index: number) => void;
}

/**
 * AccordionItem
 *
 * Renders a single accordion row for mobile layouts.
 * Uses the CSS Grid technique to animate height: 0 -> auto smoothly
 * without layout thrashing. Binds keyboard arrow controls for WCAG compliance.
 */
export const AccordionItem = React.memo(function AccordionItem({
  item,
  index,
  isActive,
  onToggle,
}: AccordionItemProps) {
  const headerId = `accordion-header-${item.id}`;
  const contentId = `accordion-content-${item.id}`;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      // Locate all accordion headers on the page
      const headers = Array.from(
        document.querySelectorAll<HTMLButtonElement>('[data-accordion-header="true"]')
      );
      const currentIndex = headers.indexOf(e.currentTarget);
      if (currentIndex !== -1) {
        const nextIndex =
          e.key === "ArrowDown"
            ? (currentIndex + 1) % headers.length
            : (currentIndex - 1 + headers.length) % headers.length;
        headers[nextIndex]?.focus();
      }
    }
  };

  return (
    <div
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
          data-accordion-header="true"
          onClick={() => onToggle(index)}
          onKeyDown={handleKeyDown}
          className="flex w-full items-center justify-between px-6 py-5 text-left select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-forsythia focus-visible:outline-offset-[-2px] group min-h-[56px]"
        >
          <div className="flex items-center gap-4">
            {/* Custom Icon Wrapper */}
            <div
              className={`p-2.5 rounded-lg border transition-all duration-300 ${
                isActive
                  ? "bg-forsythia/10 border-forsythia/30 text-forsythia"
                  : "bg-nocturnal-expedition/20 border-mystic-mint/10 text-mystic-mint"
              }`}
            >
              <Icon name={item.iconName as IconName} size={18} />
            </div>
            
            {/* Title */}
            <span
              className={`font-technical text-sm font-bold transition-colors duration-200 ${
                isActive ? "text-forsythia" : "text-arctic-powder group-hover:text-forsythia"
              }`}
            >
              {item.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {item.badge && (
              <span className="px-1.5 py-0.5 text-[8px] font-technical font-bold uppercase tracking-wider bg-deep-saffron text-arctic-powder rounded-md">
                {item.badge}
              </span>
            )}
            
            {/* Chevron Icon indicating expand/collapse state */}
            <div
              className={`text-mystic-mint/40 group-hover:text-forsythia transition-transform duration-layout ease-in-out`}
              style={{
                transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform var(--duration-layout) var(--ease-in-out)",
              }}
            >
              <Icon name="chevron-down" size={16} />
            </div>
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
          <div className="px-6 pb-6 pt-1 flex flex-col gap-4">
            <p className="text-xs text-mystic-mint/70 leading-relaxed">
              {item.description}
            </p>

            {/* Display metric as a premium micro-ui layout */}
            {item.metric && (
              <div className="flex items-center justify-between border-t border-mystic-mint/5 pt-3 mt-1 text-xs">
                <span className="text-[9px] text-mystic-mint/40 uppercase tracking-widest font-medium">
                  PERFORMANCE METRIC
                </span>
                <span className="font-technical font-bold text-forsythia bg-forsythia/5 px-2 py-0.5 rounded border border-forsythia/10">
                  {item.metric}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

AccordionItem.displayName = "AccordionItem";
export default AccordionItem;
