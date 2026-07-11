import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jack Landis",
  description: "The personal website of Jack Landis.",
  icons: { icon: "/jack.png", shortcut: "/jack.png", apple: "/jack.png" },
  openGraph: {
    title: "Jack Landis",
    description: "The personal website of Jack Landis.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Jack Landis",
    description: "The personal website of Jack Landis.",
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
