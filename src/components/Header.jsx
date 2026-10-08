import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useScrolled } from "../hooks/useScrolled";
import "./Header.css";

const NAV_LINKS = [
  { href: "/#beneficios", label: "Beneficios" },
  { href: "/#por-que", label: "Por qué" },
  { href: "/#funcionalidades", label: "Funcionalidades" },
  { href: "/#casos", label: "Casos de uso" },
  { href: "/#testimonios", label: "Testimonios" },
];

const MOBILE_NAV_LINKS = [
  { href: "/#beneficios", label: "Beneficios" },
  { href: "/#por-que", label: "Por qué CreaTuCita" },
  { href: "/#funcionalidades", label: "Funcionalidades" },
  { href: "/#casos", label: "Casos de uso" },
  { href: "/#testimonios", label: "Testimonios" },
];

export default function Header() {
  const scrolled = useScrolled(50);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "nav-scrolled" : ""
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img
              src="/img/Logotipo Header.png"
              alt="CreaTuCita"
              className="h-10 w-auto max-w-full object-contain"
            />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/#descargar"
              className="btn-shine text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40"
            >
              Descargar App
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="Menú"
          >
            <Icon icon="mdi:menu" className="text-2xl text-slate-700" />
          </button>
        </div>
      </nav>

      <div
        id="mobileMenu"
        className={`mobile-menu fixed top-0 right-0 bottom-0 w-80 max-w-full z-50 bg-white shadow-2xl ${
          menuOpen ? "open" : ""
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <img
              src="/img/Logotipo Header.png"
              alt="CreaTuCita"
              className="h-10 w-auto max-w-full object-contain"
            />
            <button
              onClick={closeMenu}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors"
              aria-label="Cerrar menú"
            >
              <Icon icon="mdi:close" className="text-2xl text-slate-700" />
            </button>
          </div>

          <div className="flex flex-col gap-1">
            {MOBILE_NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                className="mobile-link px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 font-medium transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href="/#descargar"
              onClick={closeMenu}
              className="text-center px-5 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/25"
            >
              Descargar App
            </a>
          </div>
        </div>
      </div>

      <div
        onClick={closeMenu}
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />
    </>
  );
}