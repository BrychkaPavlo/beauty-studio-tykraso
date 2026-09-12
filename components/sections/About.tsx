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
            "Vytvořili jsme moderní beauty studio v Trutnově, kde se profesionální péče spojuje s atmosférou pohodlí, stylu a osobního přístupu ke každému klientovi.",

            "V TY KRASO věříme, že krása není jen výsledkem procedury. Je to také pocit sebevědomí, péče o sebe a chvíle, kterou si můžete užít v příjemném prostředí.",

            "Proto pracujeme s moderním vybavením, kvalitními materiály a individuálním přístupem. Nabízíme laserovou epilaci, elektroepilaci, voskovou depilaci, kadeřnické služby, manikúru, pedikúru, masáže, kosmetiku, řasy a obočí.",
        ],

        button: "Naše služby",

        imageAlt:
            "TY KRASO Beauty Studio v Trutnově",

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
            "We created a modern beauty studio in Trutnov, where professional care meets comfort, style and personal attention for every client.",

            "At TY KRASO, we believe that beauty is not only the result of a treatment. It is also about confidence, self-care and enjoying a moment in a pleasant environment.",

            "That is why we work with modern equipment, quality materials and an individual approach. We offer laser hair removal, electrolysis, waxing, hairdressing, manicure, pedicure, massage, cosmetics, lashes and eyebrows.",
        ],

        button: "Our services",

        imageAlt:
            "TY KRASO Beauty Studio in Trutnov",

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
            "Ми створили сучасну студію краси у Трутнові, де професійний догляд поєднується з атмосферою комфорту, стилю та індивідуальної уваги до кожного клієнта.",

            "У TY KRASO ми віримо, що краса — це не лише результат процедури. Це також впевненість у собі, турбота про себе та приємний час у комфортній атмосфері.",

            "Саме тому ми використовуємо сучасне обладнання, якісні матеріали та індивідуальний підхід. Ми пропонуємо лазерну епіляцію, електроепіляцію, воскову депіляцію, перукарські послуги, манікюр, педикюр, масаж, косметологію, вії та брови.",
        ],

        button: "Наші послуги",

        imageAlt:
            "TY KRASO Beauty Studio у Трутнові",

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
        aboutContent[language];

    /*
     * =====================================================
     * RENDER
     * =====================================================
     */

    return (
        <section
            id="about"
            className={styles.about}
            aria-labelledby="about-title"
        >
            {/* =================================================
                BACKGROUND
            ================================================== */}

            <div
                className={styles.backgroundGlow}
                aria-hidden="true"
            />

            {/* =================================================
                HEADER
            ================================================== */}

            <Reveal effect="fadeUp">
                <header className={styles.header}>
                    <span
                        className={
                            styles.sectionLabel
                        }
                    >
                        {content.label}
                    </span>

                    <h2
                        id="about-title"
                        className={
                            styles.heading
                        }
                    >
                        {content.heading}
                    </h2>
                </header>
            </Reveal>

            {/* =================================================
                DESCRIPTION
            ================================================== */}

            <div
                className={styles.description}
            >
                {/* =================================================
                    TEXT
                ================================================== */}

                <Reveal
                    effect="fadeLeft"
                    delay={250}
                >
                    <article
                        className={
                            styles.textBlock
                        }
                    >
                        <span
                            className={
                                styles.brand
                            }
                        >
                            TY KRASO BEAUTY STUDIO
                        </span>

                        <p
                            className={
                                styles.text
                            }
                        >
                            {
                                content
                                    .paragraphs[0]
                            }
                        </p>

                        <p
                            className={
                                styles.text
                            }
                        >
                            {
                                content
                                    .paragraphs[1]
                            }
                        </p>

                        <p
                            className={
                                styles.text
                            }
                        >
                            {
                                content
                                    .paragraphs[2]
                            }
                        </p>

                        <Link
                            href="#services"
                            className={
                                styles.button
                            }
                            aria-label={
                                content.button
                            }
                        >
                            {content.button}
                        </Link>
                    </article>
                </Reveal>

                {/* =================================================
                    IMAGE
                ================================================== */}

                <Reveal
                    effect="zoom"
                    delay={400}
                >
                    <figure
                        className={
                            styles.imageWrapper
                        }
                    >
                        <Image
                            src="/images/about/team.webp"
                            alt={
                                content.imageAlt
                            }
                            width={700}
                            height={900}
                            priority={false}
                            className={
                                styles.image
                            }
                            sizes="
                                (max-width: 768px) 100vw,
                                (max-width: 1200px) 45vw,
                                500px
                            "
                        />
                    </figure>
                </Reveal>
            </div>

            {/* =================================================
                STATISTICS
            ================================================== */}

            <div
                className={styles.stats}
            >
                {content.stats.map(
                    (stat, index) => (
                        <Reveal
                            key={`${stat.value}-${index}`}
                            effect={
                                index === 0
                                    ? "fadeLeft"
                                    : index === 1
                                        ? "fadeUp"
                                        : "fadeRight"
                            }
                            delay={
                                550 +
                                index * 150
                            }
                        >
                            <article
                                className={
                                    styles.stat
                                }
                            >
                                <span
                                    className={
                                        styles.value
                                    }
                                >
                                    {
                                        stat.value
                                    }
                                </span>

                                <span
                                    className={
                                        styles.caption
                                    }
                                >
                                    {
                                        stat.caption
                                    }
                                </span>
                            </article>
                        </Reveal>
                    )
                )}
            </div>
        </section>
    );
}