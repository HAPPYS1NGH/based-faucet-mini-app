import React from "react";
import Confirm2 from "@/components/faucet/Confirm2";

async function fetcher(url: string) {
  const res = await fetch(url, {
    next: {
      revalidate: 600,
    },
  });
  return res.json();
}
async function Page({ params }: { params: { network: network } }) {
  const { network } = params;
  const data = await fetcher(`${process.env.NEXT_PUBLIC_URL}/api/${network}`);
  console.log(data);

  return (
    <main className="flex  flex-col items-center justify-between">
      <div className=" text-center flex flex-col items-center">
        <h1 className="text-4xl text-center font-bold mb-10">
          BASE {network.substring(4).toUpperCase()}
        </h1>
        <div className="flex flex-col justify-around items-center  ">
          <div className="flex justify-around items-center  gap-10 mb-10">
            <div className="p-4   w-40 rounded-xl bg-white font-black text-black ">
              <h4 className="text-xl">Block Num</h4>
              <p>{data.blockNumber}</p>
            </div>
            <div className="p-4  w-40 rounded-xl bg-white font-black text-black ">
              <h4 className="text-xl">Gas Fees</h4>
              <p>{data.gasPrice}</p>
            </div>
          </div>
          <div className="flex justify-around items-center  gap-10 mb-10">
            <div className="p-4  w-40 rounded-xl bg-white font-black text-black ">
              <h4 className="text-xl">Funds Left</h4>
              <p>{data.balance}</p>
            </div>
            <div className="p-4  w-40 rounded-xl bg-white font-black text-black ">
              <h4 className="text-xl">Last Act.</h4>
              <p>{data.lastActive}</p>
            </div>
          </div>
        </div>
        <Confirm2 network={network} />
        {/* <Input name="address" placeholder="0xdb5..." /> */}
      </div>
    </main>
  );
}

export default Page;
