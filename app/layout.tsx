import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import NoiseOverlay from "./components/NoiseOverlay";
import PrintChrome from "./components/PrintChrome";
import StopThePress from "./components/StopThePress";
import PrintEditionButton from "./components/PrintEditionButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
});
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-hand" });

export const metadata: Metadata = {
  title: "Parandhama Reddy | Full Stack Developer",
  description: "Portfolio of Parandhama Reddy Bommaka - Full Stack Developer specializing in modern web applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} ${caveat.variable} ${inter.className}`}>
        <NoiseOverlay />
        <PrintChrome />
        <StopThePress />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <PrintEditionButton />
      </body>
    </html>
  );
}
