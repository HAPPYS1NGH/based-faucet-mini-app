import NetworkCard from "@/components/faucet/NetworkCard";
// import { canDripTokens } from "@/helpers/contract";

export default async function Home() {
  // const isValues = await canDripTokens(
  //   "0x926a19D7429F9AD47b2cB2b0e5c46A9E69F05a3e",
  //   "username",
  //   "arbitrum-sepolia"
  // );

  // console.log(isValues);

  return (
    <main className="flex  flex-col items-center justify-between">
      <div className=" text-center flex flex-col items-center">
        <h1 className="text-4xl text-center font-bold mx-10">
          Based Faucet Dripper
        </h1>
        <div className="p-10 mt-10 ">
          <NetworkCard name="baseSepolia" />
        </div>
      </div>
    </main>
  );
}
