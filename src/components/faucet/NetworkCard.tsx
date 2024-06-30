import React from "react";
import Link from "next/link";
import { spaceAfterCapital } from "@/lib/utils";

function NetworkCard({ name }: { name: string }) {
  const network = name.substring(3).toUpperCase();

  return (
    <Link href={`/${name}`} className="my-8 m-8 ">
      <div className=" bg-blue hover:bg-[#0051ffe0] active:bg-[#0051ffbd] px-8 py-6 rounded-lg text-white font-bold text-xl tracking-wider border-4 border-white text-center">
        {spaceAfterCapital(name)}
      </div>
    </Link>
  );
}

export default NetworkCard;
