import FooterBottom from "@/components/Layout/Frontend/Footer/FooterBottom";
import Navbar3Persist from "@/components/Layout/Frontend/Navbar/Navbar3Persist";
import ScrollToTop from "@/components/Layout/Frontend/Stickers/ScrollToTop";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`bg-black `}>
      <NextTopLoader color="#ff2424" />
      <Navbar3Persist />
      <main className={`overflow-hidden`}>{children}</main>
      <ScrollToTop />
      <FooterBottom />
    </div>
  );
}
