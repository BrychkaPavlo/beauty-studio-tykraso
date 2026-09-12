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
            "Rezervujte si svou návštěvu v TY KRASO Beauty Studio v Trutnově. Vyberte si z profesionálních beauty služeb, objednejte se online a dopřejte si individuální péči od našich specialistů.",
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
            "Book your visit at TY KRASO Beauty Studio in Trutnov. Choose from our professional beauty services and enjoy individual care from our specialists.",
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
            "Запишіться до TY KRASO Beauty Studio у Трутнові. Оберіть професійну beauty-процедуру та отримайте індивідуальний догляд від наших майстрів.",
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
        <section
            className={styles.cta}
            aria-labelledby="cta-title"
        >
            <div
                className={styles.glow}
                aria-hidden="true"
            />

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

                    <h2
                        id="cta-title"
                        className={styles.title}
                    >
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