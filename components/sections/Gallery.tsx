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
        description:
            "Prohlédněte si ukázky práce specialistů TY KRASO Beauty Studio v Trutnově.",
        open: "Prohlédnout galerii",
        close: "Zavřít",
        empty: "Galerie se připravuje",
        previous: "Předchozí fotografie",
        next: "Další fotografie",
        treatments: "Procedury",
    },

    en: {
        subtitle: "Gallery",
        title: "Our work",
        description:
            "Explore examples of work by the specialists at TY KRASO Beauty Studio in Trutnov.",
        open: "View gallery",
        close: "Close",
        empty: "Gallery coming soon",
        previous: "Previous photo",
        next: "Next photo",
        treatments: "Treatments",
    },

    uk: {
        subtitle: "Галерея",
        title: "Наші роботи",
        description:
            "Перегляньте приклади робіт спеціалістів TY KRASO Beauty Studio у Трутнові.",
        open: "Переглянути роботи",
        close: "Закрити",
        empty: "Галерея готується",
        previous: "Попереднє фото",
        next: "Наступне фото",
        treatments: "Процедури",
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
    | OPEN GALLERY
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
    | CLOSE GALLERY
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

    /*
    |--------------------------------------------------------------------------
    | IMAGE ALT
    |--------------------------------------------------------------------------
    */

    const getImageAlt = (
        categoryId: string,
        imageName?: string
    ) => {
        const category =
            categoryTitles[categoryId]?.[
                language
            ] ?? "TY KRASO Beauty Studio";

        if (language === "cs") {
            return imageName
                ? `${category} — ${imageName} | TY KRASO Beauty Studio Trutnov`
                : `${category} | TY KRASO Beauty Studio v Trutnově`;
        }

        if (language === "en") {
            return imageName
                ? `${category} — ${imageName} | TY KRASO Beauty Studio Trutnov`
                : `${category} | TY KRASO Beauty Studio in Trutnov`;
        }

        return imageName
            ? `${category} — ${imageName} | TY KRASO Beauty Studio Trutnov`
            : `${category} | TY KRASO Beauty Studio у Трутнові`;
    };

    return (
        <>
            <section
                id="gallery"
                className={styles.gallery}
                aria-labelledby="gallery-title"
            >
                <div
                    className={
                        styles.container
                    }
                >
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

                    <p
                        id="gallery-title"
                        className={
                            styles.sectionDescription
                        }
                    >
                        {
                            currentContent.description
                        }
                    </p>

                    {loading ? (
                        <div
                            className={
                                styles.loading
                            }
                            aria-label={
                                language ===
                                "cs"
                                    ? "Načítání galerie"
                                    : language ===
                                        "en"
                                        ? "Loading gallery"
                                        : "Завантаження галереї"
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

                                    const categoryTitle =
                                        categoryTitles[
                                            category.id
                                        ]?.[
                                            language
                                        ] ??
                                        category.id;

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
                                        >
                                            <button
                                                type="button"
                                                className={
                                                    styles.bookInner
                                                }
                                                onClick={() =>
                                                    openGallery(
                                                        category
                                                    )
                                                }
                                                aria-label={`${currentContent.open}: ${categoryTitle}`}
                                            >
                                                {/* =================================================
                                                    BOOK COVER
                                                ================================================== */}

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
                                                            alt={getImageAlt(
                                                                category.id,
                                                                category
                                                                    .images[0]
                                                                    ?.name
                                                            )}
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
                                                        aria-hidden="true"
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
                                                                categoryTitle
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
                                                        aria-label={`${imageCount} ${currentContent.open}`}
                                                    >
                                                        {
                                                            imageCount
                                                        }
                                                    </div>
                                                </div>

                                                {/* =================================================
                                                    HOVER PAGE
                                                ================================================== */}

                                                <div
                                                    className={
                                                        styles.bookPage
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.pageDecor
                                                        }
                                                        aria-hidden="true"
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
                                                                categoryTitle
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
                                            </button>
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
                        role="dialog"
                        aria-modal="true"
                        aria-label={
                            categoryTitles[
                                activeCategory.id
                            ]?.[language]
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
                            {/* =================================================
                                CLOSE
                            ================================================== */}

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

                            {/* =================================================
                                TITLE
                            ================================================== */}

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
                                        ]?.[
                                            language
                                        ]
                                    }
                                </h3>
                            </div>

                            {/* =================================================
                                IMAGE
                            ================================================== */}

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
                                            alt={getImageAlt(
                                                activeCategory
                                                    .id,
                                                activeCategory
                                                    .images[
                                                    activeImage
                                                ]?.name
                                            )}
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

                            {/* =================================================
                                CONTROLS
                            ================================================== */}

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
                                        aria-label={
                                            currentContent.previous
                                        }
                                    >
                                        ‹
                                    </button>

                                    <button
                                        type="button"
                                        className={`${styles.arrow} ${styles.arrowRight}`}
                                        onClick={
                                            nextImage
                                        }
                                        aria-label={
                                            currentContent.next
                                        }
                                    >
                                        ›
                                    </button>
                                </>
                            )}

                            {/* =================================================
                                FOOTER
                            ================================================== */}

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