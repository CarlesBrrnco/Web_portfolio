import React, { createContext, useContext, useState } from "react";

export type Language = "en" | "es" | "val";

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: "EN",
  es: "ES",
  val: "VAL",
};

export const ALL_LANGUAGES: Language[] = ["en", "es", "val"];

interface Translations {
  headerBio: string;
  description: string;
  servicesLabel: string;
  services: string[];
  projectsLabel: string;
  projects: string[];
  contactLabel: string;
  socialLinks: { label: string; url: string }[];
  lightLabel: string;
  darkLabel: string;
  footerCopy: string;
  footerRights: string;
}

const translations: Record<Language, Translations> = {
  en: {
    headerBio:
      "Carlesbrrnco is a freelance designer based in Valencia, Spain. His work focuses on typographic design and analog exploration.",
    description:
      "Collaborating with clients from around the world, he creates projects that are both strategic and unconventional. Always grounded in research, culture and form. Whether typography or brand identity, every outcome is built to communicate clearly and endure.",
    servicesLabel: "Services:",
    services: [
      "Art direction",
      "Visual identity",
      "Type design",
      "Artwork (album covers, merch, posters, etc)",
      "Editorial",
    ],
    projectsLabel: "Projects I'm part of:",
    projects: [
      "Gometverd Estudi - Partner",
      "Apart Type Foundry - Founder",
      "Shake It! - Partner",
    ],
    contactLabel: "Contact:",
    socialLinks: [
      { label: "Linkedin", url: "https://es.linkedin.com/in/carlesbarrancodies" },
      { label: "Instagram", url: "https://www.instagram.com/carles.brrnco/" },
      { label: "Are.na", url: "https://www.are.na/carles-barranco/channels" },
    ],
    lightLabel: "Light",
    darkLabel: "Dark",
    footerCopy: "Carles Barranco",
    footerRights: "All rights reserved",
  },
  es: {
    headerBio:
      "Carlesbrrnco es un diseñador freelance con base en Valencia, España. Su trabajo se centra en el diseño tipográfico y la exploración analógica.",
    description:
      "Colaborando con clientes de todo el mundo, crea proyectos que son tanto estratégicos como poco convencionales. Siempre fundamentados en la investigación, la cultura y la forma. Ya sea tipografía o identidad de marca, cada resultado está construido para comunicar con claridad y perdurar.",
    servicesLabel: "Servicios:",
    services: [
      "Dirección de arte",
      "Identidad visual",
      "Diseño tipográfico",
      "Artwork (portadas de álbum, merch, pósters, etc)",
      "Editorial",
    ],
    projectsLabel: "Proyectos en los que participo:",
    projects: [
      "Gometverd Estudi - Socio",
      "Apart Type Foundry - Fundador",
      "Shake It! - Socio",
    ],
    contactLabel: "Contacto:",
    socialLinks: [
      { label: "Linkedin", url: "https://linkedin.com" },
      { label: "Instagram", url: "https://instagram.com" },
      { label: "Are.na", url: "https://are.na" },
    ],
    lightLabel: "Claro",
    darkLabel: "Oscuro",
    footerCopy: "Carles Barranco",
    footerRights: "Todos los derechos reservados",
  },
  val: {
    headerBio:
      "Carlesbrrnco és un dissenyador freelance amb base a València, Espanya. El seu treball se centra en el disseny tipogràfic i l'exploració analògica.",
    description:
      "Col·laborant amb clients de tot el món, crea projectes que són tant estratègics com poc convencionals. Sempre fonamentats en la investigació, la cultura i la forma. Ja siga tipografia o identitat de marca, cada resultat està construït per a comunicar amb claredat i perdurar.",
    servicesLabel: "Serveis:",
    services: [
      "Direcció d'art",
      "Identitat visual",
      "Disseny tipogràfic",
      "Artwork (portades d'àlbum, merch, pòsters, etc)",
      "Editorial",
    ],
    projectsLabel: "Projectes en què participe:",
    projects: [
      "Gometverd Estudi - Soci",
      "Apart Type Foundry - Fundador",
      "Shake It! - Soci",
    ],
    contactLabel: "Contacte:",
    socialLinks: [
      { label: "Linkedin", url: "https://linkedin.com" },
      { label: "Instagram", url: "https://instagram.com" },
      { label: "Are.na", url: "https://are.na" },
    ],
    lightLabel: "Clar",
    darkLabel: "Fosc",
    footerCopy: "Carles Barranco",
    footerRights: "Tots els drets reservats",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem("language");
    return (stored as Language) || "en";
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
