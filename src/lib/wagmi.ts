import { Attribution } from "ox/erc8021";
import { createConfig, http } from "wagmi";
import { coinbaseWallet, injected } from "wagmi/connectors";
import { base } from "wagmi/chains";

export const DATA_SUFFIX = Attribution.toDataSuffix({
  // Replace BUILDER_CODE_PLACEHOLDER with your real Builder Code.
  codes: ["BUILDER_CODE_PLACEHOLDER"],
});

export const wagmiConfig = createConfig({
  ssr: true,
  chains: [base],
  connectors: [
    coinbaseWallet({ appName: "LikeBoard" }),
    injected(),
  ],
  transports: {
    [base.id]: http("https://mainnet.base.org"),
  },
});
