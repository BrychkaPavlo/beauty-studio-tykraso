"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "./About.module.css";
import Reveal from "./animations/Reveal";

type Language = "cs" | "en" | "uk";

const aboutContent = {
    cs: {
        label: "O NÁS",
        heading: (
            <>
                Prostor,
                <br />
                kde se krása
                <br />
                stává uměním.
            </>
        ),
        paragraphs: [
            "Vytvořili jsme moderní prostor, kde se profesionální péče spojuje s atmosférou pohodlí, stylu a osobního přístupu ke každému klientovi.",
            "Pro nás krása není jen výsledkem procedury, ale také emocemi, sebevědomím a pocitem, kvůli kterému se budete chtít vracet.",
            "Proto používáme moderní vybavení, kvalitní materiály a individuální přístup ke každému hostovi.",
        ],
        button: "Naše služby",
        imageAlt: "Tým TY KRASO Beauty Studio",
        stats: [
            {
                value: "5+",
                caption: (
                    <>
                        Let
                        <br />
                        zkušeností
                    </>
                ),
            },
            {
                value: "2000+",
                caption: (
                    <>
                        Spokojených
                        <br />
                        klientů
                    </>
                ),
            },
            {
                value: "100%",
                caption: (
                    <>
                        Hygiena
                        <br />
                        a bezpečnost
                    </>
                ),
            },
        ],
    },

    en: {
        label: "ABOUT US",
        heading: (
            <>
                A space
                <br />
                where beauty
                <br />
                becomes art.
            </>
        ),
        paragraphs: [
            "We created a modern space where professional care meets comfort, style and personal attention for every client.",
            "For us, beauty is not only the result of a treatment, but also the emotions, confidence and desire to come back again.",
            "That is why we use modern equipment, quality materials and an individual approach to every guest.",
        ],
        button: "Our services",
        imageAlt: "TY KRASO Beauty Studio team",
        stats: [
            {
                value: "5+",
                caption: (
                    <>
                        Years of
                        <br />
                        experience
                    </>
                ),
            },
            {
                value: "2000+",
                caption: (
                    <>
                        Happy
                        <br />
                        clients
                    </>
                ),
            },
            {
                value: "100%",
                caption: (
                    <>
                        Hygiene
                        <br />
                        and safety
                    </>
                ),
            },
        ],
    },

    uk: {
        label: "ПРО НАС",
        heading: (
            <>
                Простір,
                <br />
                де краса
                <br />
                стає мистецтвом.
            </>
        ),
        paragraphs: [
            "Ми створили сучасний простір, де професійний догляд поєднується з атмосферою комфорту, стилю та турботи про кожного клієнта.",
            "Для нас краса — це не лише результат процедури, а й емоції, впевненість у собі та бажання повертатися знову.",
            "Саме тому ми використовуємо сучасне обладнання, якісні матеріали та індивідуальний підхід до кожного гостя.",
        ],
        button: "Наші послуги",
        imageAlt: "Команда TY KRASO Beauty Studio",
        stats: [
            {
                value: "5+",
                caption: (
                    <>
                        Років
                        <br />
                        досвіду
                    </>
                ),
            },
            {
                value: "2000+",
                caption: (
                    <>
                        Задоволених
                        <br />
                        клієнтів
                    </>
                ),
            },
            {
                value: "100%",
                caption: (
                    <>
                        Стерильність
                        <br />
                        та безпека
                    </>
                ),
            },
        ],
    },
};

export default function About() {
    const [language, setLanguage] =
        useState<Language>("cs");

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

    const content = aboutContent[language];

    return (
        <section
            id="about"
            className={styles.about}
        >
            <div className={styles.backgroundGlow} />

            <Reveal effect="fadeUp">
                <header className={styles.header}>

                    <span className={styles.sectionLabel}>
                        {content.label}
                    </span>

                    <h2 className={styles.heading}>
                        {content.heading}
                    </h2>

                </header>
            </Reveal>

            <div className={styles.description}>

                <Reveal
                    effect="fadeLeft"
                    delay={250}
                >
                    <article className={styles.textBlock}>

                        <span className={styles.brand}>
                            TY KRASO BEAUTY STUDIO
                        </span>

                        <p className={styles.text}>
                            {content.paragraphs[0]}
                        </p>

                        <p className={styles.text}>
                            {content.paragraphs[1]}
                        </p>

                        <p className={styles.text}>
                            {content.paragraphs[2]}
                        </p>

                        <Link
                            href="#services"
                            className={styles.button}
                            aria-label={content.button}
                        >
                            {content.button}
                        </Link>

                    </article>
                </Reveal>

                <Reveal
                    effect="zoom"
                    delay={400}
                >
                    <figure className={styles.imageWrapper}>

                        <Image
                            src="/images/about/team.webp"
                            alt={content.imageAlt}
                            width={700}
                            height={900}
                            priority={false}
                            className={styles.image}
                            sizes="
                                (max-width: 768px) 100vw,
                                (max-width: 1200px) 45vw,
                                500px
                            "
                        />

                    </figure>
                </Reveal>

            </div>

            <div className={styles.stats}>

                {content.stats.map(
                    (stat, index) => (
                        <Reveal
                            key={stat.value}
                            effect={
                                index === 0
                                    ? "fadeLeft"
                                    : index === 1
                                        ? "fadeUp"
                                        : "fadeRight"
                            }
                            delay={550 + index * 150}
                        >
                            <article className={styles.stat}>

                                <span
                                    className={styles.value}
                                >
                                    {stat.value}
                                </span>

                                <span
                                    className={styles.caption}
                                >
                                    {stat.caption}
                                </span>

                            </article>
                        </Reveal>
                    )
                )}

            </div>

        </section>
    );
}