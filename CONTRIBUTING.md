# Contributing to AetherFlow AI

We welcome contributions to the AetherFlow AI landing page platform! As an enterprise-grade developer interface, we maintain high standards for performance, accessibility, and clean architecture.

---

## 🛠️ Developer Setup

1.  **Fork and Clone** the repository:
    ```bash
    git clone https://github.com/your-username/aetherflow-ai-platform.git
    cd aetherflow-ai-platform
    ```
2.  **Install dependencies** using Node.js 20+:
    ```bash
    npm install
    ```
3.  **Run the local development server**:
    ```bash
    npm run dev
    ```

---

## 📐 Code Style & Guidelines

### 1. TypeScript & Type Safety
*   Avoid using `any`. Write explicit interfaces and types inside `src/types/index.ts` where appropriate.
*   Strict compiler checks are active. Ensure your code builds cleanly with `npm run build` before pushing.

### 2. Styling (Tailwind CSS v4)
*   Utilize Tailwind v4 custom theme classes (e.g. `bg-oceanic-noir`, `text-forsythia`) instead of hardcoded hex values.
*   Ensure all custom components conform to the HSL variables inside [variables.css](file:///D:/frontend%20hackathon/frontend_project/src/styles/variables.css).

### 3. Performance Isolation
*   If extending state triggers (e.g. toggle selectors or inputs), consider using pub-sub stores (like `useSyncExternalStore` or direct DOM registries) to prevent parent re-renders.
*   Memoize heavy layout elements using `React.memo` where appropriate.

---

## ♿ Accessibility & SEO
*   **Semantic tags**: Ensure HTML sections use `<section>`, articles use `<article>`, list items use `<li>` lists, and forms use standard input/labels.
*   **ARIA States**: Always declare `aria-expanded` and `aria-controls` for collapse structures.
*   **Focus Rings**: Ensure focus visible states use outlines: `focus-visible:outline-2 focus-visible:outline-forsythia`.
*   **Alt Tags**: Every graphic element must have descriptive labels or be hidden with `aria-hidden="true"`.

---

## 🚀 Pull Request Checklist
Before submitting a PR, verify:
*   [ ] Next.js compiles successfully (`npm run build`).
*   [ ] No ESLint warnings or errors (`npm run lint`).
*   [ ] Page CLS remains `< 0.1` and TTI remains `< 1.5s`.
*   [ ] Local testing is verified on both desktop and mobile viewports.
