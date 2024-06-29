"use client";
import React from "react";
import Image from "next/image";
import { useBackBtn } from "@/hooks/useBackBtn";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Header() {
  const bb = useBackBtn();

  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm flex p-4 mb-10">
      <div className="flex gap-2 justify-center items-center">
        <Image
          src="/faucet.png"
          alt="Vercel Logo"
          width={40}
          height={40}
          className=" rounded-full"
        />
        <h1 className="text-xl">Based Faucet</h1>
      </div>
      <div>
        <ConnectButton />
      </div>
      {/* <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"></p> */}
    </div>
  );
}

export default Header;
