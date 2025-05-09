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

interface MintCandyProps {
  onMintSuccess?: () => void;
}

export default function MintCandy({ onMintSuccess }: MintCandyProps) {
  const { publicKey: walletPubKey, signTransaction, connected } = useWallet();

  const mintFromClient = async () => {
    if (!connected || !walletPubKey || !signTransaction) {
      alert("ウォレットが接続されていません");
      return;
    }
    try {
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
      console.log(`Mint 成功: ${signature}`);
      onMintSuccess?.();
    } catch (error: any) {
      console.error("Mint エラー", error);
      alert("Mint 失敗: " + error.message);
    }
  };

  return (
    <>
      {/* <div>
        <button onClick={handleTransferClick}>Transfer</button>
      </div> */}
      <div>
        <button
          className="bg-[#FFD700] hover:bg-[#e6c200] text-[#0A192F] font-extrabold py-4 px-8 rounded-full text-2xl transition-colors inline-block tracking-wider"
          onClick={mintFromClient}
        >
          MINT NOW
        </button>
      </div>
    </>
  );
}
