import type { Metadata } from "next";

import "../globals.css";
import React from "react";
// eslint-disable-next-line camelcase
import { Inter, Montserrat, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-spaceGrotesk",
});

const montSerrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevFlow",
  description:
    "DevFlow is a stackoverflow clone || github:binitkumarshirsath,DevFlow, Your Premier Platform for Technical Solutions and Collaboration! Explore a dynamic community-driven ecosystem tailored for developers, where knowledge flows seamlessly. Join discussions, ask questions, and share your expertise on DevFlow, the ultimate Stack Overflow clone. Elevate your coding journey with optimized search capabilities, expert insights, and a vibrant community dedicated to empowering developers worldwide. Unleash the power of collaborative problem-solving and stay at the forefront of technological advancements on DevFlow, your go-to destination for all things coding and development.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${spaceGrotesk.variable} ${montSerrat.variable} ${inter.variable}`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
