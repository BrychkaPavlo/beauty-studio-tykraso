
"use client";

import { useEffect, useState } from "react";
import styles from "./GiftVouchers.module.css";

type Language = "cs" | "en" | "uk";

const translations = {
  cs: {
    eyebrow: "MALÝ DÁREK, VELKÁ RADOST",
    title: "Dárkové poukazy",
    description:
      "Darujte krásu, péči a chvíle odpočinku.",
    cardLabel: "DÁRKOVÝ POUKAZ",
    voucherTitle: "Péče dle vlastního výběru",
    voucherDescription:
      "Darujte možnost vybrat si péči podle vlastního přání.",
    voucherButton: "Koupit poukaz",
    catalogTitle: "Objevte všechny poukazy",
    catalogDescription:
      "Prohlédněte si kompletní nabídku dárkových poukazů TY KRASO.",
    catalogButton: "Zobrazit všechny poukazy",
    note: "Nákup a platba probíhají na stránkách VášPoukaz.",
  },
  en: {
    eyebrow: "A SMALL GIFT, A BIG JOY",
    title: "Gift Vouchers",
    description:
      "Give the gift of beauty, care and moments of relaxation.",
    cardLabel: "GIFT VOUCHER",
    voucherTitle: "Care of Your Choice",
    voucherDescription:
      "Give someone the freedom to choose the beauty treatment they love.",
    voucherButton: "Buy a voucher",
    catalogTitle: "Discover all vouchers",
    catalogDescription:
      "Explore the complete collection of TY KRASO gift vouchers.",
    catalogButton: "View all vouchers",
    note: "Purchases and payments are completed on the VášPoukaz website.",
  },
  uk: {
    eyebrow: "МАЛЕНЬКИЙ ПОДАРУНОК — ВЕЛИКА РАДІСТЬ",
    title: "Подарункові сертифікати",
    description:
      "Подаруйте красу, турботу та хвилини відпочинку.",
    cardLabel: "ПОДАРУНКОВИЙ СЕРТИФІКАТ",
    voucherTitle: "Догляд на власний вибір",
    voucherDescription:
      "Подаруйте можливість обрати процедуру відповідно до власних побажань.",
    voucherButton: "Придбати сертифікат",
    catalogTitle: "Відкрийте всі сертифікати",
    catalogDescription:
      "Перегляньте повний каталог подарункових сертифікатів TY KRASO.",
    catalogButton: "Переглянути каталог",
    note: "Оформлення замовлення та оплата відбуваються на сайті VášPoukaz.",
  },
} as const;

const VOUCHER_URL =
  "https://ty-kraso-beauty-studio.vaspoukaz.cz/pece-dle-vlastniho-vyberu";

const CATALOG_URL =
  "https://ty-kraso-beauty-studio.vaspoukaz.cz/";

export default function GiftVouchers() {
  const [language, setLanguage] = useState<Language>("cs");

  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      "ty-kraso-language"
    );

    if (
      savedLanguage === "cs" ||
      savedLanguage === "en" ||
      savedLanguage === "uk"
    ) {
      setLanguage(savedLanguage);
    }
  }, []);

  const content = translations[language];

  return (
    <section
      id="gift-vouchers"
      className={styles.section}
    >
      <div className={styles.container}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>
            {content.eyebrow}
          </span>

          <h2 className={styles.title}>
            {content.title}
          </h2>

          <span className={styles.titleLine} />

          <p className={styles.description}>
            {content.description}
          </p>
        </div>

        <div className={styles.content}>
          <article className={styles.voucherCard}>
            <div className={styles.cardFrame}>
              <div className={styles.cardTop}>
                <span className={styles.cardBrand}>
                  TY KRASO
                </span>

                <span className={styles.cardStudio}>
                  BEAUTY STUDIO
                </span>
              </div>

              <div className={styles.cardCenter}>
                <span className={styles.cardLabel}>
                  {content.cardLabel}
                </span>

                <span className={styles.cardOrnament}>
                  ✦
                </span>

                <h3 className={styles.cardTitle}>
                  {content.voucherTitle}
                </h3>
              </div>

              <div className={styles.cardBottom}>
                <span>BEAUTY · CARE · RELAX</span>
                <span className={styles.cardInitials}>
                  TK
                </span>
              </div>
            </div>

            <div className={styles.voucherInfo}>
              <span className={styles.voucherCategory}>
                TY KRASO BEAUTY STUDIO
              </span>

              <h3 className={styles.voucherTitle}>
                {content.voucherTitle}
              </h3>

              <p className={styles.voucherDescription}>
                {content.voucherDescription}
              </p>

              <a
                href={VOUCHER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryButton}
              >
                {content.voucherButton}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>

          <div className={styles.catalog}>
            <div className={styles.catalogOrnament}>
              <span>✧</span>
            </div>

            <h3>{content.catalogTitle}</h3>

            <p>{content.catalogDescription}</p>

            <a
              href={CATALOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryButton}
            >
              {content.catalogButton}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <p className={styles.note}>
          {content.note}
        </p>
      </div>
    </section>
  );
}
