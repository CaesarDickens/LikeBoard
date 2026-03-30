"use client";

import { waitForTransactionReceipt } from "@wagmi/core";
import { BottomNav } from "@/components/BottomNav";
import { LikeActionCard } from "@/components/LikeActionCard";
import { LikeCountPanel } from "@/components/LikeCountPanel";
import { LikeHeader } from "@/components/LikeHeader";
import { PostIdInputCard } from "@/components/PostIdInputCard";
import { type StatusTone } from "@/components/StatusChip";
import { LIKEBOARD_CONTRACT_ADDRESS, likeBoardAbi } from "@/lib/contract";
import { DATA_SUFFIX, wagmiConfig } from "@/lib/wagmi";
import { trackTransaction } from "@/utils/track";
import { useMemo, useState } from "react";
import { zeroAddress } from "viem";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

function parsePostId(value: string): bigint | null {
  const normalized = value.trim();
  if (!normalized || !/^\d+$/.test(normalized)) return null;
  return BigInt(normalized);
}

function toUserMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  const lowered = message.toLowerCase();

  if (lowered.includes("already liked")) {
    return "Already liked: this wallet already liked that postId.";
  }
  if (lowered.includes("user rejected") || lowered.includes("rejected")) {
    return "Transaction rejected in wallet.";
  }
  return "Transaction failed. Please retry.";
}

export default function HomePage() {
  const [postIdInput, setPostIdInput] = useState("1");
  const [selectedPostId, setSelectedPostId] = useState<bigint | null>(1n);
  const [feedback, setFeedback] = useState<string>("Ready");
  const [feedbackTone, setFeedbackTone] = useState<StatusTone>("neutral");
  const [txHash, setTxHash] = useState<string | undefined>(undefined);

  const { address, isConnected } = useAccount();
  const { writeContractAsync, isPending: isWriting } = useWriteContract();

  const normalizedPostId = selectedPostId ?? 0n;

  const likesQuery = useReadContract({
    address: LIKEBOARD_CONTRACT_ADDRESS,
    abi: likeBoardAbi,
    functionName: "likes",
    args: [normalizedPostId],
    query: {
      enabled: selectedPostId !== null,
    },
  });

  const likedQuery = useReadContract({
    address: LIKEBOARD_CONTRACT_ADDRESS,
    abi: likeBoardAbi,
    functionName: "liked",
    args: [normalizedPostId, (address ?? zeroAddress) as `0x${string}`],
    query: {
      enabled: selectedPostId !== null && Boolean(address),
    },
  });

  const alreadyLiked = Boolean(likedQuery.data);
  const isReading = likesQuery.isFetching || likedQuery.isFetching;

  const likeDisabled = useMemo(() => {
    return !isConnected || selectedPostId === null || alreadyLiked || isWriting;
  }, [alreadyLiked, isConnected, isWriting, selectedPostId]);

  function onQuery() {
    const parsed = parsePostId(postIdInput);
    if (parsed === null) {
      setFeedbackTone("bad");
      setFeedback("Please enter a valid numeric postId.");
      return;
    }

    setSelectedPostId(parsed);
    setFeedbackTone("neutral");
    setFeedback(`Loaded postId ${parsed.toString()}.`);
  }

  async function onLike() {
    if (!isConnected || !address) {
      setFeedbackTone("warn");
      setFeedback("Connect wallet before liking.");
      return;
    }
    if (selectedPostId === null) {
      setFeedbackTone("warn");
      setFeedback("Enter a valid postId first.");
      return;
    }
    if (alreadyLiked) {
      setFeedbackTone("good");
      setFeedback("Already liked: this wallet cannot like the same postId twice.");
      return;
    }

    try {
      setFeedbackTone("neutral");
      setFeedback("Open wallet and confirm transaction...");

      const hash = await writeContractAsync({
        address: LIKEBOARD_CONTRACT_ADDRESS,
        abi: likeBoardAbi,
        functionName: "like",
        args: [selectedPostId],
        dataSuffix: DATA_SUFFIX,
      });

      setTxHash(hash);
      setFeedbackTone("neutral");
      setFeedback("Transaction submitted. Waiting for confirmation...");

      await waitForTransactionReceipt(wagmiConfig, { hash });

      setFeedbackTone("good");
      setFeedback("Like confirmed onchain.");

      void trackTransaction("app-004", "LikeBoard", address, hash);

      await Promise.all([likesQuery.refetch(), likedQuery.refetch()]);
    } catch (error) {
      setFeedbackTone("bad");
      setFeedback(toUserMessage(error));
    }
  }

  return (
    <main className="page-wrap">
      <LikeHeader />

      <PostIdInputCard value={postIdInput} onChange={setPostIdInput} onSubmit={onQuery} />

      <LikeCountPanel
        postId={selectedPostId}
        likeCount={likesQuery.data}
        liked={alreadyLiked}
        connected={isConnected}
        loading={isReading}
      />

      <LikeActionCard
        disabled={likeDisabled}
        busy={isWriting}
        connected={isConnected}
        alreadyLiked={alreadyLiked}
        onLike={onLike}
        txHash={txHash}
        feedback={feedback}
        feedbackTone={feedbackTone}
      />

      <BottomNav />
    </main>
  );
}
