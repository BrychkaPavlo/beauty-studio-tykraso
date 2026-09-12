"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import styles from "./Hero.module.css";
import animations from "./HeroAnimations.module.css";
import HeroEffects from "./HeroEffects";
import HeroParticles from "./HeroParticles";

type Language = "cs" | "en" | "uk";

const heroContent = {
    cs: {
        subtitle: "PREMIUM BEAUTY STUDIO V TRUTNOVĚ",

        secondTitle: "BEAUTY STUDIO",

        description:
            "Objevte atmosféru prémiové péče, profesionálního servisu a moderní estetiky v Trutnově. TY KRASO nabízí laserovou epilaci, kadeřnické služby, manikúru, pedikúru, masáže, kosmetiku, řasy a obočí.",

        primaryButton: "Objednat se",

        secondaryButton: "Naše služby",

        imageAlt:
            "TY KRASO Beauty Studio v Trutnově",
    },

    en: {
        subtitle: "PREMIUM BEAUTY STUDIO IN TRUTNOV",

        secondTitle: "BEAUTY STUDIO",

        description:
            "Experience the atmosphere of premium care, professional service and modern aesthetics in Trutnov. TY KRASO offers laser hair removal, hairdressing, manicure, pedicure, massage, cosmetics, lashes and eyebrows.",

        primaryButton: "Book now",

        secondaryButton: "Our services",

        imageAlt:
            "TY KRASO Beauty Studio in Trutnov",
    },

    uk: {
        subtitle: "PREMIUM BEAUTY STUDIO У ТРУТНОВІ",

        secondTitle: "BEAUTY STUDIO",

        description:
            "Відчуйте атмосферу преміального догляду, професійного сервісу та сучасної естетики у Трутнові. TY KRASO пропонує лазерну епіляцію, перукарські послуги, манікюр, педикюр, масаж, косметологію, вії та брови.",

        primaryButton: "Записатися",

        secondaryButton: "Наші послуги",

        imageAlt:
            "TY KRASO Beauty Studio у Трутнові",
    },
};

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);

    /*
     * =====================================================
     * LANGUAGE
     * =====================================================
     *
     * Czech is the default language.
     */

    const [language, setLanguage] =
        useState<Language>("cs");

    /*
     * =====================================================
     * LOAD SAVED LANGUAGE
     * =====================================================
     */

    useEffect(() => {
        const savedLanguage =
            localStorage.getItem(
                "ty-kraso-language"
            ) as Language | null;

        if (
            savedLanguage === "cs" ||
            savedLanguage === "en" ||
            savedLanguage === "uk"
        ) {
            setLanguage(savedLanguage);
        }
    }, []);

    const content =
        heroContent[language];

    /*
     * =====================================================
     * RENDER
     * =====================================================
     */

    return (
        <section
            ref={heroRef}
            className={styles.hero}
            aria-labelledby="hero-title"
        >
            {/* =================================================
                BACKGROUND
            ================================================== */}

            <div className={styles.background}>
                <Image
                    src="/images/hero/hero-bg.png"
                    alt={content.imageAlt}
                    fill
                    priority
                    sizes="100vw"
                    className={`${styles.backgroundImage} ${animations.heroReveal}`}
                />

                {/* Dark Overlay */}

                <div
                    className={styles.overlay}
                    aria-hidden="true"
                />

                {/* Gold Light */}

                <div
                    className={`${styles.goldLight} ${animations.lightReveal}`}
                    aria-hidden="true"
                />

                {/* Luxury Particles */}

                <HeroParticles />

                {/* Interactive Hero Effects */}

                <HeroEffects
                    heroRef={heroRef}
                />
            </div>

            {/* =================================================
                HERO CONTENT
            ================================================== */}

            <div className={styles.container}>
                <div className={styles.content}>
                    {/* Subtitle */}

                    <span
                        className={`${styles.subtitle} ${animations.subtitleReveal}`}
                    >
                        {content.subtitle}
                    </span>

                    {/* Main SEO Heading */}

                    <h1
                        id="hero-title"
                        className={`${styles.title} ${animations.titleReveal}`}
                    >
                        TY KRASO
                    </h1>

                    {/* Secondary Heading */}

                    <h2
                        className={`${styles.secondTitle} ${animations.secondTitleReveal}`}
                    >
                        {content.secondTitle}
                    </h2>

                    {/* Description */}

                    <p
                        className={`${styles.description} ${animations.descriptionReveal}`}
                    >
                        {content.description}
                    </p>

                    {/* =================================================
                        BUTTONS
                    ================================================== */}

                    <div
                        className={`${styles.buttons} ${animations.buttonsReveal}`}
                    >
                        <Link
                            href="#contact"
                            className={
                                styles.primaryButton
                            }
                        >
                            {content.primaryButton}
                        </Link>

                        <Link
                            href="#services"
                            className={
                                styles.secondaryButton
                            }
                        >
                            {content.secondaryButton}
                        </Link>
                    </div>
                </div>
            </div>

            {/* =================================================
                SCROLL
            ================================================== */}

            <Link
                href="#about"
                aria-label={
                    language === "cs"
                        ? "Přejít na informace o TY KRASO"
                        : language === "en"
                            ? "Go to information about TY KRASO"
                            : "Перейти до інформації про TY KRASO"
                }
                className={`${styles.scroll} ${animations.scrollReveal}`}
            >
                <span aria-hidden="true"></span>
            </Link>
        </section>
    );
}