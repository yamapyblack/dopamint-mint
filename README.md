# dopamint.fun

Gacha-style NFT reveals.
Turning NFT minting into a dopamine experience

NFT ≠ JPEG
NFT = dopamine🧠

## Problem

NFTs aren’t going viral. Here’s why
1. Reveal has cooldowns → no moment to share
2. Drops look boring → no visual punch
3. No big wins → No thrill, no FOMO

## Solution

1. Real-time reveals → no waiting, just action
2. Cinematic animations → reveals worth sharing
3. Big wins and big misses → FOMO that spreads


## Technology Overview

dopamint.fun ensures fairness, transparency, and tamper-resistance through two key mechanisms: Proof of Integrity (PoL) and Verifiable Random Function (VRF).

### Proof of Integrity (PoL)

We use a **commit-reveal scheme** to ensure that each NFT is tied immutably to a specific metadata fingerprint.

- Each NFT's metadata (image, name, rarity) is summarized into a **fingerprint string**.
- A random **salt** is added to the fingerprint before minting.
- The fingerprint + salt is hashed using **keccak256**, and the resulting hash is used as the **token ID** (commit phase).
- After minting, the original fingerprint + salt is revealed (reveal phase), allowing anyone to verify that the token was not tampered with.

This approach ensures that metadata cannot be changed post-mint, and any attempt to forge or alter an NFT will result in a mismatch during verification.

> ✅ Immutable  
> ✅ Onchain-verifiable  
> ✅ Tamper-proof

---

### Verifiable Random Function (VRF)

All randomness used in DOPAMINT — especially for determining NFT rarity or reveal order — is powered by a **Verifiable Random Function**.

- Random values are generated using **Chainlink VRF** or an equivalent secure oracle.
- Every gacha pull is cryptographically secured and verifiable onchain.
- This eliminates the possibility of manipulation, both by creators and users.

> ✅ Fair  
> ✅ Trustless  
> ✅ Transparent

---

Together, PoL and VRF provide the technical foundation for secure, hype-driven, and shareable gacha NFT experiences on dopamint.fun.
