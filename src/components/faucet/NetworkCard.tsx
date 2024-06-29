import React from "react";
import Link from "next/link";
import { spaceAfterCapital } from "@/lib/utils";

function NetworkCard({ name }: { name: string }) {
  const network = name.substring(3).toUpperCase();

  return (
    <Link href={`/${name}`} className="my-5 m-5 ">
      <div className=" bg-blue hover:bg-[#0051ffe0] active:bg-[#0051ffbd] w-64 p-4 rounded-lg text-white font-bold text-lg tracking-wider border-4 border-white text-center">
        {spaceAfterCapital(name)}
      </div>
    </Link>
  );
}

export default NetworkCard;
