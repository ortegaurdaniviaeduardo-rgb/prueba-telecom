import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, MessageCircle, MapPin, Facebook, ShieldCheck, Zap, FileText, Store } from "lucide-react";
import logo from "@/assets/logo.png";
import heroPhones from "@/assets/hero-phones.jpg";
import phoneIphone from "@/assets/phone-iphone.jpg";
import phoneSamsung from "@/assets/phone-samsung.jpg";
import phoneXiaomi from "@/assets/phone-xiaomi.jpg";
import client1 from "@/assets/client-1.jpg";
import client2 from "@/assets/client-2.jpg";
import client3 from "@/assets/client-3.jpg";
import client4 from "@/assets/client-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Telecom BL — Celulares a crédito 24 meses sin inicial" },
      { name: "description", content: "Cámbiate al celular que quieres sin pagar cuota inicial. Crédito 24 meses, cuotas fijas desde S/300. Evaluación inmediata por WhatsApp." },
      { property: "og:title", content: "Telecom BL — Celulares a crédito sin inicial" },
      { property: "og:description", content: "Crédito de 24 meses con cuotas desde S/300. Evaluación inmediata por WhatsApp." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const WHATSAPP_NUMBER = "51999999999";
const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

function WhatsappIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.003 3C9.374 3 4 8.373 4 15c0 2.385.696 4.605 1.892 6.475L4 29l7.71-1.85A11.94 11.94 0 0 0 16.003 27C22.632 27 28 21.627 28 15S22.632 3 16.003 3Zm0 21.6a9.55 9.55 0 0 1-4.876-1.33l-.349-.207-4.572 1.097 1.116-4.452-.227-.36A9.6 9.6 0 1 1 16.003 24.6Zm5.535-7.18c-.302-.151-1.79-.882-2.067-.983-.277-.101-.479-.151-.681.152s-.781.983-.958 1.184c-.176.201-.353.227-.655.076-.302-.151-1.276-.47-2.43-1.498-.898-.8-1.504-1.79-1.681-2.092-.176-.302-.019-.465.133-.616.137-.135.302-.353.453-.529.151-.176.201-.302.302-.503.101-.201.05-.378-.025-.529-.076-.151-.681-1.64-.933-2.247-.246-.589-.496-.509-.681-.518l-.581-.01a1.12 1.12 0 0 0-.807.378c-.277.302-1.058 1.033-1.058 2.522 0 1.489 1.083 2.926 1.234 3.127.151.201 2.13 3.254 5.16 4.563.722.311 1.285.497 1.724.636.724.23 1.382.198 1.903.12.581-.087 1.79-.731 2.041-1.437.252-.706.252-1.31.176-1.437-.075-.126-.277-.201-.579-.353Z"/>
    </svg>
  );
}

const STEPS = [
  { n: "1", title: "Elige tu marca", desc: "Mira nuestro catálogo y escoge el equipo que más te gusta." },
  { n: "2", title: "Envía tu DNI por WhatsApp", desc: "Te respondemos al instante con tu evaluación. Sin formularios largos." },
  { n: "3", title: "Recibe tu celular", desc: "Acércate a una de nuestras 5 sedes y llévatelo el mismo día." },
];

type Phone = { name: string; img: string; from: string };
const CATALOG: Record<"Apple" | "Samsung" | "Xiaomi", Phone[]> = {
  Apple: [
    { name: "iPhone 15 Pro Max", img: phoneIphone, from: "S/520/mes" },
    { name: "iPhone 15", img: phoneIphone, from: "S/420/mes" },
    { name: "iPhone 14", img: phoneIphone, from: "S/350/mes" },
    { name: "iPhone 13", img: phoneIphone, from: "S/300/mes" },
  ],
  Samsung: [
    { name: "Galaxy S24 Ultra", img: phoneSamsung, from: "S/490/mes" },
    { name: "Galaxy S24", img: phoneSamsung, from: "S/380/mes" },
    { name: "Galaxy A55", img: phoneSamsung, from: "S/320/mes" },
    { name: "Galaxy A35", img: phoneSamsung, from: "S/300/mes" },
  ],
  Xiaomi: [
    { name: "Xiaomi 14 Pro", img: phoneXiaomi, from: "S/360/mes" },
    { name: "Xiaomi 14", img: phoneXiaomi, from: "S/320/mes" },
    { name: "Redmi Note 13 Pro", img: phoneXiaomi, from: "S/300/mes" },
    { name: "Redmi Note 13", img: phoneXiaomi, from: "S/300/mes" },
  ],
};

const CLIENTS = [
  { img: client1, name: "Carlos M." },
  { img: client2, name: "María R." },
  { img: client3, name: "Luis y Ana" },
  { img: client4, name: "Don Pedro" },
];

function Index() {
  const [tab, setTab] = useState<keyof typeof CATALOG>("Apple");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#inicio" className="flex items-center gap-2">
            <img src={logo} alt="Telecom BL" className="h-10 w-auto sm:h-12" width={512} height={512} />
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#inicio" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Inicio</a>
            <a href="#modelos" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Modelos</a>
            <a href="#como-funciona" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Cómo Funciona</a>
            <a href="#sedes" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Sedes</a>
          </nav>
          <a
            href={waLink("Hola Telecom BL, quiero evaluarme gratis para un crédito de celular.")}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-red)] transition-all hover:bg-primary-glow hover:scale-105 sm:px-5"
            style={{ boxShadow: "var(--shadow-red)" }}
          >
            <span className="hidden sm:inline">Evaluarme Gratis</span>
            <span className="sm:hidden">Evaluarme</span>
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="inicio" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-radial-red)" }} />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Zap className="h-3.5 w-3.5" /> Sin cuota inicial · 24 meses
            </div>
            <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Cámbiate al celular que <span className="text-primary">quieres</span>, sin pagar inicial.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
              Elige tu equipo favorito a crédito por <strong className="text-foreground">24 meses</strong> con cuotas fijas desde <strong className="text-foreground">S/300 mensuales</strong>. Evaluación inmediata por WhatsApp.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={waLink("Hola Telecom BL, quiero solicitar un crédito para un celular.")}
                target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-primary px-7 py-5 text-base font-bold text-primary-foreground transition-all hover:bg-primary-glow hover:scale-[1.02] sm:text-lg"
                style={{ boxShadow: "var(--shadow-red-lg)" }}
              >
                <WhatsappIcon className="h-6 w-6" />
                Solicitar Crédito por WhatsApp
              </a>
              <a href="#modelos" className="inline-flex items-center justify-center rounded-2xl border border-border bg-surface px-7 py-5 text-base font-semibold text-foreground transition-colors hover:bg-surface-2">
                Ver modelos
              </a>
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-3 text-sm text-muted-foreground sm:grid-cols-3">
              {["Sin cuota inicial", "Aprobación en minutos", "5 sedes en Lima"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl opacity-60 blur-3xl" style={{ background: "var(--gradient-radial-red)" }} />
            <img
              src={heroPhones}
              alt="Celulares de gama alta disponibles en Telecom BL"
              width={1536} height={1024}
              className="relative w-full rounded-3xl border border-border/60 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section id="como-funciona" className="bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Cómo funciona</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">Evaluación en 3 pasos simples</h2>
            <p className="mt-4 text-lg text-muted-foreground">Sin trámites largos. Sin papeleo. Solo tu DNI.</p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="group relative rounded-3xl border border-border bg-surface-2 p-8 transition-all hover:border-primary/60">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-4xl font-black text-primary-foreground" style={{ boxShadow: "var(--shadow-red)" }}>
                  {s.n}
                </div>
                <h3 className="mt-6 text-2xl font-bold">{s.title}</h3>
                <p className="mt-3 text-base text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href={waLink("Hola Telecom BL, quiero empezar mi evaluación.")}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-primary px-8 py-5 text-base font-bold text-primary-foreground transition-all hover:bg-primary-glow hover:scale-[1.02] sm:text-lg"
              style={{ boxShadow: "var(--shadow-red-lg)" }}
            >
              <WhatsappIcon className="h-6 w-6" />
              Empezar mi evaluación ahora
            </a>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="modelos" className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Catálogo</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">Modelos destacados</h2>
            <p className="mt-4 text-lg text-muted-foreground">Elige tu marca favorita. Todos a crédito de 24 meses sin inicial.</p>
          </div>

          {/* Tabs */}
          <div className="mt-10 flex justify-center">
            <div className="inline-flex rounded-2xl border border-border bg-surface p-1.5">
              {(Object.keys(CATALOG) as Array<keyof typeof CATALOG>).map((k) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  className={`rounded-xl px-6 py-3 text-base font-semibold transition-all sm:px-8 ${
                    tab === k ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={tab === k ? { boxShadow: "var(--shadow-red)" } : undefined}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CATALOG[tab].map((p) => (
              <article key={p.name} className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-all hover:border-primary/60 hover:-translate-y-1">
                <div className="relative aspect-square overflow-hidden bg-black">
                  <img src={p.img} alt={p.name} loading="lazy" width={768} height={768} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    Cuotas desde {p.from}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-5">
                  <h3 className="text-xl font-bold leading-tight">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">24 meses · Sin cuota inicial</p>
                  <a
                    href={waLink(`Hola Telecom BL, me interesa el ${p.name} a crédito.`)}
                    target="_blank" rel="noopener noreferrer"
                    className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-4 text-base font-bold text-primary-foreground transition-all hover:bg-primary-glow"
                  >
                    <WhatsappIcon className="h-5 w-5" />
                    Me interesa este modelo
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Clientes felices</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">Miles de peruanos ya se cambiaron</h2>
            <p className="mt-4 text-lg text-muted-foreground">Personas reales recibiendo su equipo en nuestras sedes.</p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {CLIENTS.map((c, i) => (
              <figure key={i} className="group relative overflow-hidden rounded-3xl border border-border">
                <img src={c.img} alt={`Cliente feliz ${c.name}`} loading="lazy" width={640} height={640} className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4">
                  <p className="text-sm font-semibold text-white">{c.name}</p>
                  <p className="text-xs text-white/80">Cliente Telecom BL</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, t: "100% Seguro", d: "Contratos formales y respaldo legal." },
              { icon: FileText, t: "Solo tu DNI", d: "Sin garantes ni avales." },
              { icon: Store, t: "5 Sedes en Lima", d: "Recoge tu equipo el mismo día." },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="flex items-start gap-4 rounded-2xl border border-border bg-surface-2 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{t}</h3>
                  <p className="text-sm text-muted-foreground">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-radial-red)" }} />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Tu próximo celular te está esperando.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Evaluación gratuita en menos de 5 minutos. Sin compromiso.
          </p>
          <a
            href={waLink("Hola Telecom BL, quiero solicitar mi crédito ahora.")}
            target="_blank" rel="noopener noreferrer"
            className="mt-10 inline-flex items-center justify-center gap-3 rounded-2xl bg-primary px-10 py-6 text-lg font-bold text-primary-foreground transition-all hover:bg-primary-glow hover:scale-[1.02] sm:text-xl"
            style={{ boxShadow: "var(--shadow-red-lg)" }}
          >
            <WhatsappIcon className="h-7 w-7" />
            Solicitar Crédito por WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="sedes" className="border-t border-border bg-black py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div>
              <img src={logo} alt="Telecom BL" width={512} height={512} className="h-14 w-auto" />
              <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                Celulares a crédito por 24 meses sin cuota inicial. Atención inmediata por WhatsApp.
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold uppercase tracking-wider text-primary">Visítanos en nuestras 5 sedes</h3>
              <div className="mt-4 flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                <p className="text-sm">
                  <span className="font-semibold text-foreground">Sede Principal</span><br />
                  Av. Los Héroes 155, San Juan de Miraflores
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold uppercase tracking-wider text-primary">Síguenos</h3>
              <div className="mt-4 flex gap-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                   className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface transition-colors hover:border-primary hover:text-primary">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                   className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface transition-colors hover:border-primary hover:text-primary">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.07A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V9.01a8.16 8.16 0 0 0 4.77 1.52V7.08a4.85 4.85 0 0 1-1.84-.39Z"/>
                  </svg>
                </a>
                <a href={waLink("Hola Telecom BL")} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                   className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface transition-colors hover:border-primary hover:text-primary">
                  <WhatsappIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Telecom BL. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP — mobile-first */}
      <a
        href={waLink("Hola Telecom BL, quiero solicitar un crédito.")}
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-4 left-4 right-4 z-50 inline-flex items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground transition-all hover:bg-primary-glow md:left-auto md:right-6 md:bottom-6 md:px-6"
        style={{ boxShadow: "var(--shadow-red-lg)" }}
      >
        <WhatsappIcon className="h-6 w-6" />
        <span>Solicitar Crédito por WhatsApp</span>
      </a>
      <div className="h-24 md:hidden" aria-hidden="true" />
    </div>
  );
}
