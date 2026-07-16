import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SoundEffects from "./components/SoundEffects";
import HomeScrollRestoration from "./components/HomeScrollRestoration";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jacklandis.com"),
  title: "Jack Landis",
  description: "The personal website of Jack Landis.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/jack.png" },
  openGraph: {
    title: "Jack Landis",
    description: "The personal website of Jack Landis.",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Jack Landis" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jack Landis",
    description: "The personal website of Jack Landis.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var entry=performance.getEntriesByType('navigation')[0];var reload=(entry&&entry.type==='reload')||(performance.navigation&&performance.navigation.type===1);var saved=sessionStorage.getItem('jack-landis-home-scroll');if(location.pathname==='/'&&reload&&saved!==null){history.scrollRestoration='manual';document.documentElement.classList.add('home-scroll-restoring')}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <HomeScrollRestoration />
        <SoundEffects />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
