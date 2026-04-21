import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const arabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Omar Al-Absi | عمر العبسي — Lawyer & Legal Consultant",
  description:
    "Law office of Omar Al-Absi — Lawyer and Legal Consultant licensed by the Ministry of Justice, Kingdom of Saudi Arabia. License No. 451716.",
};

export const viewport: Viewport = {
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${arabic.variable}`}>
      <body className="bg-[#020617] antialiased">{children}</body>
    </html>
  );
}
