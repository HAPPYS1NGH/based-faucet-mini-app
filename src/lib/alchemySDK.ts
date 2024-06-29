export async function getLastTransactionTimestampForAddress(
    toAddress: string,
    network: string
) {
    console.log("GET request made");
    console.log("toAddress", toAddress);
    console.log("network", network);
    let RPC = "";
    if (network === "sepolia") {
        RPC = `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`;
    } else {
        RPC = `https://base-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`;
    }
    try {
        const res = await fetch(RPC, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: 1,
                jsonrpc: "2.0",
                method: "alchemy_getAssetTransfers",
                params: [
                    {
                        fromBlock: "0x0",
                        toBlock: "latest",
                        fromAddress: "0x15413cd3bb0d8bcb88a70ae3679f68dd7e5194fb",
                        toAddress: toAddress,
                        category: ["external"],
                        order: "desc",
                        withMetadata: true,
                        excludeZeroValue: false,
                        maxCount: "0x1",
                    },
                ],
            }),
            next: {
                revalidate: 600,
            },
        });
        const data = await res.json();
        console.log("DATA IN SDK", data);
        console.log(data.result.transfers[0]);
        const date = new Date(data.result.transfers[0].metadata.blockTimestamp);
        const timestamp = date.getTime() / 1000;
        console.log("TIMESTAMP", timestamp);
        return timestamp;
    } catch (error) {
        console.error("Error in GET request:", error);
    }
}
