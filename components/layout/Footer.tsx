"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    FaInstagram,
    FaMapLocationDot,
    FaArrowUpRightFromSquare,
} from "react-icons/fa6";

import styles from "./Footer.module.css";

type Language = "cs" | "en" | "uk";

const content = {
    cs: {
        copyright: "© 2026 Všechna práva vyhrazena.",
        button: "Objednat se",
        findUs: "Najdete nás",
        mapText: "Otevřít Google Maps",
        infoText: "Více informací",
    },

    en: {
        copyright: "© 2026 All rights reserved.",
        button: "Book now",
        findUs: "Find us",
        mapText: "Open Google Maps",
        infoText: "More information",
    },

    uk: {
        copyright: "© 2026 Всі права захищені.",
        button: "Записатися",
        findUs: "Знайти нас",
        mapText: "Відкрити Google Maps",
        infoText: "Більше інформації",
    },
};

export default function Footer() {
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
        <footer className={styles.footer}>
            <div className={styles.container}>

                {/* =================================================
                    LEFT
                ================================================= */}

                <div className={styles.brand}>

                    <Link
                        href="/"
                        className={styles.logo}
                    >
                        TY KRASO
                    </Link>

                    <span className={styles.studio}>
                        BEAUTY STUDIO
                    </span>

                    <div
                        className={
                            styles.brandLine
                        }
                    />

                    <p
                        className={
                            styles.copyright
                        }
                    >
                        {currentContent.copyright}
                    </p>

                </div>

                {/* =================================================
                    RIGHT
                ================================================= */}

                <div className={styles.right}>

                    {/* SOCIALS */}

                    <div
                        className={
                            styles.socials
                        }
                    >
                        <a
                            href="https://www.instagram.com/ty_kraso_beauty_studio_"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className={
                                styles.social
                            }
                        >
                            <FaInstagram
                                size={18}
                            />
                        </a>
                    </div>

                    {/* =================================================
                        LINKS
                    ================================================= */}

                    <div
                        className={
                            styles.locationLinks
                        }
                    >

                        {/* GOOGLE MAPS */}

                        <a
                            href="https://maps.app.goo.gl/u2ZZ69iwY5mVunEX9?g_st=it"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={
                                styles.locationCard
                            }
                        >
                            <span
                                className={
                                    styles.locationIcon
                                }
                            >
                                <FaMapLocationDot />
                            </span>

                            <span
                                className={
                                    styles.locationText
                                }
                            >
                                <small>
                                    {
                                        currentContent.findUs
                                    }
                                </small>

                                <strong>
                                    {
                                        currentContent.mapText
                                    }
                                </strong>
                            </span>

                            <span
                                className={
                                    styles.locationArrow
                                }
                            >
                                <FaArrowUpRightFromSquare />
                            </span>
                        </a>

                        {/* SECOND LINK */}

                        <a
                            href="https://share.google/MgiNTrPEfHoxCG6xm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={
                                styles.locationCard
                            }
                        >
                            <span
                                className={
                                    styles.locationIcon
                                }
                            >
                                <FaArrowUpRightFromSquare />
                            </span>

                            <span
                                className={
                                    styles.locationText
                                }
                            >
                                <small>
                                    TY KRASO
                                </small>

                                <strong>
                                    {
                                        currentContent.infoText
                                    }
                                </strong>
                            </span>

                            <span
                                className={
                                    styles.locationArrow
                                }
                            >
                                ↗
                            </span>
                        </a>

                    </div>

                    {/* =================================================
                        BOOK BUTTON
                    ================================================= */}

                    <Link
                        href="#contact"
                        className={
                            styles.contact
                        }
                    >
                        <span>
                            {
                                currentContent.button
                            }
                        </span>

                        <span
                            className={
                                styles.contactArrow
                            }
                        >
                            ↗
                        </span>
                    </Link>

                </div>

            </div>

            {/* =================================================
                BOTTOM LINE
            ================================================= */}

            <div
                className={
                    styles.bottom
                }
            >
                <span />

                <div
                    className={
                        styles.bottomMark
                    }
                >
                    TK
                </div>

                <span />
            </div>

        </footer>
    );
}