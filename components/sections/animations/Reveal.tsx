"use client";

import {
    ReactNode,
    useEffect,
    useRef,
} from "react";

import styles from "./Reveal.module.css";

type RevealEffect =
    | "fadeUp"
    | "fadeLeft"
    | "fadeRight"
    | "zoom"
    | "blur";

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    threshold?: number;
    once?: boolean;
    effect?: RevealEffect;
}

const effectClasses: Record<
    RevealEffect,
    string
> = {
    fadeUp: styles.fadeUp,
    fadeLeft: styles.fadeLeft,
    fadeRight: styles.fadeRight,
    zoom: styles.zoom,
    blur: styles.blur,
};

export default function Reveal({
    children,
    className = "",
    delay = 0,
    threshold = 0.1,
    once = true,
    effect = "fadeUp",
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        element.style.transitionDelay =
            `${delay}ms`;

        /*
         * Якщо користувач просить мінімум анімацій —
         * одразу показуємо елемент.
         */
        if (
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
        ) {
            element.classList.add(styles.show);

            return;
        }

        /*
         * Якщо IntersectionObserver недоступний,
         * не залишаємо контент невидимим.
         */
        if (
            !("IntersectionObserver" in window)
        ) {
            element.classList.add(styles.show);

            return;
        }

        let hasShown = false;

        const observer =
            new IntersectionObserver(
                (entries) => {
                    const entry =
                        entries[0];

                    if (!entry) return;

                    if (entry.isIntersecting) {
                        element.classList.add(
                            styles.show
                        );

                        hasShown = true;

                        if (once) {
                            observer.unobserve(
                                element
                            );
                        }

                        return;
                    }

                    /*
                     * При once=false дозволяємо
                     * повторне відтворення.
                     */
                    if (!once && hasShown) {
                        element.classList.remove(
                            styles.show
                        );
                    }
                },
                {
                    threshold,
                    rootMargin:
                        "0px 0px -5% 0px",
                }
            );

        observer.observe(element);

        /*
         * Додатковий fallback:
         * якщо елемент уже знаходиться
         * у viewport після монтування.
         */
        const rect =
            element.getBoundingClientRect();

        const viewportHeight =
            window.innerHeight ||
            document.documentElement
                .clientHeight;

        if (
            rect.top <
            viewportHeight * 0.95
        ) {
            element.classList.add(
                styles.show
            );

            hasShown = true;

            if (once) {
                observer.unobserve(
                    element
                );
            }
        }

        return () => {
            observer.disconnect();
        };
    }, [
        delay,
        threshold,
        once,
    ]);

    return (
        <div
            ref={ref}
            className={[
                styles.reveal,
                effectClasses[effect],
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {children}
        </div>
    );
}