"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import styles from "./WhyUs.module.css";

type Language = "cs" | "en" | "uk";

const stats = {
    cs: [
        {
            number: "5+",
            title: "let zkušeností",
        },
        {
            number: "2000+",
            title: "spokojených klientů",
        },
        {
            number: "5",
            title: "specialistů",
        },
        {
            number: "100%",
            title: "kvalita",
        },
    ],

    en: [
        {
            number: "5+",
            title: "years of experience",
        },
        {
            number: "2000+",
            title: "happy clients",
        },
        {
            number: "5",
            title: "specialists",
        },
        {
            number: "100%",
            title: "quality",
        },
    ],

    uk: [
        {
            number: "5+",
            title: "років досвіду",
        },
        {
            number: "2000+",
            title: "задоволених клієнтів",
        },
        {
            number: "5",
            title: "майстрів",
        },
        {
            number: "100%",
            title: "якість",
        },
    ],
};

const content = {
    cs: {
        subtitle: "PROČ MY",
        title: "Proč si vybrat nás",
        description:
            "TY KRASO Beauty Studio v Trutnově spojuje profesionální péči, moderní beauty služby a individuální přístup. Naším cílem je vytvořit příjemné prostředí, kde se budete cítit pohodlně a odcházet spokojení.",
    },

    en: {
        subtitle: "WHY US",
        title: "Why choose us",
        description:
            "TY KRASO Beauty Studio in Trutnov combines professional care, modern beauty services and an individual approach. Our goal is to create a comfortable environment where you can relax and leave feeling satisfied.",
    },

    uk: {
        subtitle: "ЧОМУ МИ",
        title: "Чому обирають нас",
        description:
            "TY KRASO Beauty Studio у Трутнові поєднує професійний догляд, сучасні beauty-послуги та індивідуальний підхід. Ми створили комфортний простір, де можна розслабитися та отримати якісний догляд.",
    },
};

export default function WhyUs() {
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

    const currentStats = stats[language];
    const currentContent = content[language];

    return (
        <section
            className={styles.whyUs}
            aria-labelledby="why-us-title"
        >
            <div className={styles.container}>

                {/* =================================================
                    HEADER
                ================================================== */}

                <motion.header
                    className={styles.header}
                    initial={{
                        opacity: 0,
                        y: 40,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.8,
                        ease: [
                            0.22,
                            0.61,
                            0.36,
                            1,
                        ],
                    }}
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                >
                    <span
                        className={styles.subtitle}
                    >
                        {currentContent.subtitle}
                    </span>

                    <h2
                        id="why-us-title"
                        className={styles.title}
                    >
                        {currentContent.title}
                    </h2>

                    <p
                        className={
                            styles.description
                        }
                    >
                        {
                            currentContent.description
                        }
                    </p>
                </motion.header>

                {/* =================================================
                    STATS
                ================================================== */}

                <div className={styles.grid}>

                    {currentStats.map(
                        (item, index) => (
                            <motion.article
                                key={item.title}
                                className={styles.card}
                                initial={{
                                    opacity: 0,
                                    y: 50,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.75,
                                    delay:
                                        index * 0.12,
                                    ease: [
                                        0.22,
                                        0.61,
                                        0.36,
                                        1,
                                    ],
                                }}
                                viewport={{
                                    once: true,
                                    amount: 0.2,
                                }}
                            >
                                <span
                                    className={
                                        styles.number
                                    }
                                >
                                    {
                                        item.number
                                    }
                                </span>

                                <span
                                    className={
                                        styles.label
                                    }
                                >
                                    {
                                        item.title
                                    }
                                </span>
                            </motion.article>
                        )
                    )}

                </div>
            </div>
        </section>
    );
}