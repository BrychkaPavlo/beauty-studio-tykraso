"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import styles from "./Contact.module.css";

type Language = "cs" | "en" | "uk";

interface SelectedProcedure {
    category: string;
    name: string;
    price: string;
}

const content = {
    cs: {
        subtitle: "KONTAKT",

        title: (
            <>
                Objednejte se
                <br />
                na konzultaci
            </>
        ),

        description:
            "Ozveme se vám co nejdříve a pomůžeme vám vybrat vhodnou proceduru.",

        phone: "Telefon",
        email: "E-mail",
        address: "Adresa",

        city:
            "Pražská 523 541 01 Trutnov",

        name: "Vaše jméno",

        namePlaceholder:
            "Zadejte své jméno",

        phonePlaceholder:
            "+420...",

        message:
            "Komentář",

        messagePlaceholder:
            "Váš komentář",

        button:
            "Odeslat žádost",

        nameError:
            "Zadejte jméno",

        phoneError:
            "Zadejte telefon",

        success:
            "Děkujeme! Vaše žádost byla úspěšně odeslána.",

        error:
            "Žádost se nepodařilo odeslat. Zkuste to prosím znovu.",

        submitError:
            "Žádost se nepodařilo odeslat",
    },

    en: {
        subtitle: "CONTACT",

        title: (
            <>
                Book a
                <br />
                consultation
            </>
        ),

        description:
            "We will contact you as soon as possible and help you choose the right treatment.",

        phone: "Phone",
        email: "Email",
        address: "Address",

        city:
            "Pražská 523 541 01 Trutnov",

        name:
            "Your name",

        namePlaceholder:
            "Enter your name",

        phonePlaceholder:
            "+420...",

        message:
            "Comment",

        messagePlaceholder:
            "Your comment",

        button:
            "Send request",

        nameError:
            "Enter your name",

        phoneError:
            "Enter your phone number",

        success:
            "Thank you! Your request has been successfully sent.",

        error:
            "The request could not be sent. Please try again.",

        submitError:
            "The request could not be sent",
    },

    uk: {
        subtitle:
            "КОНТАКТИ",

        title: (
            <>
                Запишіться
                <br />
                на консультацію
            </>
        ),

        description:
            "Ми зв'яжемося з вами найближчим часом та допоможемо обрати процедуру.",

        phone:
            "Телефон",

        email:
            "Email",

        address:
            "Адреса",

        city:
            "Pražská 523 541 01 Trutnov",

        name:
            "Ваше ім'я",

        namePlaceholder:
            "Введіть ваше ім'я",

        phonePlaceholder:
            "+420...",

        message:
            "Коментар",

        messagePlaceholder:
            "Ваш коментар",

        button:
            "Надіслати заявку",

        nameError:
            "Введіть ім'я",

        phoneError:
            "Введіть телефон",

        success:
            "Дякуємо! Вашу заявку успішно надіслано.",

        error:
            "Не вдалося надіслати заявку. Спробуйте ще раз.",

        submitError:
            "Не вдалося надіслати заявку",
    },
};

export default function Contact() {
    const [language, setLanguage] =
        useState<Language>("cs");

    /*
     * contactAnimationKey змінюється
     * ТІЛЬКИ коли клієнт вибирає процедуру.
     */

    const [
        contactAnimationKey,
        setContactAnimationKey,
    ] = useState(0);

    /*
     * =====================================================
     * LANGUAGE
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
            setLanguage(
                savedLanguage
            );
        }
    }, []);

    const currentContent =
        content[language];

    /*
     * =====================================================
     * FORM SCHEMA
     * =====================================================
     */

    const schema = z.object({
        name: z
            .string()
            .min(
                2,
                currentContent.nameError
            ),

        phone: z
            .string()
            .min(
                8,
                currentContent.phoneError
            ),

        message:
            z.string().optional(),
    });

    type FormData =
        z.infer<typeof schema>;

    /*
     * =====================================================
     * FORM
     * =====================================================
     */

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
        reset,
        setValue,
    } = useForm<FormData>({
        resolver:
            zodResolver(schema),

        defaultValues: {
            name: "",
            phone: "",
            message: "",
        },
    });

    /*
     * =====================================================
     * BUILD MESSAGE
     * =====================================================
     */

    const createMessage =
        useCallback(
            (
                procedure: SelectedProcedure
            ) => {
                if (
                    language ===
                    "uk"
                ) {
                    return `Хочу записатися до ${procedure.category.toLowerCase()} на ${procedure.name} з вартістю ${procedure.price}.`;
                }

                if (
                    language ===
                    "cs"
                ) {
                    return `Chci se objednat do ${procedure.category.toLowerCase()} na ${procedure.name} za cenu ${procedure.price}.`;
                }

                return `I would like to book ${procedure.category.toLowerCase()} for ${procedure.name} for the price of ${procedure.price}.`;
            },
            [language]
        );

    /*
     * =====================================================
     * LOAD SELECTED PROCEDURE
     * =====================================================
     */

    const loadSelectedProcedure =
        useCallback(() => {
            const stored =
                sessionStorage.getItem(
                    "ty-kraso-selected-procedure"
                );

            if (!stored) {
                return;
            }

            try {
                const procedure =
                    JSON.parse(
                        stored
                    ) as SelectedProcedure;

                /*
                 * Вставляємо повідомлення
                 * в textarea.
                 */

                setValue(
                    "message",
                    createMessage(
                        procedure
                    ),
                    {
                        shouldDirty:
                            true,
                        shouldTouch:
                            true,
                    }
                );

                /*
                 * Перезапускаємо
                 * тільки Contact.
                 */

                setContactAnimationKey(
                    (previous) =>
                        previous + 1
                );

                /*
                 * Видаляємо після використання,
                 * щоб при звичайному оновленні
                 * сторінки Contact не запускався.
                 */

                sessionStorage.removeItem(
                    "ty-kraso-selected-procedure"
                );
            } catch (error) {
                console.error(
                    "Unable to load selected procedure:",
                    error
                );
            }
        }, [
            createMessage,
            setValue,
        ]);

    /*
     * =====================================================
     * PROCEDURE EVENT
     * =====================================================
     */

    useEffect(() => {
        const handleProcedureSelected =
            () => {
                loadSelectedProcedure();
            };

        window.addEventListener(
            "ty-kraso-procedure-selected",
            handleProcedureSelected
        );

        return () => {
            window.removeEventListener(
                "ty-kraso-procedure-selected",
                handleProcedureSelected
            );
        };
    }, [
        loadSelectedProcedure,
    ]);

    /*
     * =====================================================
     * SUBMIT
     * =====================================================
     */

    const onSubmit =
        async (
            data: FormData
        ) => {
            try {
                const response =
                    await fetch(
                        "/api/contact",
                        {
                            method:
                                "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",
                            },

                            body:
                                JSON.stringify(
                                    data
                                ),
                        }
                    );

                if (
                    !response.ok
                ) {
                    throw new Error(
                        currentContent.submitError
                    );
                }

                reset();

                alert(
                    currentContent.success
                );
            } catch (
                error
            ) {
                console.error(
                    error
                );

                alert(
                    currentContent.error
                );
            }
        };

    /*
     * =====================================================
     * RENDER
     * =====================================================
     */

    return (
        <section
            id="contact"
            className={
                styles.contact
            }
        >
            <div
                className={
                    styles.container
                }
            >

                {/* =================================================
                    INFO
                ================================================== */}

                <motion.div
                    className={
                        styles.info
                    }
                    initial={{
                        opacity: 0,
                        x: -40,
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
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
                        className={
                            styles.subtitle
                        }
                    >
                        {
                            currentContent.subtitle
                        }
                    </span>

                    <h2
                        className={
                            styles.title
                        }
                    >
                        {
                            currentContent.title
                        }
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

                    <div
                        className={
                            styles.details
                        }
                    >

                        {/* PHONE */}

                        <div
                            className={
                                styles.detail
                            }
                        >
                            <span
                                className={
                                    styles.label
                                }
                            >
                                {
                                    currentContent.phone
                                }
                            </span>

                            <a
                                href="tel:+420605833655"
                            >
                                +420 605 833 655
                            </a>
                        </div>

                        {/* EMAIL */}

                        <div
                            className={
                                styles.detail
                            }
                        >
                            <span
                                className={
                                    styles.label
                                }
                            >
                                {
                                    currentContent.email
                                }
                            </span>

                            <a
                                href="mailto:kabrilaser@gmail.com"
                            >
                                kabrilaser@gmail.com
                            </a>
                        </div>

                        {/* ADDRESS */}

                        <div
                            className={
                                styles.detail
                            }
                        >
                            <span
                                className={
                                    styles.label
                                }
                            >
                                {
                                    currentContent.address
                                }
                            </span>

                            <span>
                                {
                                    currentContent.city
                                }
                            </span>
                        </div>

                    </div>

                </motion.div>

                {/* =================================================
                    FORM
                ================================================== */}

                <motion.form
                    key={
                        contactAnimationKey
                    }
                    onSubmit={
                        handleSubmit(
                            onSubmit
                        )
                    }
                    className={
                        styles.form
                    }

                    initial={{
                        opacity: 0,
                        y: 35,
                        scale: 0.98,
                    }}

                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                    }}

                    transition={{
                        duration: 0.7,
                        ease: [
                            0.22,
                            0.61,
                            0.36,
                            1,
                        ],
                    }}
                >

                    {/* =================================================
                        NAME
                    ================================================== */}

                    <div
                        className={
                            styles.field
                        }
                    >
                        <label
                            htmlFor="name"
                        >
                            {
                                currentContent.name
                            }
                        </label>

                        <input
                            id="name"
                            type="text"
                            placeholder={
                                currentContent.namePlaceholder
                            }
                            {...register(
                                "name"
                            )}
                        />

                        {errors.name && (
                            <span
                                className={
                                    styles.error
                                }
                            >
                                {
                                    errors
                                        .name
                                        .message
                                }
                            </span>
                        )}
                    </div>

                    {/* =================================================
                        PHONE
                    ================================================== */}

                    <div
                        className={
                            styles.field
                        }
                    >
                        <label
                            htmlFor="phone"
                        >
                            {
                                currentContent.phone
                            }
                        </label>

                        <input
                            id="phone"
                            type="tel"
                            placeholder={
                                currentContent.phonePlaceholder
                            }
                            {...register(
                                "phone"
                            )}
                        />

                        {errors.phone && (
                            <span
                                className={
                                    styles.error
                                }
                            >
                                {
                                    errors
                                        .phone
                                        .message
                                }
                            </span>
                        )}
                    </div>

                    {/* =================================================
                        MESSAGE
                    ================================================== */}

                    <div
                        className={
                            styles.field
                        }
                    >
                        <label
                            htmlFor="message"
                        >
                            {
                                currentContent.message
                            }
                        </label>

                        <textarea
                            id="message"
                            rows={5}
                            placeholder={
                                currentContent.messagePlaceholder
                            }
                            {...register(
                                "message"
                            )}
                        />
                    </div>

                    {/* =================================================
                        SUBMIT
                    ================================================== */}

                    <button
                        type="submit"
                        className={
                            styles.button
                        }
                    >
                        {
                            currentContent.button
                        }
                    </button>

                </motion.form>

            </div>
        </section>
    );
}