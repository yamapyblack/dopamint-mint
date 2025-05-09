"use client";
import MintCandy from "@/components/mintCandy";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useState, useRef } from "react";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function MintPage() {
  const [isMintSuccess, setIsMintSuccess] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMintSuccess = () => {
    setIsMintSuccess(true);
  };

  const handleVideoEnded = () => {
    setIsVideoEnded(true);
  };

  const handleShare = async () => {
    const shareData = {
      title: "Dopamint.fun",
      text: "I just minted my NFT on Dopamint.fun!",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(window.location.href);
        alert("URL copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleBackToMint = () => {
    setIsMintSuccess(false);
    setIsVideoEnded(false);
  };

  return (
    <div className="min-h-screen bg-[#0A192F] text-white">
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

          <div className="flex items-center gap-6">
            <div className="flex pt-4 lg:pt-0 w-full items-end justify-center gap-4 dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
              <WalletMultiButtonDynamic />
              {/* <ThemeSwitcher /> */}
            </div>
          </div>
        </div>
      </header>

      {!isMintSuccess ? (
        <section className="py-32 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-8">
                Season1 &ldquo;Celestia vs Abyss&rdquo; is now minting
              </h2>
              <Image
                src="/season1.png"
                alt="Season 1 Collection"
                width={920}
                height={600}
                className="mx-auto mb-12"
              />
              <MintCandy onMintSuccess={handleMintSuccess} />
              <p className="mt-4 text-gray-400 text-lg">0.1 SOL per NFT</p>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-20 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] gap-8">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="max-w-full h-auto"
            onEnded={handleVideoEnded}
          >
            <source src="/mint_effect.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {isVideoEnded && (
            <div className="flex gap-4">
              <button
                onClick={handleShare}
                className="bg-[#FFD700] hover:bg-[#e6c200] text-[#0A192F] font-extrabold py-4 px-8 rounded-full text-2xl transition-colors inline-block tracking-wider"
              >
                Share Your Mint
              </button>
              <button
                onClick={handleBackToMint}
                className="bg-white hover:bg-gray-100 text-[#0A192F] font-extrabold py-4 px-8 rounded-full text-2xl transition-colors inline-block tracking-wider"
              >
                Back to Mint
              </button>
            </div>
          )}
        </section>
      )}
      <Footer />
    </div>
  );
}
