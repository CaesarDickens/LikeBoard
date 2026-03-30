import { Attribution } from "ox/erc8021";
import { createConfig, http } from "wagmi";
import { coinbaseWallet, injected } from "wagmi/connectors";
import { base } from "wagmi/chains";

export const DATA_SUFFIX = Attribution.toDataSuffix({
  // Replace with your real Builder Code when rotating attribution.
  codes: ["bc_oz5f4jp0"],
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
