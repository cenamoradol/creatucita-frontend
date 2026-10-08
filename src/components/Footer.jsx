import { Icon } from "@iconify/react";
import "./Footer.css";

const PRODUCT = [
  { href: "/#funcionalidades", label: "Funcionalidades" },
  { href: "/#casos", label: "Casos de uso" },
  { href: "#", label: "Precios" },
  { href: "#", label: "Integraciones" },
  { href: "#", label: "Actualizaciones" },
];

const COMPANY = [
  { href: "/sobre-nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

const SUPPORT = [
  { href: "/centro-de-ayuda", label: "Centro de ayuda" },
  { href: "/privacidad", label: "Privacidad" },
  { href: "/terminos", label: "Términos" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/5 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 pt-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="/" className="inline-block mb-5">
              <img
                src="/img/Logotipo footer.png"
                alt="CreaTuCita"
                className="h-20 sm:h-24 w-auto max-w-full object-contain brightness-0 invert"
              />
            </a>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              La agenda inteligente que siempre necesitaste. Organiza cualquier
              tipo de cita en segundos.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: "mdi:facebook", label: "Facebook" },
                { icon: "mdi:instagram", label: "Instagram" },
                { icon: "mdi:linkedin", label: "LinkedIn" },
                { icon: "mdi:twitter", label: "Twitter" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/5"
                  aria-label={s.label}
                >
                  <Icon icon={s.icon} className="text-slate-400 text-lg" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Producto" items={PRODUCT} />
          <FooterColumn title="Empresa" items={COMPANY} />
          <FooterColumn title="Soporte" items={SUPPORT} />
        </div>

        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 text-center md:text-left">
              © 2026 CreaTuCita™. Todos los derechos reservados.
            </p>
            <p className="text-xs text-slate-500 text-center md:text-right">
              Diseñado y desarrollado por{" "}
              <a
                href="https://creatucita.fernandezhn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-400 hover:text-brand-300 font-medium transition-colors"
              >
                Fernández Design Studio
              </a>
            </p>
          </div>
        </div>
      </div>

      <div
        className="mt-12 lg:mt-16 pt-8 footer-marquee-mask"
      >
        <div className="marquee-brand-track flex">
          <div className="flex shrink-0">
            <span className="footer-outline-text" aria-hidden="true">
              CreaTuCita
            </span>
            <span className="footer-outline-text" aria-hidden="true">
              CreaTuCita
            </span>
          </div>
          <div className="flex shrink-0">
            <span className="footer-outline-text" aria-hidden="true">
              CreaTuCita
            </span>
            <span className="footer-outline-text" aria-hidden="true">
              CreaTuCita
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {items.map((it) => (
          <li key={it.label}>
            <a
              href={it.href}
              className="text-sm text-slate-400 hover:text-brand-400 transition-colors"
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}