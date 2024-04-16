import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { siteConfig } from "../../config/site-config";
import { Toaster } from "sonner";
import "./globals.css";
import CustomProvider from "./provider";
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin-ext"],
  fallback: ["sans-serif"],
});
export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <CustomProvider>
        {children}
        </CustomProvider>
        <Toaster />
      </body>
    </html>
  );
}
