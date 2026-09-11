export const isDesktop = () =>
    window.matchMedia("(min-width:1024px)").matches;

export const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;