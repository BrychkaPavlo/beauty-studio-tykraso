const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
  
    name: "TY KRASO Beauty Studio",
  
    url: "https://tykraso.com",
  
    telephone: "+420605833655",
  
    email: "kabrilaser@gmail.com",
  
    image: "https://tykraso.com/images/og-image.jpg",
  
    logo: "https://tykraso.com/favicon.ico",
  
    description:
      "TY KRASO Beauty Studio — profesionální kosmetické služby, péče o krásu a relaxace na jednom místě.",
  
    address: {
      "@type": "PostalAddress",
      streetAddress: "Pražská 523",
      postalCode: "541 01",
      addressLocality: "Trutnov",
      addressCountry: "CZ",
    },
  
    areaServed: {
      "@type": "City",
      name: "Trutnov",
    },
  
    priceRange: "$$",
  
    currenciesAccepted: "CZK",
  
    paymentAccepted: "Cash, Credit Card",
  
    sameAs: [
        "https://www.instagram.com/ty_kraso_beauty_studio_/",
      ],
  };
  
  export default function LocalBusinessSchema() {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    );
  }