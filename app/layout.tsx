import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import LocalBusinessSchema from "@/components/SEO/LocalBusinessSchema";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-title",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tykraso.com"),

  title: {
    default: "TY KRASO — Beauty Studio",
    template: "%s | TY KRASO Beauty Studio",
  },

  description:
    "TY KRASO Beauty Studio — profesionální kosmetické služby, péče o krásu a relaxace na jednom místě.",

  keywords: [
    // Brand
    "TY KRASO",
    "TY KRASO Beauty Studio",

    // Czech — hlavní jazyk
    "kosmetický salon",
    "studio krásy",
    "salon krásy",
    "beauty studio",
    "laserová epilace",
    "elektroepilace",
    "vosková depilace",
    "kadeřnické služby",
    "manikúra",
    "pedikúra",
    "masáže",
    "kosmetika",
    "řasy",
    "obočí",

    // Ukrainian
    "салон краси",
    "студія краси",
    "лазерна епіляція",
    "електроепіляція",
    "воскова депіляція",
    "перукарські послуги",
    "манікюр",
    "педикюр",
    "масаж",
    "косметологія",
    "вії",
    "брови",

    // English
    "beauty salon",
    "beauty studio",
    "laser hair removal",
    "electrolysis",
    "waxing",
    "hair salon",
    "manicure",
    "pedicure",
    "massage",
    "cosmetics",
    "lashes",
    "eyebrows",
  ],

  authors: [
    {
      name: "TY KRASO Beauty Studio",
    },
  ],

  creator: "TY KRASO Beauty Studio",
  publisher: "TY KRASO Beauty Studio",
  applicationName: "TY KRASO Beauty Studio",

  category: "Beauty",

  alternates: {
    canonical: "https://tykraso.com",
  },

  openGraph: {
    type: "website",
    url: "https://tykraso.com",
    siteName: "TY KRASO Beauty Studio",

    title: "TY KRASO — Beauty Studio",

    description:
      "Profesionální beauty studio — krása, péče a styl na jednom místě.",

    locale: "cs_CZ",

    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TY KRASO Beauty Studio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "TY KRASO — Beauty Studio",

    description:
      "Profesionální beauty studio — krása, péče a styl na jednom místě.",

    images: ["/images/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <head>
        <meta name="theme-color" content="#0a0a0a" />

        <meta
          name="format-detection"
          content="telephone=no"
        />
      </head>

      <body
        className={`${manrope.variable} ${cormorant.variable} antialiased`}
      >
        <LocalBusinessSchema />

        {children}
      </body>
    </html>
  );
}