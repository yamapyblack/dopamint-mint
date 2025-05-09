"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A192F]/90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/dopamint-logo.png"
            alt="Dopamint.fun Logo"
            width={240}
            height={45}
            className="h-12 w-auto"
          />
        </Link>
      </div>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex pt-4 lg:pt-0 w-full items-end justify-center gap-4 dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <WalletMultiButtonDynamic />
        </div>
      </div>
    </header>
  );
};

export default Header;
