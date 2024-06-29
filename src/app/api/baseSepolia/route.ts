import { baseSepoliaClient } from "@/lib/client";
import { getLastTransactionTimestampForAddress } from "@/lib/alchemySDK";
import { BASE_SEPOLIA } from "@/constants/address";

export async function GET() {
    try {
        console.log("baseSepoliaClient", baseSepoliaClient);

        const [blockNumber, rawGasPrice, faucetData] = await Promise.all([
            baseSepoliaClient.getBlockNumber(),
            baseSepoliaClient.getGasPrice(),
            baseProcessAddress(BASE_SEPOLIA)
        ]);

        const gasPriceInGwei = parseFloat(rawGasPrice.toString()) / 1e9;
        const formattedGasPrice = `${gasPriceInGwei.toFixed(2)} Gwei`;

        console.log("blockNumber", blockNumber.toString());
        console.log("gasPrice", formattedGasPrice);
        console.log("faucetData", faucetData);

        return Response.json({ blockNumber: blockNumber.toString(), gasPrice: formattedGasPrice, lastActive: faucetData.lastActive, balance: faucetData.balance });
    } catch (err) {
        console.error("error", err);
        return Response.json({ blockNumber: 0, gasPrice: 0, lastActive: "some time ago", balance: "-" })
    }
}

interface ProcessedAddress {
    balance: string;
    lastActive: string;
    timestamp: number;
    address: `0x${string}`;
}

// Function to process a single address
const baseProcessAddress = async (
    address: `0x${string}`
): Promise<ProcessedAddress> => {
    try {
        const bal = await baseSepoliaClient.getBalance({ address });

        // Convert Big Number and divide by 10^18 to get the balance in ETH and convert
        // the balance to 4 decimal places
        let balance =
            bal.toString().slice(0, -18) +
            "." +
            bal.toString().slice(-18).slice(0, 4);
        if (balance[0] === ".") {
            balance = "0" + balance;
        }

        const lastActive = await getLastTransactionTimestampForAddress(
            address,
            "base-sepolia"
        );
        console.log("lastActive after data.result", lastActive);
        if (!lastActive) {
            return {
                balance,
                lastActive: "some time ago",
                timestamp: 0,
                address,
            };
        }

        // Convert the time elapsed between the last active time and the current time in UTC accordingly in minutes, hours, days, weeks, months or years
        const timeElapsed = Date.now() / 1000 - lastActive;
        console.log("timeElapsed", timeElapsed);
        let time = "";

        // Determine the appropriate unit based on the time elapsed
        let unit = "";
        if (timeElapsed < 60) {
            unit = timeElapsed === 1 ? "second" : "seconds";
            time = `${Math.floor(timeElapsed)} ${unit} ago`;
        } else if (timeElapsed < 3600) {
            unit = Math.floor(timeElapsed / 60) === 1 ? "minute" : "minutes";
            time = `${Math.floor(timeElapsed / 60)} ${unit} ago`;
        } else if (timeElapsed < 86400) {
            unit = Math.floor(timeElapsed / 3600) === 1 ? "hour" : "hours";
            time = `${Math.floor(timeElapsed / 3600)} ${unit} ago`;
        } else if (timeElapsed < 604800) {
            unit = Math.floor(timeElapsed / 86400) === 1 ? "day" : "days";
            time = `${Math.floor(timeElapsed / 86400)} ${unit} ago`;
        } else if (timeElapsed < 2628000) {
            unit = Math.floor(timeElapsed / 604800) === 1 ? "week" : "weeks";
            time = `${Math.floor(timeElapsed / 604800)} ${unit} ago`;
        } else if (timeElapsed < 31536000) {
            unit = Math.floor(timeElapsed / 2628000) === 1 ? "month" : "months";
            time = `${Math.floor(timeElapsed / 2628000)} ${unit} ago`;
        } else {
            unit = Math.floor(timeElapsed / 31536000) !== 1 ? "years" : "year";
            time = `${timeElapsed
                ? `${Math.floor(timeElapsed / 31536000)} ${unit} ago`
                : "1 year ago"
                } `;
        }

        return {
            balance,
            lastActive: time,
            timestamp: lastActive,
            address,
        };
    } catch (e) {
        return {
            balance: "0",
            lastActive: "some time ago",
            timestamp: 0,
            address,
        };
    }
};
