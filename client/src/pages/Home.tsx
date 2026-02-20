/**
 * Home Page - Carles Barranco Portfolio (v6)
 *
 * Changes:
 * - Time zone: single left-aligned text box with Valencia + CDMX
 * - Spacing: first paragraph closer to header (same gap as SERVICIOS→DIRECCIÓN DE ARTE)
 * - Grid switch button X5/X3 in menu
 * - Mobile menu: below header text line
 * - Gallery with smooth transition between 5 and 3 columns
 * - DB-backed gallery with fallback
 */

import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import {
  useLanguage,
  ALL_LANGUAGES,
  LANGUAGE_LABELS,
} from "@/contexts/LanguageContext";
import type { Language } from "@/contexts/LanguageContext";

// Importar imágenes
import portrait from "../images/portrait.jpeg";
import cassette from "../images/works/cassette.png";
import jbz from "../images/works/jbz.png";
import comic01 from "../images/works/comic01.png";
import mandarina from "../images/works/Mandarina.png";
import telita01 from "../images/works/Telita_01.png";
import Chaowifi01 from "../images/works/ChaoWifi_01.png";
import Qi_poster from "../images/works/Qi_poster.png";
import type_kubi from "../images/works/type_kubi.gif";
import GERKO from "../images/works/GERKO.png";
import libreta01 from "../images/works/libreta_01.png";
import Xut01 from "../images/works/Xut_01.png";
import drw_cami from "../images/works/drw_cami.png";
import harem_2025 from "../images/works/freepik__use-the-uploaded-reference-image-as-inspiration-fo__46354.png";
import gerko_04 from "../images/works/GERKO-04.png";
import type_xut from "../images/works/type_xut.gif";
import avenport from "../images/works/type_avenport.gif";
import X_morph from "../images/works/X_morph.gif";
import botiga from "../images/works/type_botiga.gif";
import type_drw from "../images/works/type_drw.gif";
import monon from "../images/works/type_monon.gif";
import nervio from "../images/works/type_nervio.gif";
import type_telita from "../images/works/type_telita.gif";
import trilladora from "../images/works/type_trilladora.gif";
import xut_type from "../images/works/type_xut.gif";
import xut_02 from "../images/works/xut-02.gif";
import tf_01 from "../images/works/tf_01.png";
import telita_camisa from "../images/works/telita_camisa.png";
import saudade01 from "../images/works/saudade_01.png";
import saudade02 from "../images/works/saudade_02.png";
import saudade03 from "../images/works/saudade_03.png";
import sade_01 from "../images/works/sade_01.png";
import ronnie from "../images/works/RPReplay_Final1691020737.gif";
import qi_01 from "../images/works/Qi_01.gif";
import poster_arc1 from "../images/works/poster-01.png";
import poster_arc2 from "../images/works/poster1.png";
import mimi_disco from "../images/works/mimi_disco.gif";
import macria_01 from "../images/works/MALCRIÁ_COVER2.png";
import macria_02 from "../images/works/malcria_01.png";
import grim01 from "../images/works/grim_01.png";
import grim02 from "../images/works/grim_02.png";
import grim_poster from "../images/works/grim_poster.png";
import gravity from "../images/works/gravity.png";
import gerko_pantalon from "../images/works/gerko_pantalon.png";
import garito01 from "../images/works/garito_bola8.png";
import garito02 from "../images/works/garito_logo.gif";
import garito03 from "../images/works/garito_posavasos.png";
import foto01 from "../images/works/foto_danocres.jpeg";
import ejemplar01 from "../images/works/ejemplar01.png";
import collage_garfield from "../images/works/collage_garfield.png";
import chaofoto from "../images/works/chao_foto.png";
import chao_02 from "../images/works/Chaowifi_02.png";
import anjocar from "../images/works/anjocar.png";
import qi_foto from "../images/works/Copia de P1250163.png";
import graffiti_a from "../images/works/graffiti_a.png";
import plantilla from "../images/works/plantilla01.png";
import roc_marci from "../images/works/roc_marc01.png";
import galleta from "../images/works/Galletaqi.png";
import collage_vaquero from "../images/works/Escanear d7.png";
import collage_02 from "../images/works/Escanear 7.png";
import saudade04 from "../images/works/Saudade_catálogo.png";
import garito_04 from "../images/works/garito_letrero.png";
import drw_cover from "../images/works/DRW_cover.png";
import drw_logos from "../images/works/DRW_logos.png";
import drw_asset from "../images/works/DRW2.png";
import drw_dog from "../images/works/DRW22.png";
import jbz2 from "../images/works/Escanear 4.png";




const MARGIN_VAR = "var(--page-margin)";

const PORTRAIT = portrait;

// Fallback gallery data
const PROJECTS: {
  src: string;
  en: string;
  es: string;
  val: string;
}[] = [
  {
    src: cassette,
    en: "El Enhebre — Album cover design and art direction - 2023",
    es: "El Enhebre — Diseño de portada de álbum y dirección de arte - 2023",
    val: "El Enhebre — Disseny de portada d'àlbum i direcció d'art - 2023",
  },
  {
    src: jbz,
    en: "JBZ — Visual identity and cassette packaging - 2025",
    es: "JBZ — Identidad visual y packaging para cassette - 2025",
    val: "JBZ — Identitat visual i packaging per a cassette - 2025",
  },
  {
    src: comic01,
    en: "Momento — Editorial design and experimental typography",
    es: "Momento — Diseño editorial y tipografía experimental",
    val: "Momento — Disseny editorial i tipografia experimental",
  },
  {
    src: telita01,
    en: "TELITA — Visual identity and typography - 2025",
    es: "TELITA — Identidad visual y tipografía - 2025",
    val: "TELITA — Identitat gráfica i tipografía - 2025",
  },
  {
    src: mandarina,
    en: "tangerine - ",
    es: "mandarina — Identidad visual y branding - 2025",
    val: "mandarina — Identitat visual i branding",
  },
  {
    src: Chaowifi01,
    en: "Chao Wifi Vol. 2 — Poster design and editorial design - 2024",
    es: "Chao Wifi Vol. 2 — Diseño de póster y diseño editorial - 2024",
    val: "Chao Wifi Vol. 2 — Disseny de pòster i disseny editorial - 2024",
  },
  {
    src: Qi_poster,
    en: "Qi — Creative direction, graphic design and typography - 2024",
    es: "QI — Dirección creativa, diseño gráfico y tipografía - 2024",
    val: "QI — Direcció creativa, disseny gràffic i tipografia - 2024",
  },
  {
    src: type_kubi,
    en: "Kubi Mono — TYPOGRAPHIC DESIGN",
    es: "Kubi mono — diseño tipográfico",
    val: "Kubi mono — disseny tipografic",
  },
  {
    src: GERKO,
    en: "GERKO — Display type design",
    es: "GERKO — Diseño tipográfico display",
    val: "GERKO — Disseny tipogràfic display",
  },
  {
    src: libreta01,
    en: "GHI — Complete visual identity system",
    es: "GHI — Sistema de identidad visual completo",
    val: "GHI — Sistema d'identitat visual complet",
  },
  {
    src: Xut01,
    en: "Production — Vinyl and merch artwork",
    es: "Producción — Artwork para vinilo y merch",
    val: "Producció — Artwork per a vinil i merch",
  },
  {
    src: drw_cami,
    en: "Sky — Editorial design and layout",
    es: "Sky — Diseño editorial y maquetación",
    val: "Sky — Disseny editorial i maquetació",
  },
  {
    src: macria_01,
    en: "Draw — Illustration and digital art",
    es: "Draw — Ilustración y arte digital",
    val: "Draw — Il·lustració i art digital",
  },
  {
    src: saudade02,
    en: "saudade estudio — Art direction for campaign",
    es: "saudade estudio — Dirección de arte para campaña",
    val: "saudade estudio — Direcció d'art per a campanya",
  },
  {
    src: poster_arc1,
    en: "PFC — Final degree project, graphic design",
    es: "PFC — Proyecto final de carrera, diseño gráfico",
    val: "PFC — Projecte final de carrera, disseny gràfic",
  },
  {
    src: grim02,
    en: "Araña — Logo and visual system",
    es: "Araña — Logotipo y sistema visual",
    val: "Aranya — Logotip i sistema visual",
  },
  {
    src: qi_foto,
    en: "aF — Experimental modular typeface",
    es: "aF — Tipografía modular experimental",
    val: "aF — Tipografia modular experimental",
  },
  {
    src: avenport,
    en: "Roots — Packaging and label design",
    es: "Roots — Diseño de packaging y etiquetas",
    val: "Roots — Disseny de packaging i etiquetes",
  },
  {
    src: garito01,
    en: "Minimal — Minimalist art direction",
    es: "Minimal — Dirección de arte minimalista",
    val: "Minimal — Direcció d'art minimalista",
  },
  {
    src: drw_cover,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
  {
    src: gravity,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
    {
    src: graffiti_a,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
    {
    src: gerko_04,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
     {
    src: harem_2025,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
  {
    src: collage_02,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
      {
    src: ejemplar01,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
      {
    src: foto01,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
     {
    src: type_telita,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
     {
    src: saudade03,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
     {
    src: mimi_disco,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
     {
    src: anjocar,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
     {
    src: grim01,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
     {
    src: chaofoto,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
     {
    src: garito03,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
     {
    src: type_xut,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
     {
    src: type_drw,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
     {
    src: xut_02,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
     {
    src: poster_arc2,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
    {
    src: gerko_pantalon,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
  {
    src: sade_01,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
  {
    src: macria_02,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
  {
    src: plantilla,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
   {
    src: roc_marci,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
   {
    src: galleta,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
   {
    src: collage_vaquero,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
   {
    src: saudade04,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
  {
    src: nervio,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
   {
    src: grim_poster,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
   {
    src: drw_logos,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
  {
    src: telita_camisa,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
  {
    src: botiga,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
  {
    src: chao_02,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
  {
    src: drw_asset,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
   {
    src: ronnie,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
  {
    src: jbz2,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
  {
    src: collage_garfield,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
  {
    src: saudade01,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
  {
    src: tf_01,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
   {
    src: garito_04,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
  {
    src: qi_01,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
  {
    src: X_morph,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
  {
    src: drw_dog,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
  {
    src: trilladora,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
  {
    src: monon,
    en: "Horizon — Photography and editorial composition",
    es: "Horizonte — Fotografía y composición editorial",
    val: "Horitzó — Fotografia i composició editorial",
  },
];

type GalleryItem = { src: string; en: string; es: string; val: string };

// ─── Clock Component ──────────────────────────────────────────────
function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date, tz: string) =>
    date.toLocaleTimeString("en-US", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  return (
    <div className="mt-3 leading-snug">
      <p>
        <span className="opacity-80">Valencia, España</span>
        <span className="ml-4 opacity-80">
          {formatTime(time, "Europe/Madrid")}
        </span>
      </p>
      <p>
        <span className="opacity-80">Ciudad de México, México</span>
        <span className="ml-4 opacity-80">
          {formatTime(time, "America/Mexico_City")}
        </span>
      </p>
    </div>
  );
}

// ─── Menu Controls ──────────────────────────────────────────────
function MenuControls() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const otherLanguages = ALL_LANGUAGES.filter(l => l !== language);

  return (
    <div className="flex items-center gap-3 pointer-events-auto">
      {/* Language selector */}
      <div className="flex items-center gap-1">
        {otherLanguages.map((lang, i) => (
          <span key={lang} className="flex items-center gap-1">
            {i > 0 && <span className="opacity-30">/</span>}
            <button
              onClick={() => setLanguage(lang)}
              className="transition-opacity opacity-50 hover:opacity-100 uppercase"
            >
              {LANGUAGE_LABELS[lang]}
            </button>
          </span>
        ))}
      </div>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="opacity-50 hover:opacity-100 transition-opacity uppercase"
      >
        {theme === "dark" ? "LIGHT" : "DARK"}
      </button>
    </div>
  );
}

// ─── Sticky Header ───────────────────────────────────────────────
function StickyHeader() {
  const { t } = useLanguage();

  return (
    <header
      className="sticky top-0 left-0 right-0 z-50 mix-blend-difference text-white pointer-events-none"
      style={{ padding: MARGIN_VAR }}
    >
      {/* Desktop layout: bio left, menu right */}
      <div className="hidden md:flex items-start justify-between">
        <p className="font-bold leading-snug max-w-[68%]">{t.headerBio}</p>
        <MenuControls />
      </div>

      {/* Mobile layout: bio on top, menu below */}
      <div className="flex flex-col md:hidden gap-2">
        <p className="font-bold leading-snug">{t.headerBio}</p>
        <MenuControls />
      </div>
    </header>
  );
}

// ─── Compact Bio Section ─────────────────────────────────────────
function BioSection() {
  const { t } = useLanguage();

  return (
    <section
      style={{
        paddingLeft: MARGIN_VAR,
        paddingRight: MARGIN_VAR,
        /* Tight spacing: header height (~24px) + margin + small gap (~6px like SERVICIOS→DIRECCIÓN DE ARTE) */
        paddingTop: "0",
        paddingBottom: "4px",
        minHeight: "80svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Description paragraph — tight gap from header */}
      <div>
        <p className="leading-relaxed max-w-3xl mb-3 opacity-80">
          {t.description}
        </p>

        <div className="max-w-md space-y-2">
          <div>
            <h3 className="font-bold mb-0.5">{t.servicesLabel}</h3>
            <div className="leading-snug opacity-80">
              {t.services.map((s, i) => (
                <p key={i}>{s}</p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-0.5">{t.projectsLabel}</h3>
            <div className="leading-snug opacity-80">
              {t.projects.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-0.5">{t.contactLabel}</h3>
            <div className="leading-snug opacity-80">
              <a
                href="mailto:carlesbarrancodies@gmail.com"
                className="block underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                carlesbarrancodies@gmail.com
              </a>
              <a
                href="tel:+34645694915"
                className="block underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                (+34) 645.694.915
              </a>
            </div>
          </div>

          <div className="leading-snug opacity-80">
            {t.socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                {link.label}
              </a>
            ))}
          </div>

          <LiveClock />
        </div>
      </div>

      <div className="pt-1">
        <img
          src={PORTRAIT}
          alt="Carles Barranco portrait"
          className="h-auto object-cover grayscale profileImg"
        />
      </div>
    </section>
  );
}

// ─── Gallery (DB + fallback, switchable 5/3 columns) ─────────────
function Gallery({ cols }: { cols: number }) {
  const { language } = useLanguage();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);

  // Map DB projects to gallery items, or use fallback
  const galleryItems: GalleryItem[] = useMemo(() => {
    return PROJECTS;
  }, []);

  const handleTap = useCallback(
    (index: number) => {
      const desc = galleryItems[index][language as Language];
      if (tappedIndex === index) {
        setTappedIndex(null);
        setHoveredProject(null);
      } else {
        setTappedIndex(index);
        setHoveredProject(desc);
      }
    },
    [language, tappedIndex, galleryItems]
  );

  const mobileCols = 2;

  const distributeToColumns = useCallback(
    (colCount: number) => {
      const columns: GalleryItem[][] = Array.from(
        { length: colCount },
        () => []
      );
      galleryItems.forEach((project, i) => {
        columns[i % colCount].push(project);
      });
      return columns;
    },
    [galleryItems]
  );

  const desktopColumns = useMemo(
    () => distributeToColumns(cols),
    [distributeToColumns, cols]
  );
  const mobileColumns = useMemo(
    () => distributeToColumns(mobileCols),
    [distributeToColumns]
  );

  const renderColumn = (
    column: GalleryItem[],
    colIndex: number,
    prefix: string
  ) => (
    <div
      key={`${prefix}-${colIndex}`}
      className="flex flex-col"
      style={{ gap: MARGIN_VAR }}
    >
      {column.map((project, rowIndex) => {
        const globalIndex = galleryItems.indexOf(project);
        return (
          <div
            key={`${prefix}-${colIndex}-${rowIndex}`}
            className="overflow-hidden"
            onMouseEnter={() =>
              setHoveredProject(project[language as Language])
            }
            onMouseLeave={() => setHoveredProject(null)}
            onClick={() => handleTap(globalIndex)}
          >
            <img
              src={project.src}
              alt={project[language as Language]}
              loading="lazy"
              className="w-full h-auto object-cover block"
            />
          </div>
        );
      })}
    </div>
  );

  return (
    <section
      className="relative"
      style={{
        paddingLeft: MARGIN_VAR,
        paddingRight: MARGIN_VAR,
        paddingTop: "4px",
        paddingBottom: MARGIN_VAR,
      }}
    >
      {/* Desktop grid with smooth column transition */}
      <div
        className="hidden md:grid transition-all duration-500 ease-in-out"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: MARGIN_VAR,
        }}
      >
        {desktopColumns.map((col, i) => renderColumn(col, i, "desktop"))}
      </div>

      {/* Mobile: 2 columns */}
      <div
        className="grid md:hidden"
        style={{
          gridTemplateColumns: `repeat(${mobileCols}, 1fr)`,
          gap: MARGIN_VAR,
        }}
      >
        {mobileColumns.map((col, i) => renderColumn(col, i, "mobile"))}
      </div>

      {/* Fixed bottom description */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-40 py-3 mix-blend-difference text-white pointer-events-none"
            style={{
              paddingLeft: MARGIN_VAR,
              paddingRight: MARGIN_VAR,
            }}
          >
            <p className="font-bold text-center">{hoveredProject}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────
function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      className="py-4"
      style={{
        paddingLeft: MARGIN_VAR,
        paddingRight: MARGIN_VAR,
      }}
    >
      <div className="flex items-center justify-between opacity-40">
        <span>
          &copy; {new Date().getFullYear()} {t.footerCopy}
        </span>
        <span>{t.footerRights}</span>
      </div>
    </footer>
  );
}

// ─── Main Page ────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <StickyHeader />
      <main>
        <BioSection />
        <Gallery cols={5} />
      </main>
      <Footer />
    </div>
  );
}
