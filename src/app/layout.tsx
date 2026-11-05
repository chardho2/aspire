import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import { SITE_INFO } from "@/lib/site-info";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://chardho-aspire.example.com"),
  title: {
    default: "Chardho Aspire Institute — AI-Powered Learning & Placements",
    template: "%s | Chardho Aspire Institute",
  },
  description:
    "Master in-demand tech skills with Chardho Aspire Institute. Live classes, real projects, AI mentorship, industry certificates and guaranteed placement assistance.",
  keywords: [
    "online courses", "coding bootcamp", "MERN stack", "AI machine learning course",
    "placement assistance", "Chardho Aspire Institute", "Hindupur",
  ],
  openGraph: {
    title: "Chardho Aspire Institute — AI-Powered Learning & Placements",
    description: "Learn tech skills that get you hired. Live classes, real projects, AI mentorship & placement support.",
    type: "website",
    siteName: "Chardho Aspire Institute",
    images: ["/images/hero-students.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chardho Aspire Institute",
    description: "AI-powered learning platform with placement assistance.",
    images: ["/images/hero-students.jpg"],
  },
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE_INFO.name,
  email: SITE_INFO.email,
  telephone: SITE_INFO.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "27-6-127, Lakshminagar, Muddireddy Palli",
    addressLocality: "Hindupur",
    addressRegion: "Andhra Pradesh",
    postalCode: "515201",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#f6f8ff] text-slate-900 antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <ScrollProgress />
        <Header />
        <main>{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
