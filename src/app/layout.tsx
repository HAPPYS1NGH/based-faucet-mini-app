import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TmaSDKProvider } from "@/components/tma";
import "@rainbow-me/rainbowkit/styles.css";
import dynamic from "next/dynamic";
import Web3ModalProvider from "@/context";
const Header = dynamic(() => import("@/components/shared/Header"), {
  ssr: false,
});
import Footer from "@/components/shared/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Based Faucet",
  description: "A mini app for dripping faucet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}  bg-black text-white`}>
        <TmaSDKProvider>
          <Web3ModalProvider>
            <Header />
            {children}
            <Footer />
          </Web3ModalProvider>
        </TmaSDKProvider>
      </body>
    </html>
  );
}
