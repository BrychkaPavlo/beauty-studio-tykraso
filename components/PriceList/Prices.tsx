"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import SectionTitle from "../ui/SectionTitle";
import styles from "./PriceList.module.css";

type Language = "uk" | "cs" | "en";

interface PriceItem {
    name: string;
    price: string;
}

interface PriceCategory {
    id: string;
    title: string;
    items: PriceItem[];
}

const prices: Record<Language, PriceCategory[]> = {
    // ============================================================
    // UK
    // ============================================================

    uk: [
        {
            id: "laser",
            title: "Лазерна епіляція",
            items: [
                { name: "Пахви", price: "500 CZK / 15 хв" },
                { name: "Груди", price: "700 CZK / 20 хв" },
                { name: "Навколо сосків", price: "500 CZK / 15 хв" },
                { name: "Біла лінія живота", price: "500 CZK / 10 хв" },
                { name: "Живіт", price: "900 CZK / 30 хв" },
                { name: "Глибоке бікіні", price: "1 500 CZK / 35 хв" },
                { name: "Класичне бікіні", price: "1 100 CZK / 20 хв" },
                { name: "Сідниці", price: "1 100 CZK / 20 хв" },
                { name: "Стегна", price: "1 000 CZK / 30 хв" },
                { name: "Телята", price: "1 000 CZK / 20 хв" },
                { name: "Повні ноги", price: "2 000 CZK / 60 хв" },
                { name: "Стопи та пальці ніг", price: "400 CZK / 10 хв" },
                { name: "Fullback", price: "2 000 CZK / 45 хв" },
                { name: "Передпліччя", price: "900 CZK / 15 хв" },
                { name: "Повні руки", price: "1 200 CZK / 25 хв" },
                { name: "Пальці рук", price: "300 CZK / 10 хв" },
                { name: "Верхня губа", price: "300 CZK / 5 хв" },
                { name: "Борода", price: "600 CZK / 15 хв" },
                { name: "Шия", price: "600 CZK / 10 хв" },
            ],
        },

        // ========================================================
        // HAIR
        // ========================================================

        {
            id: "hair",
            title: "Перукарські послуги",
            items: [
                {
                    name: "Жіноча стрижка — коротке волосся",
                    price: "600 CZK",
                },
                {
                    name: "Жіноча стрижка — середня довжина",
                    price: "700 CZK",
                },
                {
                    name: "Жіноча стрижка — довге волосся",
                    price: "800 CZK",
                },
                {
                    name: "Підрізання кінчиків",
                    price: "500–700 CZK",
                },
                {
                    name: "Підрізання чолки",
                    price: "150–200 CZK",
                },
                {
                    name: "Чоловіча стрижка",
                    price: "350–400 CZK",
                },
                {
                    name: "Дитяча стрижка до 10 років",
                    price: "300 CZK",
                },
                {
                    name: "Миття волосся",
                    price: "+50–100 CZK",
                },
                {
                    name: "Пілінг + догляд за волоссям",
                    price: "700–1 500 CZK",
                },
                {
                    name: "Регенерація волосся",
                    price: "1 000–2 000 CZK",
                },
                {
                    name: "Ботокс / Кератин",
                    price: "2 000–4 500 CZK",
                },
                {
                    name: "Вечірня зачіска",
                    price: "1 000–2 000 CZK",
                },
                {
                    name: "Весільна зачіска",
                    price: "1 500–2 000 CZK",
                },
                {
                    name: "Фарбування — коротке волосся",
                    price: "1 200 CZK",
                },
                {
                    name: "Фарбування — середня довжина",
                    price: "1 600–1 800 CZK",
                },
                {
                    name: "Фарбування — довге волосся",
                    price: "2 000–2 500 CZK",
                },
                {
                    name: "Фарбування відростків до 2 см — середня довжина",
                    price: "1 200 CZK",
                },
                {
                    name: "Фарбування відростків до 2 см — довге волосся",
                    price: "1 300–1 500 CZK",
                },
                {
                    name: "Тонування — коротке волосся",
                    price: "1 000 CZK",
                },
                {
                    name: "Тонування — середня довжина",
                    price: "1 600 CZK",
                },
                {
                    name: "Тонування — довге волосся",
                    price: "1 800–2 000 CZK",
                },
                {
                    name: "Total Blond + тонування — коротке волосся",
                    price: "1 800–2 200 CZK",
                },
                {
                    name: "Total Blond + тонування — середня довжина",
                    price: "3 000–3 800 CZK",
                },
                {
                    name: "Total Blond + тонування — довге волосся",
                    price: "4 000–5 500 CZK",
                },
                {
                    name: "Освітлення відростків до 2 см — коротке волосся",
                    price: "1 400 CZK",
                },
                {
                    name: "Освітлення відростків до 2 см — середня довжина",
                    price: "1 600–2 000 CZK",
                },
                {
                    name: "Освітлення відростків до 2 см — довге волосся",
                    price: "2 000–2 400 CZK",
                },
                {
                    name: "Airtouch — середня довжина",
                    price: "4 000–4 600 CZK",
                },
                {
                    name: "Airtouch — довге волосся",
                    price: "4 800–6 500 CZK",
                },
                {
                    name: "Корекція Airtouch до 5 см — середня довжина",
                    price: "3 500–4 200 CZK",
                },
                {
                    name: "Корекція Airtouch до 5 см — довге волосся",
                    price: "4 200–4 500 CZK",
                },
                {
                    name: "Рельєфне фарбування / Balayage — середня довжина",
                    price: "3 800–4 500 CZK",
                },
                {
                    name: "Рельєфне фарбування / Balayage — довге волосся",
                    price: "4 500–5 200 CZK",
                },
                {
                    name: "Контуринг",
                    price: "2 200–2 600 CZK",
                },
                {
                    name: "Мікро-мелірування + тонування — коротке волосся",
                    price: "2 200–2 600 CZK",
                },
                {
                    name: "Мікро-мелірування + тонування — середня довжина",
                    price: "3 000–3 800 CZK",
                },
                {
                    name: "Мікро-мелірування + тонування — довге волосся",
                    price: "4 000–5 200 CZK",
                },
                {
                    name: "Корекція мелірування до 5 см — середня довжина",
                    price: "2 400–3 000 CZK",
                },
                {
                    name: "Корекція мелірування до 5 см — довге волосся",
                    price: "3 000–3 800 CZK",
                },
            ],
        },

        {
            id: "depilation",
            title: "Депіляція",
            items: [
                { name: "Пахви", price: "300 CZK" },
                { name: "Руки", price: "400 CZK" },
                { name: "Повні ноги", price: "700 CZK" },
                { name: "Ноги до колін", price: "400 CZK" },
                { name: "Обличчя", price: "400 CZK" },
                { name: "Глибоке бікіні", price: "700 CZK" },
                { name: "Класичне бікіні", price: "400 CZK" },
                { name: "Спина", price: "700 CZK" },
                { name: "Вуса", price: "200 CZK" },
                { name: "Борода", price: "300 CZK" },
                { name: "Ніс", price: "100 CZK" },
            ],
        },

        {
            id: "electroepilation",
            title: "Електроепіляція",
            items: [
                {
                    name: "Електроепіляція — за хвилину",
                    price: "20 CZK / хв",
                },
                {
                    name: "Погодинний пакет",
                    price: "1 200 CZK / год",
                },
            ],
        },

        {
            id: "massage",
            title: "Масажі",
            items: [
                {
                    name: "Класичний масаж всього тіла",
                    price: "800 CZK / 60 хв",
                },
                {
                    name: "Розслаблюючий масаж",
                    price: "700 CZK / 60 хв",
                },
                {
                    name: "Антицелюлітний масаж",
                    price: "800 CZK / 60 хв",
                },
                {
                    name: "Спортивний масаж",
                    price: "800 CZK / 60 хв",
                },
                {
                    name: "Лімфодренажний масаж",
                    price: "700 CZK / 60 хв",
                },
                {
                    name: "Масаж спини та шиї",
                    price: "500 CZK / 30 хв",
                },
                {
                    name: "Масаж стоп",
                    price: "500 CZK / 30 хв",
                },
            ],
        },

        {
            id: "pedicure",
            title: "Педикюр",
            items: [
                {
                    name: "Класичний педикюр",
                    price: "500 CZK",
                },
                {
                    name: "Педикюр з гелевим лаком",
                    price: "800 CZK",
                },
                {
                    name: "SPA-догляд за стопами + розслаблюючий масаж",
                    price: "За призначенням",
                },
                {
                    name: "Мобільний педикюр",
                    price: "За призначенням",
                },
            ],
        },

        {
            id: "manicure",
            title: "Манікюр",
            items: [
                {
                    name: "Моделювання S — нове / доповнення",
                    price: "800 / 700 CZK",
                },
                {
                    name: "Моделювання M — нове / доповнення",
                    price: "900 / 800 CZK",
                },
                {
                    name: "Моделювання L — нове / доповнення",
                    price: "1 000 / 900 CZK",
                },
                {
                    name: "Декорування 1–2 нігтів",
                    price: "Безкоштовно",
                },
                {
                    name: "Зняття моделювання + манікюр",
                    price: "350 CZK",
                },
                {
                    name: "Ремонт нігтя поза встановленим терміном",
                    price: "50 CZK / ніготь",
                },
            ],
        },

        {
            id: "lashes",
            title: "Вії та брови",
            items: [
                {
                    name: "Класика — нове / доповнення",
                    price: "800 / 600 CZK",
                },
                {
                    name: "2D — нове / доповнення",
                    price: "900 / 600 CZK",
                },
                {
                    name: "3D — нове / доповнення",
                    price: "1 000 / 700 CZK",
                },
                {
                    name: "4D — нове / доповнення",
                    price: "1 200 / 900 CZK",
                },
                {
                    name: "Ліфтинг вій",
                    price: "600 CZK",
                },
                {
                    name: "Ліфтинг вій з фарбуванням",
                    price: "700 CZK",
                },
                {
                    name: "Ламінування брів + догляд",
                    price: "700 CZK",
                },
                {
                    name: "Ламінування брів з фарбуванням",
                    price: "800 CZK",
                },
                {
                    name: "Фарбування вій",
                    price: "300 CZK",
                },
                {
                    name: "Фарбування брів + укладка",
                    price: "400 CZK",
                },
                {
                    name: "Базова косметична процедура",
                    price: "900 CZK",
                },
                {
                    name: "Глибока косметична процедура",
                    price: "1 000 CZK",
                },
            ],
        },
    ],

    // ============================================================
    // CS
    // ============================================================

    cs: [
        {
            id: "laser",
            title: "Laserová epilace",
            items: [
                { name: "Podpaží", price: "500 CZK / 15 min" },
                { name: "Prsa", price: "700 CZK / 20 min" },
                { name: "Okolí bradavek", price: "500 CZK / 15 min" },
                { name: "Bílá linie břicha", price: "500 CZK / 10 min" },
                { name: "Břicho", price: "900 CZK / 30 min" },
                { name: "Hluboké bikini", price: "1 500 CZK / 35 min" },
                { name: "Klasické bikini", price: "1 100 CZK / 20 min" },
                { name: "Hýždě", price: "1 100 CZK / 20 min" },
                { name: "Stehna", price: "1 000 CZK / 30 min" },
                { name: "Lýtka", price: "1 000 CZK / 20 min" },
                { name: "Celé nohy", price: "2 000 CZK / 60 min" },
                { name: "Chodidla a prsty", price: "400 CZK / 10 min" },
                { name: "Fullback", price: "2 000 CZK / 45 min" },
                { name: "Předloktí", price: "900 CZK / 15 min" },
                { name: "Celé ruce", price: "1 200 CZK / 25 min" },
                { name: "Prsty rukou", price: "300 CZK / 10 min" },
                { name: "Horní ret", price: "300 CZK / 5 min" },
                { name: "Vousy", price: "600 CZK / 15 min" },
                { name: "Krk", price: "600 CZK / 10 min" },
            ],
        },

        // ========================================================
        // HAIR
        // ========================================================

        {
            id: "hair",
            title: "Kadeřnictví",
            items: [
                {
                    name: "Dámský střih — krátké vlasy",
                    price: "600 CZK",
                },
                {
                    name: "Dámský střih — střední délka",
                    price: "700 CZK",
                },
                {
                    name: "Dámský střih — dlouhé vlasy",
                    price: "800 CZK",
                },
                {
                    name: "Střih konečků",
                    price: "500–700 CZK",
                },
                {
                    name: "Střih ofiny",
                    price: "150–200 CZK",
                },
                {
                    name: "Pánský střih",
                    price: "350–400 CZK",
                },
                {
                    name: "Dětský střih do 10 let",
                    price: "300 CZK",
                },
                {
                    name: "Mytí vlasů",
                    price: "+50–100 CZK",
                },
                {
                    name: "Peeling + péče na vlasy",
                    price: "700–1 500 CZK",
                },
                {
                    name: "Regenerace vlasů",
                    price: "1 000–2 000 CZK",
                },
                {
                    name: "Botox / Keratin",
                    price: "2 000–4 500 CZK",
                },
                {
                    name: "Večerní účes",
                    price: "1 000–2 000 CZK",
                },
                {
                    name: "Svatební účes",
                    price: "1 500–2 000 CZK",
                },
                {
                    name: "Barvení — krátké vlasy",
                    price: "1 200 CZK",
                },
                {
                    name: "Barvení — střední délka",
                    price: "1 600–1 800 CZK",
                },
                {
                    name: "Barvení — dlouhé vlasy",
                    price: "2 000–2 500 CZK",
                },
                {
                    name: "Barvení odrostů do 2 cm — střední délka",
                    price: "1 200 CZK",
                },
                {
                    name: "Barvení odrostů do 2 cm — dlouhé vlasy",
                    price: "1 300–1 500 CZK",
                },
                {
                    name: "Přeliv / tónování — krátké vlasy",
                    price: "1 000 CZK",
                },
                {
                    name: "Přeliv / tónování — střední délka",
                    price: "1 600 CZK",
                },
                {
                    name: "Přeliv / tónování — dlouhé vlasy",
                    price: "1 800–2 000 CZK",
                },
                {
                    name: "Total Blond + tónování — krátké vlasy",
                    price: "1 800–2 200 CZK",
                },
                {
                    name: "Total Blond + tónování — střední délka",
                    price: "3 000–3 800 CZK",
                },
                {
                    name: "Total Blond + tónování — dlouhé vlasy",
                    price: "4 000–5 500 CZK",
                },
                {
                    name: "Zesvětlení odrostů do 2 cm — krátké vlasy",
                    price: "1 400 CZK",
                },
                {
                    name: "Zesvětlení odrostů do 2 cm — střední délka",
                    price: "1 600–2 000 CZK",
                },
                {
                    name: "Zesvětlení odrostů do 2 cm — dlouhé vlasy",
                    price: "2 000–2 400 CZK",
                },
                {
                    name: "Airtouch — střední délka",
                    price: "4 000–4 600 CZK",
                },
                {
                    name: "Airtouch — dlouhé vlasy",
                    price: "4 800–6 500 CZK",
                },
                {
                    name: "Korekce Airtouch do 5 cm — střední délka",
                    price: "3 500–4 200 CZK",
                },
                {
                    name: "Korekce Airtouch do 5 cm — dlouhé vlasy",
                    price: "4 200–4 500 CZK",
                },
                {
                    name: "Reliéfní barvení / Balayage — střední délka",
                    price: "3 800–4 500 CZK",
                },
                {
                    name: "Reliéfní barvení / Balayage — dlouhé vlasy",
                    price: "4 500–5 200 CZK",
                },
                {
                    name: "Contouring",
                    price: "2 200–2 600 CZK",
                },
                {
                    name: "Mikro melír + tónování — krátké vlasy",
                    price: "2 200–2 600 CZK",
                },
                {
                    name: "Mikro melír + tónování — střední délka",
                    price: "3 000–3 800 CZK",
                },
                {
                    name: "Mikro melír + tónování — dlouhé vlasy",
                    price: "4 000–5 200 CZK",
                },
                {
                    name: "Korekce melíru do 5 cm — střední délka",
                    price: "2 400–3 000 CZK",
                },
                {
                    name: "Korekce melíru do 5 cm — dlouhé vlasy",
                    price: "3 000–3 800 CZK",
                },
            ],
        },

        {
            id: "depilation",
            title: "Depilace",
            items: [
                { name: "Podpaží", price: "300 CZK" },
                { name: "Ruce", price: "400 CZK" },
                { name: "Celé nohy", price: "700 CZK" },
                { name: "Nohy po kolena", price: "400 CZK" },
                { name: "Obličej", price: "400 CZK" },
                { name: "Hluboké bikini", price: "700 CZK" },
                { name: "Klasické bikini", price: "400 CZK" },
                { name: "Záda", price: "700 CZK" },
                { name: "Horní ret", price: "200 CZK" },
                { name: "Vousy", price: "300 CZK" },
                { name: "Nos", price: "100 CZK" },
            ],
        },

        {
            id: "electroepilation",
            title: "Elektroepilace",
            items: [
                {
                    name: "Elektroepilace — za minutu",
                    price: "20 CZK / min",
                },
                {
                    name: "Hodinový balíček",
                    price: "1 200 CZK / hod",
                },
            ],
        },

        {
            id: "massage",
            title: "Masáže",
            items: [
                {
                    name: "Klasická masáž celého těla",
                    price: "800 CZK / 60 min",
                },
                {
                    name: "Relaxační masáž",
                    price: "700 CZK / 60 min",
                },
                {
                    name: "Anticelulitidní masáž",
                    price: "800 CZK / 60 min",
                },
                {
                    name: "Sportovní masáž",
                    price: "800 CZK / 60 min",
                },
                {
                    name: "Lymfodrenážní masáž",
                    price: "700 CZK / 60 min",
                },
                {
                    name: "Masáž zad a krku",
                    price: "500 CZK / 30 min",
                },
                {
                    name: "Masáž chodidel",
                    price: "500 CZK / 30 min",
                },
            ],
        },

        {
            id: "pedicure",
            title: "Pedikúra",
            items: [
                {
                    name: "Klasická pedikúra",
                    price: "500 CZK",
                },
                {
                    name: "Pedikúra s gel lakem",
                    price: "800 CZK",
                },
                {
                    name: "SPA péče o chodidla + relaxační masáž",
                    price: "Dle dohody",
                },
                {
                    name: "Mobilní pedikúra",
                    price: "Dle dohody",
                },
            ],
        },

        {
            id: "manicure",
            title: "Manikúra",
            items: [
                {
                    name: "Modeláž S — nová / doplnění",
                    price: "800 / 700 CZK",
                },
                {
                    name: "Modeláž M — nová / doplnění",
                    price: "900 / 800 CZK",
                },
                {
                    name: "Modeláž L — nová / doplnění",
                    price: "1 000 / 900 CZK",
                },
                {
                    name: "Zdobení 1–2 nehtů",
                    price: "Zdarma",
                },
                {
                    name: "Odstranění modeláže + manikúra",
                    price: "350 CZK",
                },
                {
                    name: "Oprava nehtu mimo stanovený termín",
                    price: "50 CZK / nehet",
                },
            ],
        },

        {
            id: "lashes",
            title: "Řasy a obočí",
            items: [
                {
                    name: "Klasika — nová / doplnění",
                    price: "800 / 600 CZK",
                },
                {
                    name: "2D — nová / doplnění",
                    price: "900 / 600 CZK",
                },
                {
                    name: "3D — nová / doplnění",
                    price: "1 000 / 700 CZK",
                },
                {
                    name: "4D — nová / doplnění",
                    price: "1 200 / 900 CZK",
                },
                {
                    name: "Lifting řas",
                    price: "600 CZK",
                },
                {
                    name: "Lifting řas s barvením",
                    price: "700 CZK",
                },
                {
                    name: "Laminace obočí + péče",
                    price: "700 CZK",
                },
                {
                    name: "Laminace obočí s barvením",
                    price: "800 CZK",
                },
                {
                    name: "Barvení řas",
                    price: "300 CZK",
                },
                {
                    name: "Barvení obočí + styling",
                    price: "400 CZK",
                },
                {
                    name: "Základní kosmetické ošetření",
                    price: "900 CZK",
                },
                {
                    name: "Hloubkové kosmetické ošetření",
                    price: "1 000 CZK",
                },
            ],
        },
    ],

    // ============================================================
    // EN
    // ============================================================

    en: [
        {
            id: "laser",
            title: "Laser Hair Removal",
            items: [
                { name: "Underarms", price: "500 CZK / 15 min" },
                { name: "Chest", price: "700 CZK / 20 min" },
                { name: "Around nipples", price: "500 CZK / 15 min" },
                { name: "White abdominal line", price: "500 CZK / 10 min" },
                { name: "Stomach", price: "900 CZK / 30 min" },
                { name: "Deep bikini", price: "1,500 CZK / 35 min" },
                { name: "Classic bikini", price: "1,100 CZK / 20 min" },
                { name: "Buttocks", price: "1,100 CZK / 20 min" },
                { name: "Thighs", price: "1,000 CZK / 30 min" },
                { name: "Calves", price: "1,000 CZK / 20 min" },
                { name: "Full legs", price: "2,000 CZK / 60 min" },
                { name: "Feet and toes", price: "400 CZK / 10 min" },
                { name: "Full back", price: "2,000 CZK / 45 min" },
                { name: "Forearms", price: "900 CZK / 15 min" },
                { name: "Full arms", price: "1,200 CZK / 25 min" },
                { name: "Fingers", price: "300 CZK / 10 min" },
                { name: "Upper lip", price: "300 CZK / 5 min" },
                { name: "Beard", price: "600 CZK / 15 min" },
                { name: "Neck", price: "600 CZK / 10 min" },
            ],
        },

        // ========================================================
        // HAIR
        // ========================================================

        {
            id: "hair",
            title: "Hairdressing",
            items: [
                {
                    name: "Women's haircut — short hair",
                    price: "600 CZK",
                },
                {
                    name: "Women's haircut — medium hair",
                    price: "700 CZK",
                },
                {
                    name: "Women's haircut — long hair",
                    price: "800 CZK",
                },
                {
                    name: "Trim ends",
                    price: "500–700 CZK",
                },
                {
                    name: "Bangs trim",
                    price: "150–200 CZK",
                },
                {
                    name: "Men's haircut",
                    price: "350–400 CZK",
                },
                {
                    name: "Children's haircut up to 10 years",
                    price: "300 CZK",
                },
                {
                    name: "Hair wash",
                    price: "+50–100 CZK",
                },
                {
                    name: "Peeling + hair care",
                    price: "700–1,500 CZK",
                },
                {
                    name: "Hair regeneration",
                    price: "1,000–2,000 CZK",
                },
                {
                    name: "Botox / Keratin",
                    price: "2,000–4,500 CZK",
                },
                {
                    name: "Evening hairstyle",
                    price: "1,000–2,000 CZK",
                },
                {
                    name: "Wedding hairstyle",
                    price: "1,500–2,000 CZK",
                },
                {
                    name: "Full coloring — short hair",
                    price: "1,200 CZK",
                },
                {
                    name: "Full coloring — medium hair",
                    price: "1,600–1,800 CZK",
                },
                {
                    name: "Full coloring — long hair",
                    price: "2,000–2,500 CZK",
                },
                {
                    name: "Root coloring up to 2 cm — medium hair",
                    price: "1,200 CZK",
                },
                {
                    name: "Root coloring up to 2 cm — long hair",
                    price: "1,300–1,500 CZK",
                },
                {
                    name: "Toning — short hair",
                    price: "1,000 CZK",
                },
                {
                    name: "Toning — medium hair",
                    price: "1,600 CZK",
                },
                {
                    name: "Toning — long hair",
                    price: "1,800–2,000 CZK",
                },
                {
                    name: "Total Blonde + toning — short hair",
                    price: "1,800–2,200 CZK",
                },
                {
                    name: "Total Blonde + toning — medium hair",
                    price: "3,000–3,800 CZK",
                },
                {
                    name: "Total Blonde + toning — long hair",
                    price: "4,000–5,500 CZK",
                },
                {
                    name: "Root lightening up to 2 cm — short hair",
                    price: "1,400 CZK",
                },
                {
                    name: "Root lightening up to 2 cm — medium hair",
                    price: "1,600–2,000 CZK",
                },
                {
                    name: "Root lightening up to 2 cm — long hair",
                    price: "2,000–2,400 CZK",
                },
                {
                    name: "Airtouch — medium hair",
                    price: "4,000–4,600 CZK",
                },
                {
                    name: "Airtouch — long hair",
                    price: "4,800–6,500 CZK",
                },
                {
                    name: "Airtouch correction up to 5 cm — medium hair",
                    price: "3,500–4,200 CZK",
                },
                {
                    name: "Airtouch correction up to 5 cm — long hair",
                    price: "4,200–4,500 CZK",
                },
                {
                    name: "Relief coloring / Balayage — medium hair",
                    price: "3,800–4,500 CZK",
                },
                {
                    name: "Relief coloring / Balayage — long hair",
                    price: "4,500–5,200 CZK",
                },
                {
                    name: "Contouring",
                    price: "2,200–2,600 CZK",
                },
                {
                    name: "Micro-highlights + toning — short hair",
                    price: "2,200–2,600 CZK",
                },
                {
                    name: "Micro-highlights + toning — medium hair",
                    price: "3,000–3,800 CZK",
                },
                {
                    name: "Micro-highlights + toning — long hair",
                    price: "4,000–5,200 CZK",
                },
                {
                    name: "Highlights correction up to 5 cm — medium hair",
                    price: "2,400–3,000 CZK",
                },
                {
                    name: "Highlights correction up to 5 cm — long hair",
                    price: "3,000–3,800 CZK",
                },
            ],
        },

        {
            id: "depilation",
            title: "Waxing",
            items: [
                { name: "Underarms", price: "300 CZK" },
                { name: "Arms", price: "400 CZK" },
                { name: "Full legs", price: "700 CZK" },
                { name: "Legs to knees", price: "400 CZK" },
                { name: "Face", price: "400 CZK" },
                { name: "Deep bikini", price: "700 CZK" },
                { name: "Classic bikini", price: "400 CZK" },
                { name: "Back", price: "700 CZK" },
                { name: "Upper lip", price: "200 CZK" },
                { name: "Beard", price: "300 CZK" },
                { name: "Nose", price: "100 CZK" },
            ],
        },

        {
            id: "electroepilation",
            title: "Electroepilation",
            items: [
                {
                    name: "Electroepilation — per minute",
                    price: "20 CZK / min",
                },
                {
                    name: "Hourly package",
                    price: "1,200 CZK / hour",
                },
            ],
        },

        {
            id: "massage",
            title: "Massages",
            items: [
                {
                    name: "Classic full body massage",
                    price: "800 CZK / 60 min",
                },
                {
                    name: "Relaxing massage",
                    price: "700 CZK / 60 min",
                },
                {
                    name: "Anti-cellulite massage",
                    price: "800 CZK / 60 min",
                },
                {
                    name: "Sports massage",
                    price: "800 CZK / 60 min",
                },
                {
                    name: "Lymphatic drainage massage",
                    price: "700 CZK / 60 min",
                },
                {
                    name: "Back and neck massage",
                    price: "500 CZK / 30 min",
                },
                {
                    name: "Foot massage",
                    price: "500 CZK / 30 min",
                },
            ],
        },

        {
            id: "pedicure",
            title: "Pedicure",
            items: [
                {
                    name: "Classic pedicure",
                    price: "500 CZK",
                },
                {
                    name: "Pedicure with gel polish",
                    price: "800 CZK",
                },
                {
                    name: "SPA foot care + relaxing foot massage",
                    price: "By arrangement",
                },
                {
                    name: "Mobile pedicure",
                    price: "By arrangement",
                },
            ],
        },

        {
            id: "manicure",
            title: "Manicure",
            items: [
                {
                    name: "Nail modeling S — new / refill",
                    price: "800 / 700 CZK",
                },
                {
                    name: "Nail modeling M — new / refill",
                    price: "900 / 800 CZK",
                },
                {
                    name: "Nail modeling L — new / refill",
                    price: "1,000 / 900 CZK",
                },
                {
                    name: "Decoration 1–2 nails",
                    price: "Free",
                },
                {
                    name: "Removal + manicure",
                    price: "350 CZK",
                },
                {
                    name: "Nail repair outside scheduled period",
                    price: "50 CZK / nail",
                },
            ],
        },

        {
            id: "lashes",
            title: "Lashes & Brows",
            items: [
                {
                    name: "Classic — new / refill",
                    price: "800 / 600 CZK",
                },
                {
                    name: "2D — new / refill",
                    price: "900 / 600 CZK",
                },
                {
                    name: "3D — new / refill",
                    price: "1,000 / 700 CZK",
                },
                {
                    name: "4D — new / refill",
                    price: "1,200 / 900 CZK",
                },
                {
                    name: "Lash lift",
                    price: "600 CZK",
                },
                {
                    name: "Lash lift with tint",
                    price: "700 CZK",
                },
                {
                    name: "Brow lamination + care",
                    price: "700 CZK",
                },
                {
                    name: "Brow lamination with tint",
                    price: "800 CZK",
                },
                {
                    name: "Lash tint",
                    price: "300 CZK",
                },
                {
                    name: "Brow tint + styling",
                    price: "400 CZK",
                },
                {
                    name: "Basic cosmetic treatment",
                    price: "900 CZK",
                },
                {
                    name: "Deep cosmetic treatment",
                    price: "1,000 CZK",
                },
            ],
        },
    ],
};

const headings = {
    uk: {
        subtitle: "ПРАЙС",
        title: "Наші ціни",
        note: "Ціни є показовими. Все залежить від густоти волосся та часу, який займає процедура.",
    },

    cs: {
        subtitle: "CENÍK",
        title: "Naše ceny",
        note: "Ceny jsou orientační. Vše závisí na hustotě vlasů a času potřebném k provedení procedury.",
    },

    en: {
        subtitle: "PRICE LIST",
        title: "Our prices",
        note: "Prices are indicative. The final price depends on hair density and the time required for the treatment.",
    },
};

export default function Prices() {
    const [language, setLanguage] =
        useState<Language>("uk");

    const [activeCategory, setActiveCategory] =
        useState("laser");

    const [selectedItem, setSelectedItem] =
        useState<string | null>(null);

    /*
     * ============================================================
     * LANGUAGE
     * ============================================================
     */

    useEffect(() => {
        const saved =
            localStorage.getItem(
                "ty-kraso-language"
            ) as Language | null;

        if (
            saved === "uk" ||
            saved === "cs" ||
            saved === "en"
        ) {
            setLanguage(saved);
        }
    }, []);

    /*
     * ============================================================
     * RESET CATEGORY WHEN LANGUAGE CHANGES
     * ============================================================
     */

    useEffect(() => {
        setActiveCategory("laser");
        setSelectedItem(null);
    }, [language]);

    const categories =
        prices[language];

    const active =
        categories.find(
            (category) =>
                category.id ===
                activeCategory
        ) ?? categories[0];

    const text =
        headings[language];

    /*
     * ============================================================
     * SELECT PROCEDURE
     * ============================================================
     */

    const handleProcedureClick = (
        category: PriceCategory,
        item: PriceItem
    ) => {
        /*
         * Зберігаємо вибрану процедуру.
         *
         * Contact прочитає ці дані.
         */

        sessionStorage.setItem(
            "ty-kraso-selected-procedure",
            JSON.stringify({
                category: category.title,
                name: item.name,
                price: item.price,
            })
        );

        /*
         * Visual feedback
         */

        setSelectedItem(
            `${category.id}-${item.name}`
        );

        /*
         * Плавна прокрутка ДО CONTACT.
         *
         * Вона виконується ТІЛЬКИ
         * після натискання на процедуру.
         */

        const contact =
            document.getElementById(
                "contact"
            );

        if (contact) {
            contact.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }

        /*
         * Повідомляємо Contact,
         * що була вибрана процедура.
         */

        window.dispatchEvent(
            new CustomEvent(
                "ty-kraso-procedure-selected"
            )
        );
    };

    return (
        <section
            id="prices"
            className={styles.prices}
        >
            <div
                className={
                    styles.container
                }
            >
                {/* =================================================
                    TITLE
                ================================================== */}

                <SectionTitle
                    subtitle={
                        text.subtitle
                    }
                    title={
                        text.title
                    }
                    center
                />

                {/* =================================================
                    CATEGORIES
                ================================================== */}

                <div
                    className={
                        styles.categories
                    }
                >
                    {categories.map(
                        (category) => (
                            <button
                                key={
                                    category.id
                                }
                                type="button"
                                className={`
                                    ${styles.category}
                                    ${
                                        activeCategory ===
                                        category.id
                                            ? styles.active
                                            : ""
                                    }
                                `}
                                onClick={() =>
                                    setActiveCategory(
                                        category.id
                                    )
                                }
                            >
                                {
                                    category.title
                                }
                            </button>
                        )
                    )}
                </div>

                {/* =================================================
                    PRICE LIST
                ================================================== */}

                <AnimatePresence
                    mode="wait"
                >
                    <motion.div
                        key={`${language}-${active.id}`}
                        className={
                            styles.priceList
                        }
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: -20,
                        }}
                        transition={{
                            duration: 0.35,
                        }}
                    >
                        {active.items.map(
                            (
                                item,
                                index
                            ) => {
                                const itemKey =
                                    `${active.id}-${item.name}`;

                                const isSelected =
                                    selectedItem ===
                                    itemKey;

                                return (
                                    <motion.button
                                        key={`${item.name}-${index}`}
                                        type="button"
                                        className={`
                                            ${styles.priceItem}
                                            ${
                                                isSelected
                                                    ? styles.selected
                                                    : ""
                                            }
                                        `}
                                        initial={{
                                            opacity: 0,
                                            x: -15,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                        }}
                                        transition={{
                                            duration: 0.3,
                                            delay:
                                                index *
                                                0.025,
                                        }}
                                        onClick={() =>
                                            handleProcedureClick(
                                                active,
                                                item
                                            )
                                        }
                                    >
                                        <span
                                            className={
                                                styles.serviceName
                                            }
                                        >
                                            {
                                                item.name
                                            }
                                        </span>

                                        <span
                                            className={
                                                styles.line
                                            }
                                        />

                                        <span
                                            className={
                                                styles.price
                                            }
                                        >
                                            {
                                                item.price
                                            }
                                        </span>
                                    </motion.button>
                                );
                            }
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* =================================================
                    NOTE
                ================================================== */}

                <p
                    className={
                        styles.note
                    }
                >
                    {text.note}
                </p>
            </div>
        </section>
    );
}