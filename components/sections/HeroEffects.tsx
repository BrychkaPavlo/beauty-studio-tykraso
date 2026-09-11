"use client";

import { RefObject, useEffect } from "react";

interface HeroEffectsProps {
    heroRef: RefObject<HTMLElement | null>;
}

export default function HeroEffects({
    heroRef,
}: HeroEffectsProps) {
    useEffect(() => {
        const hero = heroRef.current;

        if (!hero) return;

        // Mouse effect працює тільки на desktop
        const desktopQuery = window.matchMedia(
            "(min-width: 1024px)"
        );

        const reducedMotionQuery = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        if (
            !desktopQuery.matches ||
            reducedMotionQuery.matches
        ) {
            return;
        }

        let targetX = 0;
        let targetY = 0;

        let currentX = 0;
        let currentY = 0;

        const speed = 0.08;

        let animationFrame = 0;

        const handleMouseMove = (
            event: MouseEvent
        ) => {
            const rect = hero.getBoundingClientRect();

            targetX =
                event.clientX -
                rect.left -
                rect.width / 2;

            targetY =
                event.clientY -
                rect.top -
                rect.height / 2;
        };

        const handleMouseLeave = () => {
            targetX = 0;
            targetY = 0;
        };

        const animate = () => {
            currentX +=
                (targetX - currentX) * speed;

            currentY +=
                (targetY - currentY) * speed;

            hero.style.setProperty(
                "--mouse-x",
                `${currentX}px`
            );

            hero.style.setProperty(
                "--mouse-y",
                `${currentY}px`
            );

            animationFrame =
                window.requestAnimationFrame(
                    animate
                );
        };

        hero.addEventListener(
            "mousemove",
            handleMouseMove,
            { passive: true }
        );

        hero.addEventListener(
            "mouseleave",
            handleMouseLeave
        );

        animationFrame =
            window.requestAnimationFrame(
                animate
            );

        return () => {
            hero.removeEventListener(
                "mousemove",
                handleMouseMove
            );

            hero.removeEventListener(
                "mouseleave",
                handleMouseLeave
            );

            window.cancelAnimationFrame(
                animationFrame
            );

            hero.style.setProperty(
                "--mouse-x",
                "0px"
            );

            hero.style.setProperty(
                "--mouse-y",
                "0px"
            );
        };
    }, [heroRef]);

    return null;
}