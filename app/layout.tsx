import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css"; // Global styles

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Error_CCx404 | Where Builders Debug the Future",
  description:
    "Error_CCx404 is a DevOps and innovation community under Saptech, focusing on software development, cybersecurity, robotics, IoT, hackathons, and startup innovation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="antialiased min-h-screen flex flex-col relative overflow-x-hidden"
        suppressHydrationWarning
      >
        <div className="scanline"></div>
        <div className="fixed inset-0 grid-bg z-[-1]"></div>
        {children}
      </body>
    </html>
  );
}
