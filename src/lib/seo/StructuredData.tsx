import React from "react";
import Script from "next/script";
import type { JsonLdSchema } from "./structured-data";

interface StructuredDataProps {
  schema: JsonLdSchema | JsonLdSchema[];
  id?: string;
}

/**
 * Server-safe React component that injects JSON-LD structured data.
 * Compatible with Server Components (RSC) and Client Components.
 * Utilizes Next.js next/script to comply with App Router performance standards.
 */
export function StructuredData({ schema, id }: StructuredDataProps) {
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemas.map((s, i) => (
        <Script
          key={`${id ?? "ld-json"}-${i}`}
          id={schemas.length === 1 ? (id ?? "ld-json") : `${id ?? "ld-json"}-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s, null, 0) }}
        />
      ))}
    </>
  );
}

StructuredData.displayName = "StructuredData";
export default StructuredData;
