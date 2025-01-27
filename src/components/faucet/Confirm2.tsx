"use client";
import React, { useEffect, useState, useRef } from "react";
import { useAccount } from "wagmi";
import { useMainButton, useUtils } from "@tma.js/sdk-react";
import { retrieveLaunchParams } from "@tma.js/sdk";

import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  canDripTokens,
  dripTokensToAddress,
  isNewAccount,
} from "@/helpers/contract";
import { Button } from "../ui/button";
import { Link2Icon } from "@radix-ui/react-icons";

function Confirm2({ network }: { network: string }) {
  const networkName = "base-sepolia";
  const mainBtn = useMainButton();
  const utils = useUtils();

  const { initData: data } = retrieveLaunchParams();
  const user = data?.user;
  const username = user?.username;

  const { address } = useAccount();
  const [add, setAdd] = useState(address || "");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const addRef = useRef(add);

  useEffect(() => {
    if (address) {
      setAdd(address);
    }
  }, [address]);

  useEffect(() => {
    addRef.current = add;
  }, [add]);

  const handleClick = () => {
    mainBtn.enable();
    mainBtn.setParams({
      bgColor: "#0052ff",
      text: "Get Testnet Tokens",
      isVisible: true,
    });
    mainBtn.show();
  };

  useEffect(() => {
    if (!mainBtn) return;
    const handleFaucet = async () => {
      console.log("Faucet Requested");

      mainBtn.showLoader();
      mainBtn.setBgColor("#0051ffe0");
      mainBtn.disable();

      console.log("Username", username);
      if (!username) {
        setError("Username is required");
        mainBtn.hideLoader();
        mainBtn.setBgColor("#0052ff");
        mainBtn.enable();
        return;
      }
      console.log("Address", addRef.current);

      if (!addRef.current) {
        setError("Address is required");
        mainBtn.hideLoader();
        mainBtn.setBgColor("#0052ff");
        mainBtn.enable();
        return;
      }

      if (addRef.current.length !== 42) {
        setError("Invalid Address");
        mainBtn.hideLoader();
        mainBtn.setBgColor("#0052ff");
        mainBtn.enable();
        return;
      }
      try {
        const checkResult = await canDripTokens(
          addRef.current as `0x${string}`,
          username,
          networkName
        );

        console.log("Check Result", checkResult);

        if (checkResult !== true) {
          setError(checkResult);
          mainBtn.hideLoader();
          mainBtn.setBgColor("#0052ff");
          mainBtn.enable();
          return;
        }
        let fundsToSend = "10000000000000000";
        if (!(await isNewAccount(addRef.current as `0x${string}`))) {
          fundsToSend = "20000000000000000";
        }

        const hash = await dripTokensToAddress(
          addRef.current as `0x${string}`,
          username,
          BigInt(fundsToSend),
          networkName
        );
        if (hash.substring(0, 2) !== "0x") {
          setError(hash);
          mainBtn.hideLoader();
          mainBtn.setBgColor("#0052ff");
          mainBtn.enable();
          return;
        }
        console.log("Hash", hash);
        setSuccess(hash);
      } catch (error: any) {
        console.error("Error in dripTokensToAddress", error);
        setError(error?.metaMessages[0]);
      }
      mainBtn.setBgColor("#0052ff");
      mainBtn.hideLoader();
      mainBtn.enable();
    };

    mainBtn.on("click", handleFaucet);
    return () => {
      mainBtn.off("click", handleFaucet);
    };
  }, [mainBtn, username, networkName]);

  const handleClose = () => {
    mainBtn.disable();
    mainBtn.hide();
    setError(null);
    setSuccess(null);
  };

  return (
    <div>
      <Drawer onClose={handleClose}>
        <DrawerTrigger
          onClick={handleClick}
          className=" text-white bg-blue hover:bg-[#0051ffe0] active:bg-[#0051ffbd] w-full rounded-xl px-8 py-4 "
        >
          Get the faucet Now
        </DrawerTrigger>
        <DrawerContent className="bg-white text-black">
          <DrawerHeader>
            <DrawerTitle className="text-3xl p-2 text-left">
              Request some faucet
            </DrawerTitle>
          </DrawerHeader>
          <div className="w-full text-left px-6 text-navy">
            <div className="">
              <h4 className="text-lg mb-3">Guidelines</h4>
              <div className="text-black tracking-tighter flex flex-col gap-2 text-sm">
                <p>Faucet Drips every 24 hours</p>
                <p>You can claim 0.01 Eth every 24 hours.</p>
                <p>
                  Wallets with {`>`} 20 Build Score can claim 0.02 Eth every 24
                  hours.
                </p>
              </div>
            </div>
            <h1 className="mt-6 text-navy">Enter the Address @{username}</h1>
            <Input
              name="address"
              placeholder="0xdb1.."
              className="w-full"
              value={add}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                console.log("Input Changed:", e.target.value);
                setAdd(e.target.value as `0x${string}`);
              }}
            />

            {error && <p className="text-red text-sm">{error}</p>}
            {success && (
              <Button
                variant={"view"}
                size={"view"}
                onClick={() => {
                  utils.openLink(`https://sepolia.basescan.org/tx/${success}`);
                }}
                className=" text-white text-sm flex gap-2 mt-2"
              >
                View Transaction
                <Link2Icon />
              </Button>
            )}
          </div>
          <DrawerFooter />
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default Confirm2;
