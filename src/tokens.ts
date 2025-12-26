import { Network } from "./schemas";

type TokenMetadata = {
  address: string;
  symbol: string;
  type: "Fiat-backed" | "Crypto-backed" | "Stable-backed";
  decimals: number;
};

export const stablecoins: Record<Network, TokenMetadata[]> = {
  "ethereum-mainnet": [
    {
      address: "0xdc035d45d973e3ec169d2276ddab16f1e407384f",
      symbol: "USDS",
      type: "Crypto-backed",
      decimals: 18,
    },
    {
      symbol: "USDC",
      type: "Fiat-backed",
      decimals: 6,
      address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    },
    {
      address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      symbol: "USDT",
      type: "Fiat-backed",
      decimals: 6,
    },
    {
      address: "0x4c9edd5852cd905f086c759e8383e09bff1e68b3",
      symbol: "USDe",
      type: "Stable-backed",
      decimals: 18,
    },
    {
      address: "0x6c3ea9036406852006290770bedfcaba0e23a0e8",
      symbol: "PYUSD",
      type: "Stable-backed",
      decimals: 6,
    },
    {
      address: "0x40d16fc0246ad3160ccc09b8d0d3a2cd28ae6c2f",
      symbol: "GHO",
      type: "Stable-backed",
      decimals: 18,
    },
  ],
  "base-mainnet": [
    {
      address: "0x820c137fa70c8691f0e44dc420a5e53c168921dc",
      symbol: "USDS",
      type: "Crypto-backed",
      decimals: 18,
    },
    {
      address: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
      symbol: "USDC",
      type: "Fiat-backed",
      decimals: 6,
    },
    {
      address: "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
      symbol: "USDbC",
      type: "Stable-backed",
      decimals: 6,
    },
    {
      address: "0xfde4c96c8593536e31f229ea8f37b2ada2699bb2",
      symbol: "USDT",
      type: "Fiat-backed",
      decimals: 6,
    },
    {
      address: "0x5d3a1ff2b6bab83b63cd9ad0787074081a52ef34",
      symbol: "USDe",
      type: "Stable-backed",
      decimals: 18,
    },
    {
      address: "0x60a3e35cc302bfa44cb288bc5a4f316fdb1adb42",
      symbol: "EURC",
      type: "Fiat-backed",
      decimals: 6,
    },
    {
      address: "0xb79dd08ea68a908a97220c76d19a6aa9cbde4376",
      symbol: "USD+",
      type: "Crypto-backed",
      decimals: 6,
    },
    {
      address: "0x4621b7a9c75199271f773ebd9a499dbd165c3191",
      symbol: "DOLA",
      type: "Crypto-backed",
      decimals: 18,
    },
    {
      address: "0xcfa3ef56d303ae4faaba0592388f19d7c3399fb4",
      symbol: "eUSD",
      type: "Crypto-backed",
      decimals: 18,
    },
    {
      address: "0x6bb7a212910682dcfdbd5bcbb3e28fb4e8da10ee",
      symbol: "GHO",
      type: "Stable-backed",
      decimals: 18,
    },
  ],
  "binance-mainnet": [
    {
      address: "0x55d398326f99059ff775485246999027b3197955",
      symbol: "USDT",
      type: "Fiat-backed",
      decimals: 18,
    },
    {
      address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
      symbol: "USDC",
      type: "Fiat-backed",
      decimals: 18,
    },
    {
      address: "0xc5f0f7b66764f6ec8c8dff7ba683102295e16409",
      symbol: "FDUSD",
      type: "Fiat-backed",
      decimals: 18,
    },
    {
      address: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
      symbol: "BUSD",
      type: "Fiat-backed",
      decimals: 18,
    },
    {
      address: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",
      symbol: "DAI",
      type: "Crypto-backed",
      decimals: 18,
    },
    {
      address: "0x14016e85a25aeb13065688cafb43044c2ef86784",
      symbol: "TUSD",
      type: "Fiat-backed",
      decimals: 18,
    },
  ],
} as const;

export const stablecoinList: Record<Network, string[]> = Object.entries(
  stablecoins
).reduce((acc, [network, tokens]) => {
  acc[network as Network] = tokens.map((token) => token.address);
  return acc;
}, {} as Record<Network, string[]>);

export const getStablecoinsMap = (network: Network) =>
  stablecoins[network].reduce<Record<string, TokenMetadata>>((acc, stable) => {
    acc[stable.address] = stable;
    return acc;
  }, {});

export const stablecoinsMap: Record<Network, Record<string, TokenMetadata>> = {
  "ethereum-mainnet": getStablecoinsMap("ethereum-mainnet"),
  "base-mainnet": getStablecoinsMap("base-mainnet"),
  "binance-mainnet": getStablecoinsMap("binance-mainnet"),
};

export function getTokenByNetwork(network: Network, address: string) {
  const stable = stablecoinsMap[network]?.[address];
  if (!stable)
    throw new Error(
      `Missing data for token ${address} in the ${network} network`
    );
  return stable;
}
