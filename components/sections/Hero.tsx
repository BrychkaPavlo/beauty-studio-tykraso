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
        subtitle: "PREMIUM BEAUTY STUDIO",
        secondTitle: "BEAUTY STUDIO",
        description:
            "Objevte atmosféru prémiové péče, profesionálního servisu a moderní estetiky. Pomáháme zvýraznit přirozenou krásu a vytvořit vzhled, který vám každý den dodá sebevědomí.",
        primaryButton: "Objednat se",
        secondaryButton: "Naše služby",
    },

    en: {
        subtitle: "PREMIUM BEAUTY STUDIO",
        secondTitle: "BEAUTY STUDIO",
        description:
            "Experience the atmosphere of premium care, professional service and modern aesthetics. We help enhance your natural beauty and create a look that gives you confidence every day.",
        primaryButton: "Book now",
        secondaryButton: "Our services",
    },

    uk: {
        subtitle: "PREMIUM BEAUTY STUDIO",
        secondTitle: "BEAUTY STUDIO",
        description:
            "Відчуйте атмосферу преміального догляду, професійного сервісу та сучасної естетики. Ми допомагаємо підкреслити природну красу, створюючи образ, який дарує впевненість щодня.",
        primaryButton: "Записатися",
        secondaryButton: "Наші послуги",
    },
};

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);

    // Czech is the default language
    const [language, setLanguage] = useState<Language>("cs");

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

    const content = heroContent[language];

    return (
        <section
            ref={heroRef}
            className={styles.hero}
        >
            {/* =========================
                BACKGROUND
            ========================== */}

            <div className={styles.background}>

                <Image
                    src="/images/hero/hero-bg.png"
                    alt="Ty Kraso Beauty Studio"
                    fill
                    priority
                    className={`${styles.backgroundImage} ${animations.heroReveal}`}
                />

                {/* Dark Overlay */}

                <div className={styles.overlay}></div>

                {/* Gold Light */}

                <div
                    className={`${styles.goldLight} ${animations.lightReveal}`}
                />

                {/* Luxury Particles */}

                <HeroParticles />

                <HeroEffects
                    heroRef={heroRef}
                />

            </div>

            {/* =========================
                CONTENT
            ========================== */}

            <div className={styles.container}>

                <div className={styles.content}>

                    <span
                        className={`${styles.subtitle} ${animations.subtitleReveal}`}
                    >
                        {content.subtitle}
                    </span>

                    <h1
                        className={`${styles.title} ${animations.titleReveal}`}
                    >
                        TY KRASO
                    </h1>

                    <h2
                        className={`${styles.secondTitle} ${animations.secondTitleReveal}`}
                    >
                        {content.secondTitle}
                    </h2>

                    <p
                        className={`${styles.description} ${animations.descriptionReveal}`}
                    >
                        {content.description}
                    </p>

                    {/* =========================
                        BUTTONS
                    ========================== */}

                    <div
                        className={`${styles.buttons} ${animations.buttonsReveal}`}
                    >

                        <Link
                            href="#contact"
                            className={styles.primaryButton}
                        >
                            {content.primaryButton}
                        </Link>

                        <Link
                            href="#services"
                            className={styles.secondaryButton}
                        >
                            {content.secondaryButton}
                        </Link>

                    </div>

                </div>

            </div>

            {/* =========================
                SCROLL
            ========================== */}

            <Link
                href="#about"
                aria-label="Scroll Down"
                className={`${styles.scroll} ${animations.scrollReveal}`}
            >
                <span></span>
            </Link>

        </section>
    );
}