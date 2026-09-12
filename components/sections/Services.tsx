"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import SectionTitle from "../ui/SectionTitle";
import styles from "./Services.module.css";

type Language = "cs" | "en" | "uk";

type Service = {
    title: string;
    name: string;
    procedures: string[];
    description: string;
    image: string;
};

const services: Record<Language, Service[]> = {
    /* =====================================================
       CZECH — MAIN LANGUAGE
    ===================================================== */

    cs: [
        {
            title: "Laserová epilace",
            name: "Brychka Kateryna",
            procedures: [
                "Laserové odstranění chloupků",
                "Elektroepilace",
                "Vosková depilace",
            ],
            description:
                "Profesionální laserová epilace, elektroepilace a vosková depilace v TY KRASO Beauty Studio v Trutnově. Moderní metody s důrazem na komfort, bezpečnost a individuální přístup.",
            image: "/images/services/1Cosmetology.png",
        },

        {
            title: "Kadeřnické služby",
            name: "Marina Minakova",
            procedures: [
                "Střih",
                "Barvení",
                "Styling",
            ],
            description:
                "Individuální péče o vlasy v Trutnově — moderní střihy, barvení a styling podle vašich představ a potřeb.",
            image: "/images/services/3Hairdressing.png",
        },

        {
            title: "Manikúra",
            name: "Elvina Ametka",
            procedures: [
                "Manikúra",
                "Péče o nehty",
                "Úprava nehtů",
            ],
            description:
                "Precizní manikúra a profesionální péče o nehty pro krásné a dokonale upravené ruce v příjemném prostředí TY KRASO.",
            image: "/images/services/2Manicure.png",
        },

        {
            title: "Masáž • Pedikúra",
            name: "Alena Vasylenko",
            procedures: [
                "Masáž",
                "Pedikúra",
            ],
            description:
                "Relaxace, regenerace a profesionální péče o tělo i chodidla. Dopřejte si chvíli odpočinku v TY KRASO Beauty Studio v Trutnově.",
            image: "/images/services/4Massage.png",
        },

        {
            title: "Kosmetika • Řasy • Obočí",
            name: "Liliia Bohosvitova",
            procedures: [
                "Kosmetika",
                "Řasy",
                "Obočí",
            ],
            description:
                "Komplexní kosmetická péče a zvýraznění přirozené krásy obličeje. Kosmetika, řasy a obočí s individuálním přístupem.",
            image: "/images/services/5Brows & Lashes.png",
        },
    ],

    /* =====================================================
       ENGLISH
    ===================================================== */

    en: [
        {
            title: "Laser Hair Removal",
            name: "Brychka Kateryna",
            procedures: [
                "Laser Hair Removal",
                "Electrolysis",
                "Waxing",
            ],
            description:
                "Professional laser hair removal, electrolysis and waxing at TY KRASO Beauty Studio in Trutnov. Modern methods with a focus on comfort, safety and individual care.",
            image: "/images/services/1Cosmetology.png",
        },

        {
            title: "Hairdressing",
            name: "Marina Minakova",
            procedures: [
                "Haircuts",
                "Coloring",
                "Styling",
            ],
            description:
                "Individual hair care in Trutnov — modern haircuts, coloring and styling tailored to your preferences and needs.",
            image: "/images/services/3Hairdressing.png",
        },

        {
            title: "Manicure",
            name: "Elvina Ametka",
            procedures: [
                "Manicure",
                "Nail Care",
                "Nail Shaping",
            ],
            description:
                "Precise manicure and professional nail care for beautiful and perfectly groomed hands in the comfortable TY KRASO environment.",
            image: "/images/services/2Manicure.png",
        },

        {
            title: "Massage • Pedicure",
            name: "Alena Vasylenko",
            procedures: [
                "Massage",
                "Pedicure",
            ],
            description:
                "Relaxation, regeneration and professional care for your body and feet at TY KRASO Beauty Studio in Trutnov.",
            image: "/images/services/4Massage.png",
        },

        {
            title: "Beauty • Lashes • Brows",
            name: "Liliia Bohosvitova",
            procedures: [
                "Cosmetology",
                "Lashes",
                "Brows",
            ],
            description:
                "Comprehensive beauty care designed to enhance your natural features, including cosmetics, lashes and brows.",
            image: "/images/services/5Brows & Lashes.png",
        },
    ],

    /* =====================================================
       UKRAINIAN
    ===================================================== */

    uk: [
        {
            title: "Лазерна епіляція",
            name: "Бричка Катерина",
            procedures: [
                "Лазерне видалення волосся",
                "Електроепіляція",
                "Воскова депіляція",
            ],
            description:
                "Професійна лазерна епіляція, електроепіляція та воскова депіляція у TY KRASO Beauty Studio в Трутнові. Сучасні методи з увагою до комфорту, безпеки та індивідуального підходу.",
            image: "/images/services/1Cosmetology.png",
        },

        {
            title: "Перукарські послуги",
            name: "Марина Мінакова",
            procedures: [
                "Стрижка",
                "Фарбування",
                "Укладка",
            ],
            description:
                "Індивідуальний догляд за волоссям у Трутнові — сучасні стрижки, фарбування та укладки відповідно до ваших побажань.",
            image: "/images/services/3Hairdressing.png",
        },

        {
            title: "Манікюр",
            name: "Ельвіна Аметка",
            procedures: [
                "Манікюр",
                "Догляд за нігтями",
                "Форма нігтів",
            ],
            description:
                "Точний манікюр та професійний догляд за нігтями для красивих і бездоганно доглянутих рук у TY KRASO.",
            image: "/images/services/2Manicure.png",
        },

        {
            title: "Масаж • Педикюр",
            name: "Олена Василенко",
            procedures: [
                "Масаж",
                "Педикюр",
            ],
            description:
                "Релакс, відновлення та професійна турбота про тіло й стопи у TY KRASO Beauty Studio в Трутнові.",
            image: "/images/services/4Massage.png",
        },

        {
            title: "Косметологія • Вії • Брови",
            name: "Лілія Богосвітова",
            procedures: [
                "Косметологія",
                "Вії",
                "Брови",
            ],
            description:
                "Комплексний косметологічний догляд та підкреслення природної краси обличчя, вій і брів.",
            image: "/images/services/5Brows & Lashes.png",
        },
    ],
};

const sectionContent = {
    cs: {
        subtitle: "SLUŽBY",
        title: "Naše služby",
        description:
        "Objevte profesionální kosmetické služby v TY KRASO Beauty Studio v Trutnově.",
    },

    en: {
        subtitle: "SERVICES",
        title: "Our services",
        description:
            "Discover professional beauty services at TY KRASO Beauty Studio in Trutnov.",
    },

    uk: {
        subtitle: "ПОСЛУГИ",
        title: "Наші послуги",
        description:
            "Відкрийте для себе професійні beauty-послуги у TY KRASO Beauty Studio в Трутнові.",
    },
};

export default function Services() {
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

    const currentServices =
        services[language];

    const currentContent =
        sectionContent[language];

    /*
     * =====================================================
     * RENDER
     * =====================================================
     */

    return (
        <section
            id="services"
            className={styles.services}
            aria-labelledby="services-title"
        >
            <div className={styles.container}>

                {/* =================================================
                    SECTION TITLE
                ================================================== */}

                <SectionTitle
                    subtitle={
                        currentContent.subtitle
                    }
                    title={
                        currentContent.title
                    }
                    center
                />

                {/* =================================================
                    SEO DESCRIPTION
                ================================================== */}

                <p
                    id="services-title"
                    className={styles.sectionDescription}
                >
                    {
                        currentContent.description
                    }
                </p>

                {/* =================================================
                    SERVICES GRID
                ================================================== */}

                <div className={styles.grid}>

                    {currentServices.map(
                        (service, index) => (
                            <motion.article
                                key={`${service.name}-${service.title}`}
                                className={
                                    styles.card
                                }

                                initial={{
                                    opacity: 0,
                                    y: 45,
                                    scale: 0.98,
                                }}

                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                }}

                                transition={{
                                    duration: 0.8,
                                    delay:
                                        index * 0.1,
                                    ease: [
                                        0.22,
                                        0.61,
                                        0.36,
                                        1,
                                    ],
                                }}

                                viewport={{
                                    once: true,
                                    amount: 0.15,
                                }}
                            >
                                {/* =================================================
                                    IMAGE
                                ================================================== */}

                                <div
                                    className={
                                        styles.imageWrapper
                                    }
                                >
                                    <Image
                                        src={
                                            service.image
                                        }
                                        alt={`${service.title} — ${service.name} | TY KRASO Beauty Studio Trutnov`}
                                        fill
                                        sizes="
                                            (max-width: 768px) 100vw,
                                            (max-width: 1200px) 50vw,
                                            20vw
                                        "
                                        className={
                                            styles.image
                                        }
                                    />

                                    <div
                                        className={
                                            styles.imageOverlay
                                        }
                                        aria-hidden="true"
                                    />
                                </div>

                                {/* =================================================
                                    CONTENT
                                ================================================== */}

                                <div
                                    className={
                                        styles.content
                                    }
                                >
                                    {/* SERVICE CATEGORY */}

                                    <span
                                        className={
                                            styles.category
                                        }
                                    >
                                        {
                                            service.title
                                        }
                                    </span>

                                    {/* MASTER */}

                                    <h3
                                        className={
                                            styles.name
                                        }
                                    >
                                        {
                                            service.name
                                        }
                                    </h3>

                                    {/* PROCEDURES */}

                                    <div
                                        className={
                                            styles.procedures
                                        }
                                        aria-label={
                                            language ===
                                            "cs"
                                                ? "Nabízené procedury"
                                                : language ===
                                                    "en"
                                                    ? "Available treatments"
                                                    : "Доступні процедури"
                                        }
                                    >
                                        {service.procedures.map(
                                            (
                                                procedure
                                            ) => (
                                                <span
                                                    key={
                                                        procedure
                                                    }
                                                    className={
                                                        styles.procedure
                                                    }
                                                >
                                                    {
                                                        procedure
                                                    }
                                                </span>
                                            )
                                        )}
                                    </div>

                                    {/* DESCRIPTION */}

                                    <p
                                        className={
                                            styles.description
                                        }
                                    >
                                        {
                                            service.description
                                        }
                                    </p>
                                </div>
                            </motion.article>
                        )
                    )}

                </div>
            </div>
        </section>
    );
}