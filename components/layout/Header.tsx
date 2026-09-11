"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
} from "react-icons/fa6";

import styles from "./Header.module.css";

type Language = "cs" | "en" | "uk";

const navigation = {
  cs: [
    { title: "Domů", href: "/" },
    { title: "O nás", href: "#about" },
    { title: "Služby", href: "#services" },
    { title: "Ceník", href: "#prices" },
    { title: "Galerie", href: "#gallery" },
    { title: "Kontakt", href: "#contact" },
  ],

  en: [
    { title: "Home", href: "/" },
    { title: "About us", href: "#about" },
    { title: "Services", href: "#services" },
    { title: "Prices", href: "#prices" },
    { title: "Gallery", href: "#gallery" },
    { title: "Contact", href: "#contact" },
  ],

  uk: [
    { title: "Головна", href: "/" },
    { title: "Про нас", href: "#about" },
    { title: "Послуги", href: "#services" },
    { title: "Ціни", href: "#prices" },
    { title: "Галерея", href: "#gallery" },
    { title: "Контакти", href: "#contact" },
  ],
};

const languageLabels = {
  cs: "CZ",
  en: "EN",
  uk: "UA",
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Завжди однакове значення під час SSR та першого render
  const [language, setLanguage] = useState<Language>("cs");

  // Після монтування читаємо з localStorage
  useEffect(() => {
    const saved = localStorage.getItem(
      "ty-kraso-language"
    ) as Language | null;

    if (
      saved === "cs" ||
      saved === "en" ||
      saved === "uk"
    ) {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  const changeLanguage = (
    newLanguage: Language
  ) => {
    localStorage.setItem(
      "ty-kraso-language",
      newLanguage
    );

    window.location.reload();
  };

  return (
    <header
      className={`${styles.header} ${
        isScrolled
          ? styles.headerScrolled
          : ""
      }`}
    >
      <div className={styles.container}>

        {/* =========================
            LOGO
        ========================== */}

        <Link
          href="/"
          className={styles.logo}
        >
          <Image
            src="/images/LogoTY.png"
            alt="Ty Kraso Beauty Studio"
            width={56}
            height={56}
            priority
          />

          <div className={styles.logoText}>
            <h2>TY KRASO</h2>
            <span>BEAUTY STUDIO</span>
          </div>
        </Link>

        {/* =========================
            NAVIGATION
        ========================== */}

        <nav className={styles.navigation}>
          {navigation[language].map(
            (item) => (
              <Link
                key={item.href}
                href={item.href}
              >
                {item.title}
              </Link>
            )
          )}
        </nav>

        {/* =========================
            ACTIONS
        ========================== */}

        <div className={styles.actions}>

          {/* SOCIALS */}

          <div className={styles.socials}>

            <a
              href="https://www.instagram.com/ty_kraso_beauty_studio_"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </a>

            {/* <a
              href="#"
              aria-label="Facebook"
            >
              <FaFacebookF size={18} />
            </a> */}

            {/* <a
              href="#"
              aria-label="TikTok"
            >
              <FaTiktok size={18} />
            </a> */}

          </div>

          {/* LANGUAGES */}

          <div className={styles.languages}>

            {(
              Object.keys(
                languageLabels
              ) as Language[]
            ).map((item) => (

              <button
                key={item}
                type="button"
                className={
                  language === item
                    ? styles.languageActive
                    : styles.language
                }
                onClick={() =>
                  changeLanguage(item)
                }
              >
                {languageLabels[item]}
              </button>

            ))}

          </div>

          {/* BOOKING BUTTON */}

          <Link
            href="#contact"
            className={styles.button}
          >
            {language === "cs"
              ? "Objednat se"
              : language === "en"
                ? "Book now"
                : "Записатися"}
          </Link>

        </div>

      </div>
    </header>
  );
}