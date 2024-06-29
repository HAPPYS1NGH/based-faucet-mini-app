// "use client";
// import { useWeb3Modal } from "@web3modal/wagmi/react";
// import {
//   useAccount,
//   useSignMessage,
//   useWaitForTransactionReceipt,
// } from "wagmi";

// export default function ConnectButton() {
//   const { isConnected, address, connector } = useAccount();
//   const { open, close } = useWeb3Modal();

//   const handleConnect = () => {
//     open();
//   };
//   return (
//     <div>
//       {isConnected ? (
//         <button
//           onClick={handleConnect}
//           className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Connected: {address}
//         </button>
//       ) : (
//         <button
//           onClick={handleConnect}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Connect
//         </button>
//       )}
//     </div>
//   );
// }
