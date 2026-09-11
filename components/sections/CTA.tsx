"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import styles from "./CTA.module.css";

type Language = "cs" | "en" | "uk";

const content = {
    cs: {
        title: (
            <>
                Čas pečovat
                <br />
                o sebe
            </>
        ),
        description:
            "Rezervujte si proceduru online a získejte konzultaci od našich specialistů.",
        button: "Objednat se",
    },

    en: {
        title: (
            <>
                Time to take
                <br />
                care of yourself
            </>
        ),
        description:
            "Book your treatment online and receive a consultation from our specialists.",
        button: "Book now",
    },

    uk: {
        title: (
            <>
                Час подбати
                <br />
                про себе
            </>
        ),
        description:
            "Забронюйте процедуру онлайн та отримайте консультацію наших майстрів.",
        button: "Записатися зараз",
    },
};

export default function CTA() {
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

    const currentContent = content[language];

    return (
        <section className={styles.cta}>
            <div className={styles.glow} />

            <div className={styles.container}>

                <motion.div
                    className={styles.content}
                    initial={{
                        opacity: 0,
                        y: 40,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.9,
                        ease: [0.22, 0.61, 0.36, 1],
                    }}
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                >
                    <span className={styles.subtitle}>
                        TY KRASO BEAUTY STUDIO
                    </span>

                    <h2 className={styles.title}>
                        {currentContent.title}
                    </h2>

                    <p className={styles.description}>
                        {currentContent.description}
                    </p>

                    <Link
                        href="#contact"
                        className={styles.button}
                    >
                        {currentContent.button}
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}