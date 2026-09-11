"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import SectionTitle from "../ui/SectionTitle";
import styles from "./Gallery.module.css";

type Language = "cs" | "en" | "uk";

interface GalleryImage {
    src: string;
    name: string;
}

interface GalleryCategory {
    id: string;
    title: string;
    images: GalleryImage[];
}

const content = {
    cs: {
        subtitle: "Galerie",
        title: "Naše práce",
        open: "Prohlédnout galerii",
        close: "Zavřít",
        empty: "Galerie se připravuje",
    },

    en: {
        subtitle: "Gallery",
        title: "Our work",
        open: "View gallery",
        close: "Close",
        empty: "Gallery coming soon",
    },

    uk: {
        subtitle: "Галерея",
        title: "Наші роботи",
        open: "Переглянути роботи",
        close: "Закрити",
        empty: "Галерея готується",
    },
};

const categoryTitles: Record<
    string,
    Record<Language, string>
> = {
    laser: {
        uk: "Лазерна епіляція",
        cs: "Laserová epilace",
        en: "Laser Hair Removal",
    },

    hair: {
        uk: "Перукар",
        cs: "Kadeřnictví",
        en: "Hairdressing",
    },

    depilation: {
        uk: "Депіляція",
        cs: "Depilace",
        en: "Waxing",
    },

    massage: {
        uk: "Масаж",
        cs: "Masáže",
        en: "Massage",
    },

    pedicure: {
        uk: "Педикюр",
        cs: "Pedikúra",
        en: "Pedicure",
    },

    manicure: {
        uk: "Манікюр",
        cs: "Manikúra",
        en: "Manicure",
    },

    lashes: {
        uk: "Вії та брови",
        cs: "Řasy a obočí",
        en: "Lashes & Brows",
    },
};

const categoryOrder = [
    "laser",
    "hair",
    "depilation",
    "massage",
    "pedicure",
    "manicure",
    "lashes",
];

export default function Gallery() {
    const [language, setLanguage] =
        useState<Language>("cs");

    const [categories, setCategories] =
        useState<GalleryCategory[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [activeCategory, setActiveCategory] =
        useState<GalleryCategory | null>(null);

    const [activeImage, setActiveImage] =
        useState(0);

    /*
    |--------------------------------------------------------------------------
    | LANGUAGE
    |--------------------------------------------------------------------------
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

    /*
    |--------------------------------------------------------------------------
    | LOAD GALLERY
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const loadGallery = async () => {
            try {
                setLoading(true);

                const response =
                    await fetch(
                        "/api/gallery",
                        {
                            cache: "no-store",
                        }
                    );

                if (!response.ok) {
                    throw new Error(
                        "Gallery loading failed"
                    );
                }

                const data =
                    await response.json();

                const ordered =
                    categoryOrder
                        .map((id) =>
                            data.find(
                                (
                                    category: GalleryCategory
                                ) =>
                                    category.id ===
                                    id
                            )
                        )
                        .filter(Boolean);

                setCategories(ordered);
            } catch (error) {
                console.error(
                    "Gallery error:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadGallery();
    }, []);

    /*
    |--------------------------------------------------------------------------
    | OPEN BOOK
    |--------------------------------------------------------------------------
    */

    const openGallery = (
        category: GalleryCategory
    ) => {
        if (!category.images.length) {
            return;
        }

        setActiveCategory(category);
        setActiveImage(0);

        document.body.style.overflow =
            "hidden";
    };

    /*
    |--------------------------------------------------------------------------
    | CLOSE BOOK
    |--------------------------------------------------------------------------
    */

    const closeGallery = () => {
        setActiveCategory(null);
        setActiveImage(0);

        document.body.style.overflow =
            "";
    };

    /*
    |--------------------------------------------------------------------------
    | NEXT IMAGE
    |--------------------------------------------------------------------------
    */

    const nextImage = () => {
        if (!activeCategory) {
            return;
        }

        setActiveImage(
            (current) =>
                (current + 1) %
                activeCategory.images.length
        );
    };

    /*
    |--------------------------------------------------------------------------
    | PREVIOUS IMAGE
    |--------------------------------------------------------------------------
    */

    const previousImage = () => {
        if (!activeCategory) {
            return;
        }

        setActiveImage(
            (current) =>
                (current -
                    1 +
                    activeCategory.images.length) %
                activeCategory.images.length
        );
    };

    /*
    |--------------------------------------------------------------------------
    | KEYBOARD
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!activeCategory) {
            return;
        }

        const handleKeyboard = (
            event: KeyboardEvent
        ) => {
            if (event.key === "Escape") {
                closeGallery();
            }

            if (event.key === "ArrowRight") {
                nextImage();
            }

            if (event.key === "ArrowLeft") {
                previousImage();
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyboard
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyboard
            );
        };
    }, [activeCategory]);

    /*
    |--------------------------------------------------------------------------
    | CLEANUP
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        return () => {
            document.body.style.overflow =
                "";
        };
    }, []);

    const currentContent =
        content[language];

    return (
        <>
            <section
                id="gallery"
                className={styles.gallery}
            >
                <div
                    className={
                        styles.container
                    }
                >
                    <SectionTitle
                        subtitle={
                            currentContent.subtitle
                        }
                        title={
                            currentContent.title
                        }
                        center
                    />

                    {loading ? (
                        <div
                            className={
                                styles.loading
                            }
                        >
                            <span />
                            <span />
                            <span />
                        </div>
                    ) : (
                        <div
                            className={
                                styles.books
                            }
                        >
                            {categories.map(
                                (
                                    category,
                                    index
                                ) => {
                                    const firstImage =
                                        category
                                            .images[0]
                                            ?.src;

                                    const imageCount =
                                        category
                                            .images
                                            .length;

                                    return (
                                        <motion.article
                                            key={
                                                category.id
                                            }
                                            className={
                                                styles.book
                                            }
                                            initial={{
                                                opacity: 0,
                                                y: 30,
                                            }}
                                            whileInView={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            viewport={{
                                                once: true,
                                                amount: 0.1,
                                            }}
                                            transition={{
                                                duration: 0.7,
                                                delay:
                                                    index *
                                                    0.06,
                                                ease: [
                                                    0.22,
                                                    0.61,
                                                    0.36,
                                                    1,
                                                ],
                                            }}
                                            whileHover={{
                                                y: -8,
                                                transition:
                                                    {
                                                        duration:
                                                            0.35,
                                                        ease: "easeOut",
                                                    },
                                            }}
                                            onClick={() =>
                                                openGallery(
                                                    category
                                                )
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.bookInner
                                                }
                                            >
                                                {/* BOOK COVER */}

                                                <div
                                                    className={
                                                        styles.cover
                                                    }
                                                >
                                                    {firstImage ? (
                                                        <Image
                                                            src={
                                                                firstImage
                                                            }
                                                            alt={
                                                                categoryTitles[
                                                                    category
                                                                        .id
                                                                ][
                                                                    language
                                                                ]
                                                            }
                                                            fill
                                                            sizes="
                                                                (max-width: 768px) 90vw,
                                                                (max-width: 1200px) 45vw,
                                                                30vw
                                                            "
                                                            className={
                                                                styles.coverImage
                                                            }
                                                        />
                                                    ) : (
                                                        <div
                                                            className={
                                                                styles.emptyCover
                                                            }
                                                        >
                                                            TY KRASO
                                                        </div>
                                                    )}

                                                    <div
                                                        className={
                                                            styles.coverOverlay
                                                        }
                                                    />

                                                    <div
                                                        className={
                                                            styles.coverContent
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                styles.coverLogo
                                                            }
                                                        >
                                                            TK
                                                        </div>

                                                        <div
                                                            className={
                                                                styles.coverLine
                                                            }
                                                        />

                                                        <h3>
                                                            {
                                                                categoryTitles[
                                                                    category
                                                                        .id
                                                                ][
                                                                    language
                                                                ]
                                                            }
                                                        </h3>

                                                        <span>
                                                            TY KRASO
                                                            <br />
                                                            BEAUTY
                                                            STUDIO
                                                        </span>
                                                    </div>

                                                    <div
                                                        className={
                                                            styles.photoCount
                                                        }
                                                    >
                                                        {imageCount}
                                                    </div>
                                                </div>

                                                {/* HOVER PAGE */}

                                                <div
                                                    className={
                                                        styles.bookPage
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.pageDecor
                                                        }
                                                    />

                                                    <div
                                                        className={
                                                            styles.pageText
                                                        }
                                                    >
                                                        <span>
                                                            TY KRASO
                                                            BEAUTY
                                                            STUDIO
                                                        </span>

                                                        <strong>
                                                            {
                                                                categoryTitles[
                                                                    category
                                                                        .id
                                                                ][
                                                                    language
                                                                ]
                                                            }
                                                        </strong>

                                                        <small>
                                                            {
                                                                currentContent.open
                                                            }
                                                        </small>
                                                    </div>

                                                    <div
                                                        className={
                                                            styles.pageNumber
                                                        }
                                                    >
                                                        {String(
                                                            index +
                                                                1
                                                        ).padStart(
                                                            2,
                                                            "0"
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.article>
                                    );
                                }
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* =====================================================
                FULLSCREEN GALLERY
            ====================================================== */}

            <AnimatePresence>
                {activeCategory && (
                    <motion.div
                        className={
                            styles.lightbox
                        }
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        onClick={
                            closeGallery
                        }
                    >
                        <motion.div
                            className={
                                styles.viewer
                            }
                            initial={{
                                opacity: 0,
                                scale: 0.94,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.94,
                                y: 20,
                            }}
                            transition={{
                                duration: 0.4,
                                ease: [
                                    0.22,
                                    0.61,
                                    0.36,
                                    1,
                                ],
                            }}
                            onClick={(event) =>
                                event.stopPropagation()
                            }
                        >
                            {/* CLOSE */}

                            <button
                                type="button"
                                className={
                                    styles.close
                                }
                                onClick={
                                    closeGallery
                                }
                                aria-label={
                                    currentContent.close
                                }
                            >
                                ×
                            </button>

                            {/* TITLE */}

                            <div
                                className={
                                    styles.viewerHeader
                                }
                            >
                                <span>
                                    TY KRASO
                                    BEAUTY STUDIO
                                </span>

                                <h3>
                                    {
                                        categoryTitles[
                                            activeCategory
                                                .id
                                        ][
                                            language
                                        ]
                                    }
                                </h3>
                            </div>

                            {/* IMAGE */}

                            <div
                                className={
                                    styles.viewerImage
                                }
                            >
                                <AnimatePresence
                                    mode="wait"
                                >
                                    <motion.div
                                        key={
                                            activeImage
                                        }
                                        className={
                                            styles.viewerImageInner
                                        }
                                        initial={{
                                            opacity: 0,
                                            scale: 0.98,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 1.02,
                                        }}
                                        transition={{
                                            duration: 0.35,
                                        }}
                                    >
                                        <Image
                                            src={
                                                activeCategory
                                                    .images[
                                                    activeImage
                                                ].src
                                            }
                                            alt={
                                                categoryTitles[
                                                    activeCategory
                                                        .id
                                                ][
                                                    language
                                                ]
                                            }
                                            fill
                                            sizes="90vw"
                                            className={
                                                styles.viewerPhoto
                                            }
                                            priority
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* CONTROLS */}

                            {activeCategory.images
                                .length >
                                1 && (
                                <>
                                    <button
                                        type="button"
                                        className={`${styles.arrow} ${styles.arrowLeft}`}
                                        onClick={
                                            previousImage
                                        }
                                        aria-label="Previous"
                                    >
                                        ‹
                                    </button>

                                    <button
                                        type="button"
                                        className={`${styles.arrow} ${styles.arrowRight}`}
                                        onClick={
                                            nextImage
                                        }
                                        aria-label="Next"
                                    >
                                        ›
                                    </button>
                                </>
                            )}

                            {/* FOOTER */}

                            <div
                                className={
                                    styles.viewerFooter
                                }
                            >
                                <span>
                                    {String(
                                        activeImage +
                                            1
                                    ).padStart(
                                        2,
                                        "0"
                                    )}
                                </span>

                                <div
                                    className={
                                        styles.progress
                                    }
                                >
                                    <div
                                        style={{
                                            width: `${
                                                ((activeImage +
                                                    1) /
                                                    activeCategory
                                                        .images
                                                        .length) *
                                                100
                                            }%`,
                                        }}
                                    />
                                </div>

                                <span>
                                    {String(
                                        activeCategory
                                            .images
                                            .length
                                    ).padStart(
                                        2,
                                        "0"
                                    )}
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}