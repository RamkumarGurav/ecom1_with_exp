import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Providers from "./providers";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: {
    default: "Ramkumar",
    template: "%s | Portfolio",
  },
  description:
    "Welcome to Ramkumar's portfolio. Explore my projects, skills, and experience.",
};

const font = Poppins({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        id="body"
        className={` ${font.className} max-w-[1536px] mx-auto  ||  bg-white  dark:bg-black dark:text-white text-black`}
      >
        <Providers>
          <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
