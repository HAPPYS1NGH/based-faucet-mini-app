"use client";

import { useRouter, usePathname } from "next/navigation";
import { useBackButton, useClosingBehavior, useViewport } from "@tma.js/sdk-react";
import { useEffect } from "react";


export function useBackBtn() {
    const bb = useBackButton(true); // will be undefined or BackButton.
    const close = useClosingBehavior(true); // will be undefined or ClosingBehavior.
    const viewport = useViewport(true); // will be undefined or InitData.
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        function goBack() {
            router.back();
        }
        if (close) {
            close.enableConfirmation()
        }
        if (viewport) {
            viewport.expand()
        }
        if (bb) {
            if (pathname === "/") {
                bb.hide();
                return;
            }
            bb.show();
            bb.on("click", goBack);
        }
    }, [bb, router, pathname]);
}