"use client";

import { publicKey } from "@metaplex-foundation/umi";

import { sol } from "@metaplex-foundation/umi";
import transferSolToDestination from "../lib/transferSol";
import umiWithCurrentWalletAdapter from "@/lib/umi/umiWithCurrentWalletAdapter";

export default function Transfer() {
  // const handleTransferClick = async () => {
  //   console.log("handleTransferClick");
  // };
  const sendSol = async () => {
    console.log("sendSol");
    const destination = "5pvguPFhSDRWvKRm9HErV9LB89pt2gnBW2DC4HgMpTMK";
    const amount = 0.1;
    await transferSolToDestination({
      destination,
      amount,
    });
  };

  return (
    <>
      {/* <div>
        <button onClick={handleTransferClick}>Transfer</button>
      </div> */}
      <div>
        <button onClick={sendSol}>Transfer</button>
      </div>
    </>
  );
}
