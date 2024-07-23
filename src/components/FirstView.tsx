"use client"
import React, { useEffect, useRef, useState } from "react";
import Nodes from "@/components/Nodes";

const FirstView = () => {
    const [load, setLoad] = useState<boolean>(false);

    let window = useRef<HTMLDivElement | null>(null)
    let logo = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        window.current!.style.height = '0vh';
        window.current!.addEventListener("transitionend", () => {
            logo.current!.style.opacity = '1';
        });
        logo.current!.addEventListener("transitionend", () => {
            setLoad(true);
        })
    }, []);
    return (
        <div className={load ? "" : "fixed"}>
            <div ref={window} className="h-[100vh] w-[100vw] top-0 bg-black z-10 duration-[3s] ease-in transition-[height]"></div>
            <div className="h-[100vh]">
                <Nodes></Nodes>
                <div ref={logo} className="relative h-full flex justify-center items-center opacity-0 duration-[2s] ease-in transition-opacity">
                    <p className="text-3xl md:text-9xl font-mono select-none text-center">
                        <span className="block text-purple-600">Space</span>
                        <span>Mergers</span>
                    </p>
                </div>
            </div>
        </div>
    )
};

export default FirstView;