export const LIKEBOARD_CONTRACT_ADDRESS = "0x5dfd1e5a54a40e88590639486a8a43f48b1a1c7d" as const;

export const likeBoardAbi = [
  {
    type: "function",
    name: "like",
    stateMutability: "nonpayable",
    inputs: [{ name: "postId", type: "uint256" }],
    outputs: [],
  },
  {
    type: "function",
    name: "likes",
    stateMutability: "view",
    inputs: [{ name: "", type: "uint256" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "liked",
    stateMutability: "view",
    inputs: [
      { name: "", type: "uint256" },
      { name: "", type: "address" },
    ],
    outputs: [{ type: "bool" }],
  },
] as const;
