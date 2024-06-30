// "use client";
// import React, { useEffect, useState } from "react";
// import { useAccount } from "wagmi";
// import { useMainButton, useUtils } from "@tma.js/sdk-react";
// import { retrieveLaunchParams } from "@tma.js/sdk";

// import { Input } from "@/components/ui/input";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer";
// import { Button } from "../ui/button";

// import { canDripTokens, dripTokensToAddress } from "@/helpers/contract";

// function Confirm({ network }: { network: string }) {
//   const networkName = "arbitrum-sepolia";
//   const mainBtn = useMainButton();
//   const { initData: data } = retrieveLaunchParams();
//   const user = data?.user;
//   const { address } = useAccount();
//   const [add, setAdd] = useState(address);
//   const [username, setUsername] = useState("hhhhhh");
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);

//   function handleClick() {
//     mainBtn.enable();
//     mainBtn.setParams({
//       bgColor: "#12AAdf",
//       text: "Get Testnet Tokens",
//       isVisible: true,
//     });
//     mainBtn.show();
//   }

//   useEffect(() => {
//     if (!mainBtn) return;
//     mainBtn.on("click", handleFaucet);
//     return () => {
//       mainBtn.off("click", handleFaucet);
//     };
//   }, [mainBtn]);

//   // useEffect(() => {
//   //   if (!initData || !initData.user?.username) return;
//   //   setUsername(initData.user?.username);
//   // }, [initData]);

//   function handleClose() {
//     mainBtn.disable();
//     mainBtn.hide();
//   }

//   async function handleFaucet() {
//     console.log("Faucet Requested");

//     mainBtn.showLoader();
//     mainBtn.setBgColor("#72AAdf");
//     mainBtn.disable();
//     if (!add) {
//       setError("Address is required");
//       mainBtn.hideLoader();
//       mainBtn.setBgColor("#12AAdf");
//       return;
//     }

//     if (!username) {
//       setError("Username is required");
//       mainBtn.hideLoader();
//       mainBtn.setBgColor("#12AAdf");
//       return;
//     }

//     if (add.length !== 42) {
//       setError("Invalid Address");
//       mainBtn.hideLoader();
//       mainBtn.setBgColor("#12AAdf");
//       return;
//     }

//     try {
//       console.log("Faucet Requested");

//       const checkResult = await canDripTokens(
//         add as `0x${string}`,
//         username,
//         networkName
//       );
//       if (checkResult !== true) {
//         setError(checkResult);
//         mainBtn.hideLoader();
//         mainBtn.setBgColor("#12AAdf");
//         return;
//       }

//       // const result = await dripTokensToAddress(
//       //   add as `0x${string}`,
//       //   username,
//       //   5000000000000000n,
//       //   networkName
//       // );
//       // if (typeof result === "string") {
//       //   console.log("Transaction Hash:", result);
//       //   setSuccess("Transaction Hash :" + result);
//       //   mainBtn.setBgColor("#008000");
//       //   mainBtn.disable();
//       //   mainBtn.setParams({
//       //     bgColor: "#12AAdf",
//       //     text: "Get Testnet Tokens",
//       //     isVisible: true,
//       //   });
//       //   setError(null);
//       // } else {
//       //   throw new Error("Failed to send tokens");
//       // }
//     } catch (error: any) {
//       console.error("Error in handleFaucet:", error);
//       setError(error.message || "An unknown error occurred");
//     } finally {
//       mainBtn.setBgColor("#12AAdf");
//       mainBtn.hideLoader();
//     }
//   }

//   return (
//     <div>
//       <Drawer onClose={handleClose}>
//         <DrawerTrigger>
//           <Button variant="faucet" size="full" onClick={handleClick}>
//             Get the faucet Now
//           </Button>
//         </DrawerTrigger>
//         <DrawerContent className="bg-sky-blue text-navy">
//           <DrawerHeader>
//             <DrawerTitle className="text-3xl p-4 text-left">
//               Request some faucet
//             </DrawerTitle>
//             <DrawerDescription className="w-full text-left px-4 text-navy">
//               <div className="py-3">
//                 <h4 className="text-lg mb-3">Guidelines</h4>
//                 <div className="text-black tracking-tighter flex flex-col gap-2">
//                   <p>Faucet Drips every 24 hours</p>
//                   <p>
//                     Wallets with more than 0.01 Eth on Mainnet/ Arbitrum One
//                     will be dripped 0.2 ETH
//                   </p>
//                   <p>
//                     Wallets with less than 0.01 Eth on Mainnet/ Arbitrum One
//                     will be dripped 0.1 ETH
//                   </p>
//                 </div>
//               </div>
//               <h1 className="mt-2 text-navy">Enter the Address</h1>
//               <Input
//                 name="address"
//                 placeholder="0xdb1.."
//                 className="w-full -mb-4"
//                 value={add}
//                 onChange={(e: any) => setAdd(e.target.value)}
//               />

//               {error && <p className="text-red text-sm">{error}</p>}
//             </DrawerDescription>
//           </DrawerHeader>
//           <DrawerFooter>
//             {/* <DrawerClose className="">
//               <Button variant="outline" size="small" onClick={handleClose}>
//                 Cancel
//               </Button>
//             </DrawerClose> */}
//           </DrawerFooter>
//         </DrawerContent>
//       </Drawer>
//     </div>
//   );
// }

// export default Confirm;
