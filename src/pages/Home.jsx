import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useCounter } from "../hooks/useCounter";

const TRUST_SECTORS = [
  "Hospitales", "Clínicas", "Consultorios", "Empresas", "Barberías",
  "Salones de Belleza", "Despachos Legales", "Psicólogos", "Nutricionistas",
  "Coaches", "Escuelas", "Freelancers",
];

const BENEFITS = [
  { icon: "mdi:calendar-multiple-check", title: "Agenda cualquier tipo de cita", desc: "Médicas, empresariales, de belleza, legales… Todas desde un solo lugar." },
  { icon: "mdi:gesture-tap", title: "Interfaz extremadamente sencilla", desc: "Diseñada para que cualquier persona la use sin necesidad de capacitación." },
  { icon: "mdi:clock-fast", title: "Ahorra horas cada semana", desc: "Automatiza lo que antes te tomaba horas. Tu agenda se gestiona sola." },
  { icon: "mdi:check-decagram", title: "Confirmaciones automáticas", desc: "Tus clientes reciben confirmación al instante. Sin llamadas, sin dudas." },
  { icon: "mdi:bell-badge", title: "Recordatorios inteligentes", desc: "Reduce cancelaciones y ausencias con recordatorios automáticos personalizados." },
  { icon: "mdi:calendar-sync", title: "Calendario integrado", desc: "Sincroniza con Google Calendar, Outlook y más. Todo conectado." },
  { icon: "mdi:devices", title: "Desde cualquier dispositivo", desc: "Disponible en móvil, tablet y desktop. Tu agenda siempre contigo." },
  { icon: "mdi:sync-circle", title: "Sincronización en tiempo real", desc: "Cualquier cambio se refleja al instante en todos tus dispositivos." },
];

const WHY_CARDS = [
  { icon: "mdi:rocket-launch", gradient: "from-brand-500 to-brand-600", shadow: "shadow-brand-500/20", title: "Más rápida", desc: "Programa una cita completa en menos de 30 segundos. Sin formularios interminables ni pasos innecesarios." },
  { icon: "mdi:trending-up", gradient: "from-brand-600 to-brand-700", shadow: "shadow-brand-600/20", title: "Más eficiente", desc: "Automatiza confirmaciones, recordatorios y seguimientos. Tu agenda trabaja por ti, no al revés." },
  { icon: "mdi:folder-star", gradient: "from-brand-700 to-brand-800", shadow: "shadow-brand-700/20", title: "Más organizada", desc: "Olvídate de las agendas desordenadas. Cada cita tiene su lugar, su horario y su información completa." },
  { icon: "mdi:gesture-tap-button", gradient: "from-brand-500 to-brand-600", shadow: "shadow-brand-500/20", title: "Más intuitiva", desc: "Si sabes usar un teléfono, sabes usar CreaTuCita. La curva de aprendizaje es prácticamente cero." },
  { icon: "mdi:sparkles", gradient: "from-brand-500 to-brand-600", shadow: "shadow-brand-500/20", title: "Más moderna", desc: "Diseñada con los más altos estándares de UX. Se siente como usar una app de Silicon Valley." },
  { icon: "mdi:sofa-single", gradient: "from-brand-600 to-brand-800", shadow: "shadow-brand-600/20", title: "Más cómoda", desc: "Tus clientes agendan cuando quieran, desde donde quieran. 24/7, sin esperar horarios de oficina." },
  { icon: "mdi:brain", gradient: "from-brand-500 to-brand-700", shadow: "shadow-brand-500/20", title: "Más inteligente", desc: "Aprende de tus patrones y te sugiere los mejores horarios. No solo organiza, optimiza." },
  { icon: "mdi:shield-check", gradient: "from-brand-600 to-brand-800", shadow: "shadow-brand-700/20", title: "Más segura", desc: "Tus datos y los de tus clientes están protegidos con encriptación de nivel empresarial." },
  { icon: "mdi:puzzle", gradient: "from-brand-600 to-brand-800", shadow: "shadow-brand-600/20", title: "Más flexible", desc: "Se adapta a cualquier negocio y cualquier tipo de cita. Médica, empresarial, de belleza… lo que sea." },
];

const FEATURES = [
  { icon: "mdi:brain", title: "Agenda Inteligente", desc: "Se adapta a tus horarios y preferencias." },
  { icon: "mdi:bell-ring-outline", title: "Recordatorios Automáticos", desc: "Notificaciones por email y push." },
  { icon: "mdi:account-group-outline", title: "Gestión de Clientes", desc: "Historial y datos de cada cliente." },
  { icon: "mdi:bell-badge-outline", title: "Notificaciones", desc: "Alertas instantáneas de cambios." },
  { icon: "mdi:calendar-sync-outline", title: "Calendario Sincronizado", desc: "Google Calendar, Outlook y más." },
  { icon: "mdi:check-all", title: "Confirmación Instantánea", desc: "Tus clientes confirman con un clic." },
  { icon: "mdi:view-dashboard-outline", title: "Panel Administrativo", desc: "Control total desde un dashboard." },
  { icon: "mdi:clock-check-outline", title: "Reservas 24/7", desc: "Agendan a cualquier hora, sin límites." },
  { icon: "mdi:history", title: "Historial de Citas", desc: "Registro completo de todas tus citas." },
  { icon: "mdi:chart-bar", title: "Estadísticas", desc: "Métricas clave para decisiones." },
];

const USE_CASES = [
  { icon: "mdi:hospital-building", label: "Hospitales" },
  { icon: "mdi:medical-bag", label: "Clínicas" },
  { icon: "mdi:stethoscope", label: "Consultorios" },
  { icon: "mdi:office-building", label: "Empresas" },
  { icon: "mdi:hair-dryer", label: "Salones de Belleza" },
  { icon: "mdi:content-cut", label: "Barberías" },
  { icon: "mdi:scale-balance", label: "Despachos Legales" },
  { icon: "mdi:head-heart", label: "Psicólogos" },
  { icon: "mdi:food-apple", label: "Nutricionistas" },
  { icon: "mdi:bullseye-arrow", label: "Coaches" },
  { icon: "mdi:school", label: "Escuelas" },
  { icon: "mdi:trophy-award", label: "Academias" },
  { icon: "mdi:wrench", label: "Talleres" },
  { icon: "mdi:laptop", label: "Servicios Técnicos" },
  { icon: "mdi:briefcase-account", label: "Consultores" },
  { icon: "mdi:account-tie", label: "Freelancers" },
];

const TESTIMONIALS = [
  { initials: "DR", grad: "from-brand-500 to-brand-700", name: "Dra. Rodríguez", role: "Médica dermatóloga", text: '"Antes perdía 2 horas diarias organizando mi agenda. Ahora mis pacientes agendan solos y yo me enfoco en lo que importa. <strong class="text-brand-800">La rapidez es impresionante.</strong>"', rating: 5 },
  { initials: "CM", grad: "from-brand-600 to-brand-800", name: "Carolina Mejía", role: "Dueña de salón de belleza", text: '"Mis clientes dicen que agendar conmigo nunca fue tan fácil. <strong class="text-brand-800">Las cancelaciones bajaron un 70%</strong> gracias a los recordatorios automáticos."', rating: 5 },
  { initials: "JL", grad: "from-navy-700 to-navy-900", name: "Javier López", role: "Abogado corporativo", text: '"Probé varias apps de reservas y ninguna se compara. <strong class="text-brand-800">CreaTuCita es la más profesional y fácil de usar</strong> que he encontrado."', rating: 5 },
  { initials: "AP", grad: "from-brand-500 to-brand-700", name: "Andrea Pérez", role: "Coach ejecutiva", text: '"Manejo 40 sesiones semanales de coaching y esto me cambió la vida. <strong class="text-brand-800">La organización es perfecta</strong> y mis clientes encantados."', rating: 5 },
  { initials: "RG", grad: "from-brand-600 to-brand-800", name: "Roberto García", role: "Director de clínica", text: '"Implementamos CreaTuCita en toda la clínica y <strong class="text-brand-800">la productividad del equipo se disparó.</strong> Ya no hay cruces de horarios."', rating: 4.5 },
  { initials: "LV", grad: "from-brand-500 to-brand-700", name: "Laura Vega", role: "Nutricionista", text: '"Soy nutricionista independiente y esta app me da la imagen profesional que necesitaba. <strong class="text-brand-800">Mis pacientes piensan que tengo un equipo completo.</strong>"', rating: 5 },
];

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefitsRef = useScrollReveal();
  const whyRef = useScrollReveal();
  const experienceRef = useScrollReveal();
  const featuresRef = useScrollReveal();
  const useCasesRef = useScrollReveal();
  const statsRef = useScrollReveal();
  const testimonialsRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onAnchor = (event) => {
      const a = event.target.closest("a[href]");
      if (!a) return;
      const href = a.getAttribute("href");
      const match = href.match(/#([^?#]+)$/) || (href.startsWith("#") ? [href, href.slice(1)] : null);
      if (!match) return;
      const id = match[1];
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    };
    const controller = new AbortController();
    document.addEventListener("click", onAnchor, { signal: controller.signal });
    return () => controller.abort();
  }, []);

  return (
    <>
      <Hero />
      <TrustMarquee />
      <Benefits sectionRef={benefitsRef} />
      <WhyCreaTuCita sectionRef={whyRef} />
      <Experience sectionRef={experienceRef} />
      <Features sectionRef={featuresRef} />
      <UseCases sectionRef={useCasesRef} />
      <Statistics sectionRef={statsRef} />
      <Testimonials sectionRef={testimonialsRef} />
      <FinalCTA sectionRef={ctaRef} />

      <a
        href="https://wa.me/50489462396"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className={`fixed right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1da851] flex items-center justify-center shadow-xl shadow-[#25D366]/30 hover:-translate-y-1 transition-all duration-300 ${
          showScrollTop ? "bottom-24" : "bottom-6"
        }`}
      >
        <Icon icon="mdi:whatsapp" className="text-white text-3xl" />
      </a>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Volver arriba"
        className={`fixed right-6 bottom-6 z-50 w-14 h-14 rounded-full bg-brand-600 hover:bg-brand-700 flex items-center justify-center shadow-xl shadow-brand-500/30 hover:-translate-y-1 transition-all duration-300 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <Icon icon="mdi:chevron-up" className="text-white text-3xl" />
      </button>

      <CookieBanner />
    </>
  );
};

export default Home;


function Hero() {
  const citas = useCounter(50000, { suffix: "+" });
  const usuarios = useCounter(5000, { suffix: "+" });

  return (
    <section className="hero-bg grid-pattern min-h-screen flex items-center pt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-xl mx-auto text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              <span className="text-xs font-semibold text-slate-600 tracking-wide uppercase">
                Disponible ahora
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-800 tracking-tight leading-[1.08] mb-6 animate-slide-up">
              Organiza todas tus citas
              <span className="gradient-text"> en segundos.</span>
            </h1>

            <p
              className="text-lg lg:text-xl text-slate-500 leading-relaxed mb-8 animate-slide-up"
              style={{ animationDelay: "0.15s" }}
            >
              La forma más rápida, inteligente y moderna de gestionar citas
              médicas, reuniones empresariales y reservas desde un solo lugar.
            </p>

            <div
              className="flex flex-wrap gap-3 mb-10 animate-slide-up justify-center lg:justify-start"
              style={{ animationDelay: "0.3s" }}
            >
              <a
                href="#descargar"
                className="btn-shine inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-7 py-3.5 rounded-2xl transition-all shadow-xl shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5"
              >
                <Icon icon="mdi:download" className="text-xl" />
                Descargar App
              </a>
              <a
                href="#descargar"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-brand-800 font-semibold px-7 py-3.5 rounded-2xl transition-all border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                Comenzar Gratis
              </a>
            </div>

            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-slide-up"
              style={{ animationDelay: "0.45s" }}
            >
              <div className="text-center sm:text-left">
                <div ref={citas.ref} className="text-2xl font-bold text-brand-800">
                  {citas.display}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">Citas creadas</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-brand-800">
                  99.9<span className="text-brand-600">%</span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">Disponibilidad</div>
              </div>
              <div className="text-center sm:text-left">
                <div ref={usuarios.ref} className="text-2xl font-bold text-brand-800">
                  {usuarios.display}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">Usuarios activos</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-brand-800">
                  &lt;30<span className="text-brand-600">s</span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">Por cita</div>
              </div>
            </div>
          </div>

          <div
            className="relative flex justify-center lg:justify-end animate-scale-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-brand-200/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-brand-100/30 rounded-full blur-3xl pointer-events-none" />

            <div className="hidden lg:block absolute -left-8 top-24 glass-strong rounded-2xl p-4 shadow-xl animate-float z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                  <Icon icon="mdi:check-circle" className="text-brand-600 text-xl" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-brand-800">Cita confirmada</div>
                  <div className="text-xs text-slate-500">Dr. Martínez · 10:00 AM</div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block absolute -right-4 bottom-32 glass-strong rounded-2xl p-4 shadow-xl animate-float-delayed z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                  <Icon icon="mdi:bell-ring" className="text-brand-600 text-xl" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-brand-800">Recordatorio</div>
                  <div className="text-xs text-slate-500">Reunión en 30 min</div>
                </div>
              </div>
            </div>

            <PhoneMockup />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-slate-400 font-medium">Descubre más</span>
        <Icon icon="mdi:chevron-down" className="text-xl text-slate-400" />
      </div>
    </section>
  );
}

function PhoneMockup() {
  const dayData = [
    { day: "Lun", n: "12" },
    { day: "Mar", n: "13" },
    { day: "Mié", n: "14", active: true },
    { day: "Jue", n: "15" },
    { day: "Vie", n: "16" },
  ];

  return (
    <div className="phone-mockup w-[280px] sm:w-[300px] animate-float">
      <div className="phone-screen">
        <div className="bg-navy-900 text-white px-6 pt-3 pb-2 flex items-center justify-between text-xs font-medium">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <Icon icon="mdi:signal-cellular-3" className="text-sm" />
            <Icon icon="mdi:wifi-strength-3" className="text-sm" />
            <Icon icon="mdi:battery-70" className="text-sm" />
          </div>
        </div>

        <div className="bg-white px-5 pt-4 pb-3 border-b border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-slate-400 font-medium">Buenos días</p>
              <p className="text-base font-bold text-brand-800">Mi Agenda</p>
            </div>
            <img src="/img/Favicon y logo app.png" alt="CreaTuCita app" className="app-icon-sm" />
          </div>
          <div className="flex gap-2">
            {dayData.map((d) => (
              <div
                key={d.day}
                className={`flex-1 text-center py-2 rounded-xl text-xs ${
                  d.active
                    ? "bg-brand-600 text-white shadow-lg shadow-brand-500/30"
                    : "bg-slate-50 text-slate-500"
                }`}
              >
                <div className="font-medium">{d.day}</div>
                <div className="font-bold text-sm mt-0.5">{d.n}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 py-4 space-y-3 bg-slate-50">
          <Appointment
            barColor="bg-brand-500"
            title="Consulta médica"
            subtitle="Dr. Carlos Martínez"
            time="10:00"
            status="Confirmada"
          />
          <Appointment
            barColor="bg-navy-700"
            title="Reunión equipo"
            subtitle="Sala de conferencias B"
            time="14:30"
            status="Pendiente"
            pending
          />
          <Appointment
            barColor="bg-brand-700"
            title="Asesoría legal"
            subtitle="Abog. Ana López"
            time="17:00"
            status="Confirmada"
          />
        </div>

        <div className="bg-white border-t border-slate-100 px-6 py-2.5 flex items-center justify-around">
          <Tab active icon="mdi:home" label="Inicio" />
          <Tab icon="mdi:calendar-month" label="Agenda" />
          <div className="relative -mt-5">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg shadow-brand-500/30">
              <img src="/img/Favicon y logo app.png" alt="" className="w-full h-full object-cover" />
            </div>
          </div>
          <Tab icon="mdi:account-group" label="Clientes" />
          <Tab icon="mdi:cog" label="Ajustes" />
        </div>
      </div>
    </div>
  );
}

function Appointment({ barColor, title, subtitle, time, status, pending }) {
  return (
    <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100">
      <div className="flex items-start gap-3">
        <div className={`w-1 h-12 rounded-full ${barColor} mt-0.5`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-brand-800 truncate">{title}</p>
          <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Icon icon="mdi:clock-outline" className="text-sm" /> {time}
            </span>
            <span
              className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                pending
                  ? "text-slate-600 bg-slate-100"
                  : "text-brand-600 bg-brand-50"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  pending ? "bg-slate-500" : "bg-brand-500"
                }`}
              />
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tab({ icon, label, active }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <Icon
        icon={icon}
        className={`text-xl ${active ? "text-brand-600" : "text-slate-400"}`}
      />
      <span
        className={`text-[10px] font-medium ${
          active ? "text-brand-600" : "text-slate-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function TrustMarquee() {
  return (
    <section className="py-10 border-y border-slate-100 bg-white overflow-hidden">
      <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
        Usado por profesionales en
      </p>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="marquee-track animate-marquee">
          <div className="flex items-center gap-16 px-8">
            {TRUST_SECTORS.map((s) => (
              <span
                key={s}
                className="text-xl font-bold text-slate-300 whitespace-nowrap tracking-tight"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-16 px-8">
            {TRUST_SECTORS.map((s) => (
              <span
                key={`b-${s}`}
                className="text-xl font-bold text-slate-300 whitespace-nowrap tracking-tight"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefits({ sectionRef }) {
  return (
    <section id="beneficios" className="py-24 lg:py-32 relative" ref={sectionRef}>
      <div className="absolute inset-0 dot-pattern opacity-50 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold uppercase tracking-wide mb-4">
            <Icon icon="mdi:star-four-points" />
            Beneficios
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-brand-800 tracking-tight mb-4">
            Agenda más. <span className="gradient-text">Trabaja mejor.</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            Todo lo que necesitas para gestionar tus citas de forma inteligente,
            sin complicaciones.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BENEFITS.map((b, i) => (
            <div
              key={b.title}
              className={`glass-strong rounded-2xl p-6 card-hover reveal reveal-delay-${(i % 4) + 1}`}
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center mb-4">
                <Icon icon={b.icon} className="text-2xl text-brand-600" />
              </div>
              <h3 className="text-base font-bold text-brand-800 mb-2">{b.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyCreaTuCita({ sectionRef }) {
  return (
    <section
      id="por-que"
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold uppercase tracking-wide mb-4">
            <Icon icon="mdi:lightning-bolt" />
            ¿Por qué CreaTuCita?
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-brand-800 tracking-tight mb-4">
            La agenda inteligente que{" "}
            <span className="gradient-text">siempre necesitaste.</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            No es solo otra app de reservas. Es una nueva forma de organizar tu
            tiempo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_CARDS.map((c, i) => (
            <div
              key={c.title}
              className={`glass-strong rounded-2xl p-6 card-hover reveal reveal-delay-${(i % 3) + 1}`}
            >
              <div className="flex items-center gap-4 mb-3">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center shadow-lg ${c.shadow} flex-shrink-0`}
                >
                  <Icon icon={c.icon} className="text-white text-xl" />
                </div>
                <h3 className="text-lg font-bold text-brand-800">{c.title}</h3>
              </div>
              <p className="text-slate-500 leading-relaxed text-sm">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience({ sectionRef }) {
  const timerRef = useRef(null);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const node = timerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const id = setInterval(() => {
            setSeconds((s) => (s <= 0 ? 30 : s - 1));
          }, 1000);
          observer.disconnect();
          return () => clearInterval(id);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const formatted = `00:${seconds < 10 ? "0" + seconds : seconds}`;

  return (
    <section
      id="demo"
      className="py-24 lg:py-32 relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-300 text-xs font-semibold uppercase tracking-wide mb-6 border border-white/10">
              <Icon icon="mdi:timer-sand" />
              Experiencia
            </div>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Todo ocurre <br />
              <span className="gradient-text">en segundos.</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-10">
              Menos tiempo organizando. Más tiempo haciendo crecer tu negocio.
            </p>

            <div className="space-y-5">
              <Bullet icon="mdi:lightning-bolt" iconClass="text-brand-400" title="Programa una cita en menos de 30 segundos" desc="Tres taps y listo. Así de simple es agendar con CreaTuCita." />
              <Bullet icon="mdi:phone-off" iconClass="text-brand-400" title="Sin procesos complicados" desc="Sin llamadas. Sin mensajes. Sin pérdidas de tiempo." />
              <Bullet icon="mdi:monitor-clean" iconClass="text-brand-300" title="Interfaz limpia e intuitiva" desc="Cada pixel está diseñado para que no pienses, solo actúes." />
              <Bullet icon="mdi:robot-happy" iconClass="text-brand-400" title="Automatización total" desc="Confirmaciones, recordatorios y seguimientos sin que muevas un dedo." />
            </div>
          </div>

          <div className="reveal reveal-delay-2 flex justify-center" ref={timerRef}>
            <div className="relative">
              <div className="absolute inset-0 bg-brand-500/20 rounded-3xl blur-3xl scale-110" />
              <div className="relative glass-dark rounded-3xl p-8 border border-white/10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-4 border-brand-500/30 relative">
                    <div
                      className="absolute inset-2 rounded-full border-4 border-transparent border-t-brand-500 animate-spin"
                      style={{ animationDuration: "2s" }}
                    />
                    <div className="text-center">
                      <div className="text-3xl font-extrabold text-white">
                        {formatted}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">segundos</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 mt-4">
                    Tiempo promedio para agendar una cita
                  </p>
                </div>
                <div className="space-y-4">
                  {[
                    "Selecciona el tipo de cita",
                    "Elige fecha y hora",
                    "Confirma y listo",
                  ].map((t, i) => (
                    <div
                      key={t}
                      className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5"
                    >
                      <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {i + 1}
                      </div>
                      <span className="text-sm text-white font-medium">{t}</span>
                      <Icon
                        icon="mdi:check-circle"
                        className="text-brand-400 ml-auto"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bullet({ icon, iconClass, desc, title }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon icon={icon} className={`${iconClass} text-lg`} />
      </div>
      <div>
        <h4 className="text-white font-semibold mb-1">{title}</h4>
        <p className="text-sm text-slate-400">{desc}</p>
      </div>
    </div>
  );
}

function Features({ sectionRef }) {
  return (
    <section id="funcionalidades" className="py-24 lg:py-32 bg-white relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold uppercase tracking-wide mb-4">
            <Icon icon="mdi:widget-added" />
            Funcionalidades
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-brand-800 tracking-tight mb-4">
            Todo bajo <span className="gradient-text">control.</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            La forma más sencilla de administrar tus citas. Cada función
            pensada para hacerte la vida más fácil.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`feature-card glass-strong rounded-2xl p-5 card-hover text-center reveal reveal-delay-${(i % 4) + 1}`}
            >
              <div className="feature-icon-wrap w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
                <Icon icon={f.icon} className="text-2xl text-brand-600" />
              </div>
              <h3 className="text-sm font-bold text-brand-800 mb-1.5">{f.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases({ sectionRef }) {
  return (
    <section id="casos" className="py-24 lg:py-32 relative" ref={sectionRef}>
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold uppercase tracking-wide mb-4">
            <Icon icon="mdi:domain" />
            Casos de uso
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-brand-800 tracking-tight mb-4">
            Una app. <span className="gradient-text">Infinitas posibilidades.</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            No importa tu sector. Si trabajas con citas, CreaTuCita es para ti.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {USE_CASES.map((u, i) => (
            <div
              key={u.label}
              className={`use-case-card glass-strong rounded-2xl p-5 text-center cursor-default reveal reveal-delay-${(i % 4) + 1}`}
            >
              <div className="use-case-icon w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-3">
                <Icon icon={u.icon} className="text-2xl text-brand-600" />
              </div>
              <h3 className="text-sm font-bold text-brand-800">{u.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Statistics({ sectionRef }) {
  const citas = useCounter(100000, { suffix: "+" });
  const usuarios = useCounter(5000, { suffix: "+" });

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950" />
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-brand-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-300 text-xs font-semibold uppercase tracking-wide mb-4 border border-white/10">
            <Icon icon="mdi:chart-areaspline" />
            Números que hablan
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-4">
            Cada cita, <span className="gradient-text">perfectamente contada.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard delay={1} valueRef={citas.ref} value={citas.display} label="Citas creadas" />
          <StatCardPlain delay={2} value="99.9%" suffix="Disponibilidad del servicio" />
          <StatCard delay={3} valueRef={usuarios.ref} value={usuarios.display} label="Usuarios satisfechos" />
          <StatCardPlain delay={1} value="<30s" suffix="Agendamiento promedio" />
          <StatCardPlain delay={2} value="24/7" suffix="Reservas disponibles" />
          <StatCardPlain delay={3} value="70%" suffix="Menos cancelaciones" />
        </div>
      </div>
    </section>
  );
}

function StatCard({ delay, valueRef, value, label }) {
  return (
    <div className={`home-stat-card glass-dark rounded-2xl p-8 text-center border border-white/10 reveal reveal-delay-${delay}`}>
      <div ref={valueRef} className="text-4xl lg:text-5xl font-extrabold text-white mb-2">
        {value}
      </div>
      <div className="text-sm text-slate-400">{label}</div>
    </div>
  );
}

function StatCardPlain({ delay, value, suffix }) {
  let main = value;
  let colored = "";
  if (value.endsWith("%")) {
    main = value.slice(0, -1);
    colored = "%";
  } else if (value.endsWith("s")) {
    main = value.slice(0, -1);
    colored = "s";
  } else if (value.endsWith("/7")) {
    main = value.slice(0, -2);
    colored = "/7";
  }
  return (
    <div className={`home-stat-card glass-dark rounded-2xl p-8 text-center border border-white/10 reveal reveal-delay-${delay}`}>
      <div className="text-4xl lg:text-5xl font-extrabold text-white mb-2">
        {main}
        <span className="text-brand-400">{colored}</span>
      </div>
      <div className="text-sm text-slate-400">{suffix}</div>
    </div>
  );
}

function Testimonials({ sectionRef }) {
  return (
    <section id="testimonios" className="py-24 lg:py-32 bg-white relative overflow-hidden" ref={sectionRef}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-50 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold uppercase tracking-wide mb-4">
            <Icon icon="mdi:message-star" />
            Testimonios
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-brand-800 tracking-tight mb-4">
            Lo que dicen quienes <span className="gradient-text">ya la usan.</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            Miles de profesionales confían en CreaTuCita para organizar su día a día.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`testimonial-card glass-strong rounded-2xl p-7 card-hover reveal reveal-delay-${(i % 3) + 1}`}
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, s) => {
                  const isHalf = t.rating === 4.5 && s === 4;
                  return (
                    <Icon
                      key={s}
                      icon={isHalf ? "mdi:star-half-full" : "mdi:star"}
                      className="text-brand-400 text-lg"
                    />
                  );
                })}
              </div>
              <p
                className="text-slate-600 leading-relaxed text-sm mb-6"
                dangerouslySetInnerHTML={{ __html: t.text }}
              />
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.grad} flex items-center justify-center text-white text-sm font-bold`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-bold text-brand-800">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ sectionRef }) {
  return (
    <section id="descargar" className="py-24 lg:py-32 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 cta-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="absolute top-1/4 left-10 w-3 h-3 rounded-full bg-brand-400/30 animate-pulse-slow" />
      <div
        className="absolute top-1/3 right-20 w-2 h-2 rounded-full bg-brand-300/40 animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-1/3 left-1/4 w-4 h-4 rounded-full bg-brand-300/20 animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <div className="reveal">
          <div className="flex justify-center mb-8">
            <img
              src="/img/Logotipo footer.png"
              alt="CreaTuCita"
              className="h-20 sm:h-24 w-auto max-w-full object-contain brightness-0 invert"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-300 text-xs font-semibold uppercase tracking-wide mb-8 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
            Comienza gratis hoy
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Empieza a organizar tus citas
            <br />
            <span className="gradient-text">de forma inteligente.</span>
          </h2>

          <p className="text-lg lg:text-xl text-white leading-relaxed max-w-2xl mx-auto mb-10">
            Descubre por qué cada vez más profesionales y empresas eligen
            CreaTuCita para gestionar su agenda. Sin costo. Sin compromiso.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#"
              className="btn-shine inline-flex items-center gap-3 bg-white hover:bg-slate-50 text-brand-800 font-bold px-8 py-4 rounded-2xl transition-all shadow-2xl shadow-black/20 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
            >
              <img
                src="/img/Favicon y logo app.png"
                alt=""
                role="presentation"
                className="app-icon-sm"
              />
              <div className="text-left">
                <div className="text-[10px] font-medium text-slate-500 leading-none">
                  Descargar ahora
                </div>
                <div className="text-sm font-bold leading-tight">
                  Disponible en iOS y Android
                </div>
              </div>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white">
            <span className="flex items-center gap-1.5">
              <Icon icon="mdi:check-circle" className="text-brand-400" /> Gratis para empezar
            </span>
            <span className="flex items-center gap-1.5">
              <Icon icon="mdi:check-circle" className="text-brand-400" /> Sin tarjeta de crédito
            </span>
            <span className="flex items-center gap-1.5">
              <Icon icon="mdi:check-circle" className="text-brand-400" /> Configuración en 2 minutos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CookieBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem("cookiesAccepted")) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-navy-950 border-t border-white/10">
      <div className="max-w-screen-2xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-400 leading-relaxed text-center sm:text-left">
          Usamos cookies propias y de terceros para mejorar tu experiencia,
          analizar el tráfico y mostrar contenido relevante. Al continuar
          navegando, aceptas nuestra{" "}
          <a href="/privacidad" className="text-brand-400 hover:text-brand-300 underline">
            Política de Privacidad
          </a>
          .
        </p>
        <button
          onClick={accept}
          className="flex-shrink-0 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold transition-all shadow-lg shadow-brand-500/25 whitespace-nowrap"
        >
          Aceptar cookies
        </button>
      </div>
    </div>
  );
}