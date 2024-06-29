import { createPublicClient, http, fallback, createWalletClient, publicActions } from "viem";
import { baseSepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

const baseSepoliaRPC = process.env.BASE_SEPOLIA_RPC;

const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY}`);

export const baseSepoliaClient = createPublicClient({
    chain: baseSepolia,
    transport: http(baseSepoliaRPC, {
        batch: true,
    }),
});

export const walletBaseClient = createWalletClient({
    account,
    chain: baseSepolia,
    transport: http(baseSepoliaRPC),
}).extend(publicActions);

export function getChainClient(chain: string, isWallet = false): any {
    switch (chain) {
        case "base-sepolia":
            return isWallet ? walletBaseClient : baseSepoliaClient;
        default:
            throw new Error(`Unsupported chain ${chain}`);
    }
}
