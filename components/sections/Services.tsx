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
       CZECH
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
                "Profesionální péče a moderní metody odstranění chloupků s důrazem na komfort a bezpečnost.",
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
                "Individuální péče o vlasy, moderní střihy, barvení a styling podle vašich představ.",
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
                "Precizní manikúra a profesionální péče pro krásné a dokonale upravené ruce.",
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
                "Relaxace, regenerace a profesionální péče o tělo i chodidla.",
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
                "Komplexní kosmetická péče a zvýraznění přirozené krásy obličeje.",
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
                "Professional care and modern hair removal methods with a focus on comfort and safety.",
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
                "Individual hair care, modern cuts, coloring and styling tailored to your preferences.",
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
                "Precise manicure and professional care for beautiful and perfectly groomed hands.",
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
                "Relaxation, regeneration and professional care for your body and feet.",
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
                "Comprehensive beauty care designed to enhance your natural features.",
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
                "Професійний догляд та сучасні методи видалення волосся з особливою увагою до комфорту та безпеки.",
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
                "Індивідуальний догляд за волоссям, сучасні стрижки, фарбування та укладки відповідно до ваших побажань.",
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
                "Точний манікюр та професійний догляд для красивих і бездоганно доглянутих рук.",
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
                "Релакс, відновлення та професійна турбота про тіло й стопи.",
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
                "Комплексний косметологічний догляд та підкреслення природної краси обличчя.",
            image: "/images/services/5Brows & Lashes.png",
        },
    ],
};

export default function Services() {
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

    const currentServices = services[language];

    const sectionContent = {
        cs: {
            subtitle: "Služby",
            title: "Naše služby",
        },

        en: {
            subtitle: "Services",
            title: "Our services",
        },

        uk: {
            subtitle: "Послуги",
            title: "Наші послуги",
        },
    };

    const currentContent =
        sectionContent[language];

    return (
        <section
            id="services"
            className={styles.services}
        >
            <div className={styles.container}>

                <SectionTitle
                    subtitle={
                        currentContent.subtitle
                    }
                    title={
                        currentContent.title
                    }
                    center
                />

                <div className={styles.grid}>

                    {currentServices.map(
                        (service, index) => (
                            <motion.article
                                key={service.name}
                                className={styles.card}
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
                                {/* IMAGE */}

                                <div
                                    className={
                                        styles.imageWrapper
                                    }
                                >
                                    <Image
                                        src={
                                            service.image
                                        }
                                        alt={
                                            service.title
                                        }
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
                                    />
                                </div>

                                {/* CONTENT */}

                                <div
                                    className={
                                        styles.content
                                    }
                                >
                                    <span
                                        className={
                                            styles.category
                                        }
                                    >
                                        {service.title}
                                    </span>

                                    <h3
                                        className={
                                            styles.name
                                        }
                                    >
                                        {service.name}
                                    </h3>

                                    {/* PROCEDURES */}

                                    <div
                                        className={
                                            styles.procedures
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