import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import React from "react";
import { inter, montserrat, spaceGrotesk } from "../lib/fonts/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevFlow",
  description:
    "DevFlow is a stackoverflow clone || github:binitkumarshirsath || DevFlow, Your Premier Platform for Technical Solutions and Collaboration! Explore a dynamic community-driven ecosystem tailored for developers, where knowledge flows seamlessly. Join discussions, ask questions, and share your expertise on DevFlow, the ultimate Stack Overflow clone. Elevate your coding journey with optimized search capabilities, expert insights, and a vibrant community dedicated to empowering developers worldwide. Unleash the power of collaborative problem-solving and stay at the forefront of technological advancements on DevFlow, your go-to destination for all things coding and development.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: "primary-gradient",
          footerActionLink: "primary-text-gradient hover:text-primary-500",
        },
      }}
    >
      <html lang="en">
        <body
          className={`${inter.variable} ${spaceGrotesk.variable} ${montserrat.variable}`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
