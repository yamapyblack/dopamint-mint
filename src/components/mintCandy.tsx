"use client";

import { publicKey } from "@metaplex-foundation/umi";

import { useWallet } from "@solana/wallet-adapter-react";
import { sol } from "@metaplex-foundation/umi";
import transferSolToDestination from "../lib/transferSol";
import umiWithCurrentWalletAdapter from "@/lib/umi/umiWithCurrentWalletAdapter";
import {
  some,
  generateSigner,
  transactionBuilder,
} from "@metaplex-foundation/umi";
import {
  create,
  mintV2,
  mplCandyMachine,
  safeFetchCandyGuard,
  fetchCandyMachine,
} from "@metaplex-foundation/mpl-candy-machine";
import { setComputeUnitLimit } from "@metaplex-foundation/mpl-toolbox";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { useState } from "react";

interface MintCandyProps {
  onMintSuccess?: () => void;
}

export default function MintCandy({ onMintSuccess }: MintCandyProps) {
  const { publicKey: walletPubKey, signTransaction, connected } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const mintFromClient = async () => {
    if (!connected || !walletPubKey || !signTransaction) {
      alert("Please connect your wallet first");
      return;
    }
    try {
      setIsLoading(true);
      // 1. 接続済みウォレットを identity/payer に
      const umi = umiWithCurrentWalletAdapter();
      // const umi = createUmi(clusterApiUrl("devnet"))
      //   .use(walletAdapterIdentity({ publicKey, signTransaction }))
      //   .use(mplCandyMachine())
      //   .use(mplTokenMetadata());

      umi.use(mplCandyMachine()).use(mplTokenMetadata());

      // 2. Candy Machine と Candy Guard の取得
      const cmId = publicKey(process.env.NEXT_PUBLIC_CANDY_MACHINE_ID!);
      const cm = await fetchCandyMachine(umi, cmId);
      const guard = await safeFetchCandyGuard(umi, cm.mintAuthority);

      // 3. 新規NFT用 Mint キーを生成
      const nftMint = generateSigner(umi);

      // 4. Transaction Builder の構築
      const treasury = publicKey(process.env.NEXT_PUBLIC_TREASURY!);
      const txBuilder = transactionBuilder()
        .add(setComputeUnitLimit(umi, { units: 800_000 }))
        .add(
          mintV2(umi, {
            candyMachine: cm.publicKey,
            candyGuard: guard?.publicKey,
            nftMint,
            collectionMint: cm.collectionMint,
            collectionUpdateAuthority: cm.authority,
            mintArgs: {
              // Sol Payment Guard(0.1 SOL)の支払い先のみ指定
              solPayment: some({ destination: treasury }),
            },
          })
        );

      // 5. 署名して送信
      const { signature } = await txBuilder.sendAndConfirm(umi);
      alert(`Mint successful! Transaction: ${signature}`);
      onMintSuccess?.();
    } catch (error: any) {
      console.error("Mint error:", error);
      alert("Mint failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative">
        <button
          className={`bg-[#FFD700] hover:bg-[#e6c200] text-[#0A192F] font-extrabold py-4 px-8 rounded-full text-2xl transition-colors inline-block tracking-wider ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={mintFromClient}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 border-4 border-[#0A192F] border-t-transparent rounded-full animate-spin"></div>
              <span>Minting...</span>
            </div>
          ) : (
            "MINT NOW"
          )}
        </button>
      </div>
    </>
  );
}
