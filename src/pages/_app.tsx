import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import "@rainbow-me/rainbowkit/styles.css";
import { connectorsForWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { createClient, WagmiConfig, configureChains } from "wagmi";
import { Connector } from "../utils/connector";
import { polygonMumbai, mainnet } from 'wagmi/chains';
import { walletConnectWallet, rainbowWallet, metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { Chain } from "@rainbow-me/rainbowkit";

const shardeumSphinx: Chain = {
  id: 8082,
  name: "Shardeum",
  network: "Shardeum Sphinx 1.X",
  nativeCurrency: {
    decimals: 18,
    name: "Shardeum",
    symbol: "SHM",
  },
  iconUrl:
    "https://bafkreic7ujchsg65vi7b26vkititbq2k3fddwhcutq3fpmraxj4sfjhyli.ipfs.nftstorage.link",
  rpcUrls: {
    default: {
      http: ["https://sphinx.shardeum.org/"],
    },
    public: {
      http: ["https://sphinx.shardeum.org/"],
    },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [mainnet, polygonMumbai, shardeumSphinx],
  [alchemyProvider({ apiKey: "7wSu45FYTMHUO4HJkHjQwX4HFkb7k9Ui" }), alchemyProvider({ apiKey: "fGXusgBUDC-OPy6XI8IFRvu1i7sbWsYj" }), publicProvider()]
);
const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [rainbowWallet({ chains }), walletConnectWallet({ chains }), metaMaskWallet({ chains }), Connector({ chains })],
  },
]);
const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "sans-serif",
          }}>
          <Component {...pageProps} />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
