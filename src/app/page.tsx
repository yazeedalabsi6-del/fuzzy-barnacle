"use client";

import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";

type Lang = "en" | "ar";

const WHATSAPP_URL = "https://wa.me/966537880684";
const PHONE_DISPLAY = "0537880684";
const LICENSE_NO = "451716";

const copy = {
  en: {
    dir: "ltr" as const,
    fontClass: "font-serif",
    brand: "Omar Al-Absi",
    brandAlt: "عمر العبسي",
    nav: { services: "Practice", about: "Profile", contact: "Contact" },
    langToggle: "العربية",
    heroEyebrow: "Attorney-at-Law · Kingdom of Saudi Arabia",
    heroTitle: "Lawyer & Legal Consultant",
    heroTagline:
      "Counsel for founders, corporations and private clients across the Kingdom — delivered with the rigor the courts demand and the discretion a case deserves.",
    licenseTag: "Ministry of Justice · Licensed Practitioner",
    licenseLabel: "License No.",
    servicesEyebrow: "Areas of Practice",
    servicesTitle: "Counsel built on precision and precedent.",
    services: [
      {
        code: "I",
        title: "Corporate Law",
        desc: "Company formation, shareholder agreements, governance, M&A, and regulatory compliance for Saudi and cross-border entities.",
      },
      {
        code: "II",
        title: "Litigation",
        desc: "Representation before commercial, labor, and general courts — pleadings, evidence strategy, and full case management through judgment.",
      },
      {
        code: "III",
        title: "Legal Consulting",
        desc: "Retainer advisory, contract review, legal opinions and risk memoranda — delivered with clarity, confidentiality, and speed.",
      },
    ],
    ctaEyebrow: "Direct Contact",
    ctaTitle: "Speak directly with the office.",
    ctaDesc:
      "Replies are personal and typically within the hour. Every enquiry is treated as privileged and confidential.",
    whatsapp: "Contact via WhatsApp",
    phoneLabel: "Direct line",
    footerNote:
      "This website does not constitute legal advice. All communications are treated as confidential.",
    rights: "All rights reserved.",
  },
  ar: {
    dir: "rtl" as const,
    fontClass: "font-arabic",
    brand: "عمر العبسي",
    brandAlt: "Omar Al-Absi",
    nav: { services: "الخدمات", about: "نبذة", contact: "تواصل" },
    langToggle: "English",
    heroEyebrow: "محامٍ أمام المحاكم السعودية",
    heroTitle: "محامٍ ومستشار قانوني",
    heroTagline:
      "نقدّم الاستشارة للمؤسسين والشركات والأفراد في جميع أنحاء المملكة، بالدقة التي تتطلبها المحاكم وبالسرية التي تستحقها القضية.",
    licenseTag: "مرخّص من وزارة العدل — المملكة العربية السعودية",
    licenseLabel: "رقم الترخيص",
    servicesEyebrow: "مجالات الممارسة",
    servicesTitle: "استشارة مبنية على الدقة والسوابق.",
    services: [
      {
        code: "١",
        title: "القانون التجاري",
        desc: "تأسيس الشركات، اتفاقيات المساهمين، الحوكمة، الاندماج والاستحواذ، والالتزام التنظيمي محلياً ودولياً.",
      },
      {
        code: "٢",
        title: "التقاضي",
        desc: "التمثيل أمام المحاكم التجارية والعمالية والعامة — إعداد المذكرات، استراتيجية الإثبات، وإدارة القضية حتى صدور الحكم.",
      },
      {
        code: "٣",
        title: "الاستشارات القانونية",
        desc: "استشارات بنظام الاتفاقية، مراجعة العقود، الآراء القانونية ومذكرات المخاطر — بوضوح وسرية تامة.",
      },
    ],
    ctaEyebrow: "تواصل مباشر",
    ctaTitle: "تواصل مباشر مع المكتب.",
    ctaDesc:
      "الردود شخصية وعادةً خلال الساعة. تُعامل كل مراسلة بسرية تامة وامتياز مهني.",
    whatsapp: "تواصل عبر واتساب",
    phoneLabel: "الخط المباشر",
    footerNote:
      "لا يُعدّ هذا الموقع استشارة قانونية. تُعامل جميع المراسلات بسرية تامة.",
    rights: "جميع الحقوق محفوظة.",
  },
};

const GOLD = "#C5A059";
const MIDNIGHT = "#020617";

function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y, filter: "blur(8px)" }
      }
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function TiltSurface({
  children,
  className = "",
  tilt = 10,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rX = useSpring(useTransform(my, [-0.5, 0.5], [tilt, -tilt]), {
    stiffness: 220,
    damping: 18,
  });
  const rY = useSpring(useTransform(mx, [-0.5, 0.5], [-tilt, tilt]), {
    stiffness: 220,
    damping: 18,
  });
  const glareX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(my, [-0.5, 0.5], ["0%", "100%"]);
  const glareBg = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgba(197,160,89,0.16), transparent 55%)`;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: rX,
        rotateY: rY,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
      className={className}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          style={{ background: glareBg }}
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
        />
      )}
    </motion.div>
  );
}

function MonogramMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="46"
        height="46"
        rx="6"
        stroke={GOLD}
        strokeWidth="1.25"
      />
      <path
        d="M14 34V18l10 12 10-12v16"
        stroke={GOLD}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="38" r="1.2" fill={GOLD} />
    </svg>
  );
}

function ScalesIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path
        d="M32 8v48M12 20h40M20 20l-8 16a8 8 0 0 0 16 0l-8-16Zm24 0-8 16a8 8 0 0 0 16 0l-8-16ZM20 56h24"
        stroke={GOLD}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GavelIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path
        d="m14 50 20-20m-6-10 16 16m-22-22 22 22M12 54h24"
        stroke={GOLD}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path
        d="M12 14h18a8 8 0 0 1 8 8v28M52 14H34a8 8 0 0 0-8 8v28M12 14v36h18M52 14v36H34"
        stroke={GOLD}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ICONS = [ScalesIcon, GavelIcon, BookIcon];

export default function Page() {
  const [lang, setLang] = useState<Lang>("en");
  const t = copy[lang];
  const isAR = lang === "ar";

  const { scrollY } = useScroll();
  const bgGridY = useTransform(scrollY, [0, 1600], [0, -240]);
  const orbY = useTransform(scrollY, [0, 1600], [0, 280]);
  const orb2Y = useTransform(scrollY, [0, 1600], [0, -180]);
  const heroContentY = useTransform(scrollY, [0, 700], [0, -140]);
  const heroContentOpacity = useTransform(scrollY, [0, 520], [1, 0]);

  return (
    <main
      dir={t.dir}
      lang={lang}
      className={`relative min-h-screen overflow-x-hidden bg-[#020617] text-white ${t.fontClass}`}
    >
      {/* Parallax backdrop */}
      <motion.div
        aria-hidden
        style={{ y: bgGridY }}
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.18]"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(197,160,89,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,89,0.25) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ y: orbY }}
        className="pointer-events-none fixed -left-40 top-40 -z-10 h-[520px] w-[520px] rounded-full bg-[#C5A059] opacity-[0.08] blur-[120px]"
      />
      <motion.div
        aria-hidden
        style={{ y: orb2Y }}
        className="pointer-events-none fixed -right-60 top-[60vh] -z-10 h-[640px] w-[640px] rounded-full bg-[#C5A059] opacity-[0.06] blur-[140px]"
      />

      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#020617]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
          <div className="flex items-center gap-3">
            <MonogramMark className="h-9 w-9" />
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] uppercase tracking-[0.32em] text-white/60">
                Attorney
              </span>
              <span className="text-sm font-medium tracking-wide text-white">
                {isAR ? (
                  <>عمر العبسي <span className="text-white/40 mx-1">|</span> Omar Al-Absi</>
                ) : (
                  <>Omar Al-Absi <span className="text-white/40 mx-1">|</span> عمر العبسي</>
                )}
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-10 text-[11px] uppercase tracking-[0.32em] text-white/70 md:flex">
            <a href="#practice" className="transition hover:text-[#C5A059]">
              {t.nav.services}
            </a>
            <a href="#profile" className="transition hover:text-[#C5A059]">
              {t.nav.about}
            </a>
            <a href="#contact" className="transition hover:text-[#C5A059]">
              {t.nav.contact}
            </a>
          </nav>

          <button
            onClick={() => setLang(isAR ? "en" : "ar")}
            className="group relative rounded-full border border-[#C5A059]/40 px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-[#C5A059] transition hover:bg-[#C5A059] hover:text-[#020617]"
            aria-label="Toggle language"
          >
            {t.langToggle}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center pt-32">
        <motion.div
          style={{ y: heroContentY, opacity: heroContentOpacity }}
          className="mx-auto w-full max-w-7xl px-6 md:px-10"
        >
          <Reveal delay={0.05}>
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#C5A059]/30 bg-white/[0.02] px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-[#C5A059]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059]" />
              {t.heroEyebrow}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mb-2 flex items-baseline gap-4 text-white/60">
              <span className="text-[11px] uppercase tracking-[0.4em]">
                {isAR ? "المحامي" : "Counsel"}
              </span>
              <span className="h-px flex-1 max-w-[80px] bg-[#C5A059]/40" />
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <h1
              className={`${
                isAR ? "font-arabic" : "font-serif"
              } text-[15vw] leading-[0.88] tracking-tight md:text-[120px]`}
            >
              {t.brand}
            </h1>
          </Reveal>
          <Reveal delay={0.38}>
            <p
              className={`${
                isAR ? "font-serif" : "font-arabic"
              } mt-2 text-2xl text-white/45 md:text-3xl`}
            >
              {t.brandAlt}
            </p>
          </Reveal>

          <Reveal delay={0.55}>
            <div className="mt-10 grid items-end gap-10 md:grid-cols-12">
              <div className="md:col-span-7">
                <h2 className="text-2xl font-light text-white md:text-4xl">
                  {t.heroTitle}
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60">
                  {t.heroTagline}
                </p>
              </div>

              {/* License badge */}
              <div className="md:col-span-5">
                <TiltSurface
                  tilt={8}
                  className="relative rounded-2xl border border-[#C5A059]/40 bg-gradient-to-br from-white/[0.04] to-transparent p-6 shadow-[0_0_60px_-20px_rgba(197,160,89,0.35)]"
                >
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-[#C5A059]/80">
                    <span>{t.licenseTag}</span>
                    <MonogramMark className="h-5 w-5" />
                  </div>
                  <div className="mt-6 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.32em] text-white/50">
                        {t.licenseLabel}
                      </p>
                      <p className="mt-1 font-serif text-5xl text-[#C5A059] md:text-6xl">
                        {LICENSE_NO}
                      </p>
                    </div>
                    <div className="flex flex-col items-end text-right text-[10px] uppercase tracking-[0.28em] text-white/40">
                      <span>KSA</span>
                      <span className="mt-1">Est. Practice</span>
                    </div>
                  </div>
                  <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent" />
                  <p className="mt-4 text-xs leading-relaxed text-white/50">
                    {isAR
                      ? "ترخيص مزاولة المهنة صادر من وزارة العدل في المملكة العربية السعودية."
                      : "Professional licence issued by the Ministry of Justice, Kingdom of Saudi Arabia."}
                  </p>
                </TiltSurface>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.8}>
            <div className="mt-16 flex items-center gap-4 text-[11px] uppercase tracking-[0.32em] text-white/50">
              <span>{isAR ? "مرّر للأسفل" : "Scroll"}</span>
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block h-6 w-px bg-[#C5A059]/60"
              />
            </div>
          </Reveal>
        </motion.div>
      </section>

      {/* Practice */}
      <section
        id="practice"
        className="relative py-32 md:py-44"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-20 grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-4">
              <Reveal>
                <p className="text-[11px] uppercase tracking-[0.32em] text-[#C5A059]">
                  {t.servicesEyebrow}
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <Reveal delay={0.08}>
                <h2 className="font-serif text-4xl leading-[1.05] md:text-6xl">
                  {t.servicesTitle}
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {t.services.map((s, i) => {
              const Icon = ICONS[i];
              return (
                <Reveal key={s.title} delay={0.1 + i * 0.12} y={60}>
                  <TiltSurface
                    tilt={9}
                    className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8 transition-colors hover:border-[#C5A059]/50"
                  >
                    <div className="flex items-start justify-between">
                      <Icon className="h-12 w-12" />
                      <span className="font-serif text-3xl text-[#C5A059]/50">
                        {s.code}
                      </span>
                    </div>
                    <h3 className="mt-10 font-serif text-3xl text-white">
                      {s.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-white/60">
                      {s.desc}
                    </p>
                    <div className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-[#C5A059]">
                      <span className="h-px w-6 bg-[#C5A059]" />
                      {isAR ? "استشارة" : "Advise"}
                    </div>
                  </TiltSurface>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA / Contact */}
      <section
        id="contact"
        className="relative overflow-hidden border-y border-white/5 bg-gradient-to-b from-transparent via-[#C5A059]/[0.04] to-transparent py-32 md:py-44"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid items-center gap-14 md:grid-cols-12">
            <div className="md:col-span-7">
              <Reveal>
                <p className="text-[11px] uppercase tracking-[0.32em] text-[#C5A059]">
                  {t.ctaEyebrow}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 font-serif text-4xl leading-[1.05] md:text-6xl">
                  {t.ctaTitle}
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60">
                  {t.ctaDesc}
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-10 flex flex-col gap-4 text-sm text-white/70 sm:flex-row sm:items-center sm:gap-10">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.32em] text-white/40">
                      {t.phoneLabel}
                    </p>
                    <a
                      href={`tel:+966${PHONE_DISPLAY.slice(1)}`}
                      className="mt-1 block font-serif text-2xl text-white transition hover:text-[#C5A059]"
                      dir="ltr"
                    >
                      {PHONE_DISPLAY}
                    </a>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.32em] text-white/40">
                      {t.licenseLabel}
                    </p>
                    <p className="mt-1 font-serif text-2xl text-[#C5A059]" dir="ltr">
                      {LICENSE_NO}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-5">
              <Reveal delay={0.2} y={30}>
                <TiltSurface
                  tilt={12}
                  className="relative overflow-hidden rounded-2xl border border-[#C5A059]/50 bg-[#C5A059] p-[1px] shadow-[0_30px_80px_-20px_rgba(197,160,89,0.55)]"
                >
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-full w-full flex-col justify-between rounded-[15px] bg-[#020617] p-8"
                  >
                    <div className="flex items-center justify-between">
                      <svg
                        viewBox="0 0 32 32"
                        className="h-8 w-8"
                        fill={GOLD}
                        aria-hidden
                      >
                        <path d="M16 3C9 3 3.5 8.5 3.5 15.5c0 2.3.6 4.4 1.7 6.3L3 29l7.4-2.1c1.8 1 3.9 1.6 6.1 1.6h.1c7 0 12.5-5.5 12.5-12.5S23 3 16 3Zm0 22.9c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4.4 1.3 1.3-4.3-.3-.4c-1.1-1.7-1.7-3.6-1.7-5.7 0-5.8 4.7-10.5 10.5-10.5S26.5 9.3 26.5 15.1 21.8 25.9 16 25.9Zm6-7.9c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2s-.8 1-1 1.2c-.2.2-.4.2-.7 0-.3-.2-1.4-.5-2.6-1.6-1-.9-1.7-2-1.9-2.3-.2-.3 0-.5.1-.7.1-.2.3-.3.4-.5.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.6-1.6-.9-2.2-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.4 5.4 4.8.8.3 1.4.5 1.8.6.8.2 1.5.2 2 .1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.2-.3-.3-.6-.5Z" />
                      </svg>
                      <span className="text-[10px] uppercase tracking-[0.32em] text-[#C5A059]">
                        24 / 7
                      </span>
                    </div>
                    <div className="mt-14">
                      <p className="text-[10px] uppercase tracking-[0.32em] text-white/40">
                        {isAR ? "الطريقة المفضلة للتواصل" : "Preferred channel"}
                      </p>
                      <p className="mt-3 font-serif text-3xl text-white transition group-hover:text-[#C5A059] md:text-4xl">
                        {t.whatsapp}
                      </p>
                      <div className="mt-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-[#C5A059]">
                        <span>+966 53 788 0684</span>
                        <span className="h-px flex-1 bg-[#C5A059]/40" />
                        <span aria-hidden>→</span>
                      </div>
                    </div>
                  </a>
                </TiltSurface>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="profile" className="relative border-t border-white/5 pb-10 pt-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3">
                <MonogramMark className="h-10 w-10" />
                <div className="flex flex-col leading-tight">
                  <span className="text-[11px] uppercase tracking-[0.32em] text-white/50">
                    {isAR ? "مكتب المحامي" : "Law Office"}
                  </span>
                  <span className="font-serif text-xl text-white">
                    Omar Al-Absi <span className="text-white/30">|</span>{" "}
                    <span className="font-arabic">عمر العبسي</span>
                  </span>
                </div>
              </div>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/50">
                {t.footerNote}
              </p>
            </div>

            <div className="md:col-span-3">
              <p className="text-[10px] uppercase tracking-[0.32em] text-white/40">
                {t.phoneLabel}
              </p>
              <a
                href={`tel:+966${PHONE_DISPLAY.slice(1)}`}
                dir="ltr"
                className="mt-2 block font-serif text-2xl text-white transition hover:text-[#C5A059]"
              >
                {PHONE_DISPLAY}
              </a>
            </div>

            <div className="md:col-span-2">
              <p className="text-[10px] uppercase tracking-[0.32em] text-white/40">
                {t.licenseLabel}
              </p>
              <p className="mt-2 font-serif text-2xl text-[#C5A059]" dir="ltr">
                {LICENSE_NO}
              </p>
            </div>

            <div className="md:col-span-2 md:text-right">
              <p className="text-[10px] uppercase tracking-[0.32em] text-white/40">
                {isAR ? "الاتصال" : "Contact"}
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 font-serif text-lg text-white transition hover:text-[#C5A059]"
              >
                WhatsApp <span aria-hidden>↗</span>
              </a>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 text-[10px] uppercase tracking-[0.32em] text-white/40 md:flex-row md:items-center">
            <span>
              © {new Date().getFullYear()} Omar Al-Absi. {t.rights}
            </span>
            <span>
              {isAR ? "رقم الترخيص" : "License"} · {LICENSE_NO}
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
