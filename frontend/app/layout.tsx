import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "MobileTech Atlas",
  description: "Evidence-aware mobile technology and patent research",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
