import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'


export const projectId = "d4beca8c1c8fc39768e00c82445bb2df"

if (!projectId) {
  throw new Error("Project ID is not defined");
}

const bscTestnet = {
  id: 97,
  name: "Binance Smart Chain Testnet",
  nativeCurrency: {
    name: "Binance Coin",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: {
    default: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
  },
  blockExplorers: {
    default: { name: "BscScan", url: "https://testnet.bscscan.com" },
  },
  testnet: true,
};

export const networks = [bscTestnet];

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transport:{
    [bscTestnet.id]:http()
  },
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig