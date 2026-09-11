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
            title: "щасливих клієнтів",
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
    },

    en: {
        subtitle: "WHY US",
        title: "Why choose us",
    },

    uk: {
        subtitle: "ЧОМУ МИ",
        title: "Чому обирають нас",
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
        <section className={styles.whyUs}>
            <div className={styles.container}>

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
                        ease: [0.22, 0.61, 0.36, 1],
                    }}
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                >
                    <span className={styles.subtitle}>
                        {currentContent.subtitle}
                    </span>

                    <h2 className={styles.title}>
                        {currentContent.title}
                    </h2>
                </motion.header>

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
                                    delay: index * 0.12,
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
                                    {item.number}
                                </span>

                                <span
                                    className={
                                        styles.label
                                    }
                                >
                                    {item.title}
                                </span>
                            </motion.article>
                        )
                    )}

                </div>
            </div>
        </section>
    );
}