import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthWrapper } from "@/modules/auth";
import { ThemeProvider } from "@/modules/shared/theme/ThemeProvider";
import { getThemeInitScript } from "@/modules/shared/theme/themeInitScript";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Milly",
  description: "Milly frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} min-h-dvh antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: getThemeInitScript(),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col text-foreground transition-colors duration-150" suppressHydrationWarning>
        <AuthWrapper>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthWrapper>
      </body>
    </html>
  );
}

