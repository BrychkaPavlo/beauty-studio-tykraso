"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

import styles from "./Contact.module.css";

type Language = "cs" | "en" | "uk";
type ModalKind = "success" | "error" | "info";

interface SelectedProcedure {
  categoryId: string;
  category: string;
  name: string;
  price: string;
}

interface ModalContent {
  title: string;
  message: string;
  kind: ModalKind;
}

const content = {
  cs: {
    subtitle: "KONTAKT",
    title: <>Objednejte se<br />na konzultaci</>,
    description: "Ozveme se vám co nejdříve a pomůžeme vám vybrat vhodnou proceduru.",
    phone: "Telefon",
    email: "E-mail",
    address: "Adresa",
    city: "Pražská 523, 541 01 Trutnov",
    name: "Vaše jméno",
    namePlaceholder: "Zadejte své jméno",
    phonePlaceholder: "+420...",
    category: "Kategorie procedury",
    categoryPlaceholder: "Vyberte kategorii",
    procedureName: "Název procedury",
    procedurePlaceholder: "Zadejte název procedury",
    price: "Cena",
    pricePlaceholder: "Např. 800 Kč",
    message: "Komentář",
    messagePlaceholder: "Váš komentář (nepovinné)",
    button: "Odeslat žádost",
    nameError: "Zadejte jméno (alespoň 2 znaky).",
    phoneError: "Zadejte platné telefonní číslo.",
    categoryError: "Vyberte kategorii procedury.",
    procedureError: "Zadejte název procedury.",
    priceError: "Zadejte cenu procedury.",
    successTitle: "Děkujeme",
    success: "Vaše žádost byla úspěšně odeslána.",
    errorTitle: "Něco se nepodařilo",
    error: "Žádost se nepodařilo odeslat. Zkuste to prosím znovu.",
    hairTitle: "Objednávání je dočasně pozastaveno",
    hairMessage: "Objednávání kadeřnických služeb je dočasně pozastaveno. Děkujeme za pochopení.",
    close: "Zavřít",
  },
  en: {
    subtitle: "CONTACT",
    title: <>Book a<br />consultation</>,
    description: "We will contact you as soon as possible and help you choose the right treatment.",
    phone: "Phone",
    email: "Email",
    address: "Address",
    city: "Pražská 523, 541 01 Trutnov",
    name: "Your name",
    namePlaceholder: "Enter your name",
    phonePlaceholder: "+420...",
    category: "Treatment category",
    categoryPlaceholder: "Choose a category",
    procedureName: "Treatment name",
    procedurePlaceholder: "Enter the treatment name",
    price: "Price",
    pricePlaceholder: "e.g. 800 CZK",
    message: "Comment",
    messagePlaceholder: "Your comment (optional)",
    button: "Send request",
    nameError: "Enter your name (at least 2 characters).",
    phoneError: "Enter a valid phone number.",
    categoryError: "Choose a treatment category.",
    procedureError: "Enter the treatment name.",
    priceError: "Enter the treatment price.",
    successTitle: "Thank you",
    success: "Your request has been sent successfully.",
    errorTitle: "Something went wrong",
    error: "The request could not be sent. Please try again.",
    hairTitle: "Bookings are temporarily paused",
    hairMessage: "Booking for hairdressing services is temporarily unavailable. Thank you for understanding.",
    close: "Close",
  },
  uk: {
    subtitle: "КОНТАКТИ",
    title: <>Запишіться<br />на консультацію</>,
    description: "Ми зв'яжемося з вами найближчим часом та допоможемо обрати процедуру.",
    phone: "Телефон",
    email: "Електронна пошта",
    address: "Адреса",
    city: "Pražská 523, 541 01 Trutnov",
    name: "Ваше ім'я",
    namePlaceholder: "Введіть ваше ім'я",
    phonePlaceholder: "+420...",
    category: "Категорія процедури",
    categoryPlaceholder: "Оберіть категорію",
    procedureName: "Назва процедури",
    procedurePlaceholder: "Введіть назву процедури",
    price: "Ціна",
    pricePlaceholder: "Наприклад, 800 Kč",
    message: "Коментар",
    messagePlaceholder: "Ваш коментар (необов'язково)",
    button: "Надіслати заявку",
    nameError: "Введіть ім'я (щонайменше 2 символи).",
    phoneError: "Введіть правильний номер телефону.",
    categoryError: "Оберіть категорію процедури.",
    procedureError: "Введіть назву процедури.",
    priceError: "Введіть ціну процедури.",
    successTitle: "Дякуємо",
    success: "Вашу заявку успішно надіслано.",
    errorTitle: "Сталася помилка",
    error: "Не вдалося надіслати заявку. Спробуйте ще раз.",
    hairTitle: "Запис тимчасово призупинено",
    hairMessage: "Запис на перукарські послуги тимчасово призупинено. Дякуємо за розуміння.",
    close: "Закрити",
  },
} as const;

const categories = [
  { id: "laser", cs: "Laserová epilace", en: "Laser hair removal", uk: "Лазерна епіляція" },
  { id: "hair", cs: "Kadeřnictví", en: "Hairdressing", uk: "Перукарські послуги" },
  { id: "depilation", cs: "Depilace", en: "Depilation", uk: "Депіляція" },
  { id: "electroepilation", cs: "Elektroepilace", en: "Electrolysis", uk: "Електроепіляція" },
  { id: "massage", cs: "Masáže", en: "Massage", uk: "Масаж" },
  { id: "pedicure", cs: "Pedikúra", en: "Pedicure", uk: "Педикюр" },
  { id: "manicure", cs: "Manikúra", en: "Manicure", uk: "Манікюр" },
  { id: "lashes", cs: "Řasy", en: "Lashes", uk: "Вії" },
] as const;

export default function Contact() {
  const [language, setLanguage] = useState<Language>("cs");
  const [contactAnimationKey, setContactAnimationKey] = useState(0);
  const [modal, setModal] = useState<ModalContent | null>(null);
  const [selectedProcedure, setSelectedProcedure] = useState<SelectedProcedure | null>(null);
  const currentContent = content[language];

  useEffect(() => {
    const savedLanguage = localStorage.getItem("ty-kraso-language") as Language | null;

    if (savedLanguage === "cs" || savedLanguage === "en" || savedLanguage === "uk") {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const updateLanguage = () => {
      const savedLanguage = localStorage.getItem("ty-kraso-language") as Language | null;

      if (savedLanguage === "cs" || savedLanguage === "en" || savedLanguage === "uk") {
        setLanguage(savedLanguage);
      }
    };

    window.addEventListener("storage", updateLanguage);
    window.addEventListener("ty-kraso-language-changed", updateLanguage);

    return () => {
      window.removeEventListener("storage", updateLanguage);
      window.removeEventListener("ty-kraso-language-changed", updateLanguage);
    };
  }, []);

  const schema = z.object({
    name: z.string().trim().min(2, currentContent.nameError),
    phone: z.string().trim().min(8, currentContent.phoneError),
    categoryId: z.string().min(1, currentContent.categoryError),
    procedureName: z.string().trim().min(1, currentContent.procedureError),
    price: z.string().trim().min(1, currentContent.priceError),
    message: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<z.input<typeof schema>, unknown, z.output<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      categoryId: "",
      procedureName: "",
      price: "",
      message: "",
    },
  });

  const categoryId = watch("categoryId");
  const procedureName = watch("procedureName");
  const price = watch("price");

  const createMessage = useCallback((procedure: SelectedProcedure) => {
    if (language === "uk") {
      return `Хочу записатися: ${procedure.category} — ${procedure.name}, ціна: ${procedure.price}.`;
    }

    if (language === "cs") {
      return `Chci se objednat: ${procedure.category} — ${procedure.name}, cena: ${procedure.price}.`;
    }

    return `I would like to book: ${procedure.category} — ${procedure.name}, price: ${procedure.price}.`;
  }, [language]);

  const showHairUnavailable = useCallback(() => {
    setModal({
      title: currentContent.hairTitle,
      message: currentContent.hairMessage,
      kind: "info",
    });
  }, [currentContent.hairMessage, currentContent.hairTitle]);

  const applyProcedure = useCallback((procedure: SelectedProcedure) => {
    if (procedure.categoryId === "hair") {
      showHairUnavailable();
      return;
    }

    setSelectedProcedure(procedure);
    setValue("categoryId", procedure.categoryId, { shouldValidate: true });
    setValue("procedureName", procedure.name, { shouldValidate: true });
    setValue("price", procedure.price, { shouldValidate: true });
    setValue("message", createMessage(procedure), { shouldDirty: true });
    setContactAnimationKey((previous) => previous + 1);
  }, [createMessage, setValue, showHairUnavailable]);

  const loadSelectedProcedure = useCallback(() => {
    const storedProcedure = sessionStorage.getItem("ty-kraso-selected-procedure");
    if (!storedProcedure) return;

    try {
      const procedure = JSON.parse(storedProcedure) as SelectedProcedure;
      const isComplete = procedure.categoryId && procedure.category && procedure.name && procedure.price;

      if (isComplete) applyProcedure(procedure);
    } catch (error) {
      console.error("Unable to load selected procedure:", error);
    } finally {
      sessionStorage.removeItem("ty-kraso-selected-procedure");
    }
  }, [applyProcedure]);

  
  useEffect(() => {
    loadSelectedProcedure();

    const handleProcedureSelected = () => {
      loadSelectedProcedure();
    };

    const handleHairBookingDisabled = () => {
      showHairUnavailable();
    };

    window.addEventListener(
      "ty-kraso-procedure-selected",
      handleProcedureSelected
    );

    window.addEventListener(
      "ty-kraso-hair-booking-disabled",
      handleHairBookingDisabled
    );

    return () => {
      window.removeEventListener(
        "ty-kraso-procedure-selected",
        handleProcedureSelected
      );

      window.removeEventListener(
        "ty-kraso-hair-booking-disabled",
        handleHairBookingDisabled
      );
    };
  }, [loadSelectedProcedure, showHairUnavailable]);


  useEffect(() => {
    const category = categories.find((item) => item.id === categoryId);

    if (category && procedureName.trim() && price.trim()) {
      setSelectedProcedure({
        categoryId,
        category: category[language],
        name: procedureName.trim(),
        price: price.trim(),
      });
    } else {
      setSelectedProcedure(null);
    }
  }, [categoryId, language, price, procedureName]);

  const onSubmit = async (data: z.output<typeof schema>) => {
    const category = categories.find((item) => item.id === data.categoryId);
    if (!category) return;

    const procedure: SelectedProcedure = {
      categoryId: data.categoryId,
      category: category[language],
      name: data.procedureName.trim(),
      price: data.price.trim(),
    };

    if (procedure.categoryId === "hair") {
      showHairUnavailable();
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          phone: data.phone.trim(),
          message: data.message.trim() || createMessage(procedure),
          procedure,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        if (result?.code === "HAIR_BOOKING_DISABLED") {
          showHairUnavailable();
          return;
        }

        throw new Error(currentContent.error);
      }

      reset();
      setSelectedProcedure(null);
      setModal({
        title: currentContent.successTitle,
        message: currentContent.success,
        kind: "success",
      });
    } catch (error) {
      console.error("Unable to submit contact request:", error);
      setModal({
        title: currentContent.errorTitle,
        message: currentContent.error,
        kind: "error",
      });
    }
  };

  useEffect(() => {
    if (!modal) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModal(null);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [modal]);

  const modalIcon = modal?.kind === "success" ? "✓" : modal?.kind === "error" ? "!" : "i";

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        {/* Contact information */}
        <motion.div
          className={styles.info}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className={styles.subtitle}>{currentContent.subtitle}</span>
          <h2 className={styles.title}>{currentContent.title}</h2>
          <p className={styles.description}>{currentContent.description}</p>

          <div className={styles.details}>
            <div className={styles.detail}>
              <span className={styles.label}>{currentContent.phone}</span>
              <a href="tel:+420605833655">+420 605 833 655</a>
            </div>

            <div className={styles.detail}>
              <span className={styles.label}>{currentContent.email}</span>
              <a href="mailto:kabrilaser@gmail.com">kabrilaser@gmail.com</a>
            </div>

            <div className={styles.detail}>
              <span className={styles.label}>{currentContent.address}</span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Pražská+523+541+01+Trutnov"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TY KRASO Beauty Studio na Google Maps"
              >
                {currentContent.city}
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.form
          key={contactAnimationKey}
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className={styles.field}>
            <label htmlFor="name">{currentContent.name}</label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder={currentContent.namePlaceholder}
              {...register("name")}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <span className={styles.error}>{errors.name.message}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="phone">{currentContent.phone}</label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder={currentContent.phonePlaceholder}
              {...register("phone")}
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="categoryId">{currentContent.category} *</label>
            <select
              id="categoryId"
              defaultValue=""
              {...register("categoryId", {
                onChange: (event) => {
                  if (event.target.value === "hair") {
                    setValue("categoryId", "", { shouldValidate: true });
                    showHairUnavailable();
                  }
                },
              })}
              aria-invalid={Boolean(errors.categoryId)}
            >
              <option value="">{currentContent.categoryPlaceholder}</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category[language]}
                </option>
              ))}
            </select>
            {errors.categoryId && <span className={styles.error}>{errors.categoryId.message}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="procedureName">{currentContent.procedureName} *</label>
            <input
              id="procedureName"
              type="text"
              placeholder={currentContent.procedurePlaceholder}
              {...register("procedureName")}
              aria-invalid={Boolean(errors.procedureName)}
            />
            {errors.procedureName && <span className={styles.error}>{errors.procedureName.message}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="price">{currentContent.price} *</label>
            <input
              id="price"
              type="text"
              placeholder={currentContent.pricePlaceholder}
              {...register("price")}
              aria-invalid={Boolean(errors.price)}
            />
            {errors.price && <span className={styles.error}>{errors.price.message}</span>}
          </div>

          {selectedProcedure && (
            <div className={styles.selectedProcedure} aria-live="polite">
              <strong className={styles.selectedProcedureName}>{selectedProcedure.name}</strong>
              <span>{selectedProcedure.category} · {selectedProcedure.price}</span>
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="message">{currentContent.message}</label>
            <textarea
              id="message"
              rows={5}
              placeholder={currentContent.messagePlaceholder}
              {...register("message")}
            />
          </div>

          <button type="submit" className={styles.button}>
            {currentContent.button}
          </button>
        </motion.form>
      </div>

      {/* Render the modal outside the contact section so overflow:hidden cannot clip it. */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {modal && (
          <motion.div
            className={styles.modalOverlay}
            role="presentation"
            onClick={() => setModal(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.modal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <div className={styles.modalIcon} aria-hidden="true">{modalIcon}</div>
              <h3 id="contact-modal-title" className={styles.modalTitle}>{modal.title}</h3>
              <p className={styles.modalMessage}>{modal.message}</p>
              <button
                type="button"
                className={`${styles.button} ${styles.modalClose}`}
                onClick={() => setModal(null)}
              >
                {currentContent.close}
              </button>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
