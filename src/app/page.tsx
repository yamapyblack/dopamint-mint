import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function Home() {
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
            <a
              href="https://twitter.com/dopamint"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFD700] hover:bg-[#e6c200] text-[#0A192F] font-bold py-2 px-6 rounded-full text-sm transition-colors flex items-center gap-2"
            >
              <Image
                src="/x-icon.png"
                alt="X (Twitter) Icon"
                width={20}
                height={20}
              />
              <span>Follow us</span>
            </a>
            <Link
              href="/mint"
              className="bg-[#FFD700] hover:bg-[#e6c200] text-[#0A192F] font-bold py-2 px-6 rounded-full text-sm transition-colors"
            >
              MINT
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 text-center">
          <p className="text-3xl md:text-4xl font-bold max-w-3xl mx-auto px-4 leading-loose">
            Turning NFT minting
          </p>
          <p className="py-4 text-3xl md:text-4xl font-bold max-w-3xl mx-auto px-4 leading-loose">
            into a dopamine experience
          </p>
        </div>
      </section>

      {/* Content Section 1 */}
      <section className="py-20 px-4">
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
            <Link
              href="/mint"
              className="bg-[#FFD700] hover:bg-[#e6c200] text-[#0A192F] font-extrabold py-4 px-8 rounded-full text-2xl transition-colors inline-block tracking-wider"
            >
              MINT
            </Link>
          </div>
        </div>
      </section>

      {/* Content Section 2 */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-6">
                Real-Time Gacha-Style Reveals
              </h3>
              <p className="text-gray-300 text-xl leading-relaxed">
                Instantly pull your NFT and see right away—no waiting, no
                cooldowns, just pure anticipation like your favorite capsule
                toy.
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-6">
                Built on Metaplex Candy Machine
              </h3>
              <p className="text-gray-300 text-xl leading-relaxed">
                Leverages Solana&apos;s battle-tested engine for truly random,
                on-chain drops—fast, gas-efficient, and impossible to tamper
                with. <br />{" "}
                <Link
                  href="https://developers.metaplex.com/candy-machine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400"
                >
                  https://developers.metaplex.com/candy-machine
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section 3 - Roadmap */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Roadmap</h2>
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#FFD700] flex items-center justify-center flex-shrink-0 text-[#0A192F] font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Phase 1: Hybrid NFT/FT Liquidity
                </h3>
                <p className="text-gray-300">
                  Introduce our ERC404-style model so you can instantly convert
                  losers into FT and sell on DEX—keeping you chasing that next
                  big pull.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#FFD700] flex items-center justify-center flex-shrink-0 text-[#0A192F] font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Phase 2: Launch v1 with Limited Partner Collections
                </h3>
                <p className="text-gray-300">
                  Kick off with exclusive drops from hand-picked collaborators
                  to prove the hype loop and showcase viral reveals.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#FFD700] flex items-center justify-center flex-shrink-0 text-[#0A192F] font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Phase 3: Open Platform Access
                </h3>
                <p className="text-gray-300">
                  Empower anyone to spin their own NFTs into BlackBOX packs and
                  launch them in a flash—zero code, all the hype.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
