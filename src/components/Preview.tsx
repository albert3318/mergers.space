"use client"
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react"
import ReviewCard from "@/components/ReviewCard";
import { BsArrowRightSquareFill, BsArrowLeftSquareFill } from "react-icons/bs";

const Preview = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [data, setData] = useState<any>();
    const [r, setR] = useState<number>(0);
    const [dontstartTimer, setDST] = useState<number>(0);
    const [counter, setCounter] = useState<number>(0);

    const fetch_data = async () => {
        const response = await fetch("https://store.steampowered.com/appreviews/2821220?json=1&filter=recent&cursor=*");
        if (!response.ok) return;
        const json_data = await response.json();
        setData(json_data.reviews);
    }

    const update_review_right = () => {if (data) setR((r+1) % data.length);}
    const update_review_left_click = () => 
        {
            if (r != 0)  {setDST(1); setR((r-1) % data.length); delayForAutoTimer(); } else  { setR(data.length - 1); delayForAutoTimer(); }
        }
    const update_review_right_click = () => {setDST(1); if (data) setR((r+1) % data.length); delayForAutoTimer();}
    
    const delayForAutoTimer = () => {

        setTimeout(() => {

            setDST(0);

        }, 15000);

    }

    useEffect(() =>  {
        if (videoRef.current) videoRef.current.volume = 0.25;
        fetch_data();

    }, []);

    useEffect(() => {
        const timer  = setTimeout(() => {
            if (dontstartTimer == 0)
            {
                update_review_right();
                setCounter(Math.random());
            }
        }, 2000);
        
        return () => clearTimeout(timer);
    }, [counter]);

    

    return (
        <>
            <img alt="waveBottom" src="waveBottom.svg" className='w-[100vw] h-48 bg-white'/>
            <div className="min-h-[100vh] bg-white flex flex-col md:flex-row">

                {/* <div className="bg-gradient-to-b from-black to-white h-[10vh] w-[100vw] z-10"></div> */}
                <div className="w-[100vw] h-[100vh] flex-1 overflow-scroll border-b-2 md:border-r-2 md:border-b-0 border-black ">
                    <div className="p-2 h-full">
                        <div className="flex justify-evenly items-center h-8 md:h-16">
                            {<BsArrowLeftSquareFill onClick={update_review_left_click} className={`text-black h-full w-auto ${r == 0 ? "..." : ""}`}></BsArrowLeftSquareFill>}
                            <p className="text-black text-3xl md:text-6xl text-center font-mono select-none">Reviews</p>
                            {<BsArrowRightSquareFill onClick={update_review_right_click} className={`text-black h-full w-auto ${data && r == data.length ? "..." : ""}`}></BsArrowRightSquareFill>}
                        </div>
                        <div className="flex flex-col items-center">
                            {   
                                data ? 
                                    <ReviewCard review={data[r].review} playtime={Math.round(data[r].author.playtime_forever/60.0*100)/100}></ReviewCard>
                                :
                                    <></>
                            }
                        </div>
                    </div>
                </div>
                {/* Literally just the divider between the Video (below) and the card (above) */}

                <div className="w-[100vw] h-[100vh] flex-1 flex justify-center ">
                    <div className="p-2">
                        <p className="text-black text-3xl md:text-6xl text-center font-mono select-none">Trailer</p>
                        <video ref={videoRef} className="max-h-[100vh] border-double border-8 border-purple-500 shadow-xl rounded-xl" controls>
                            <source src=" https://video.akamai.steamstatic.com/store_trailers/256998915/movie480_vp9.webm?t=1707961792" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
            <hr className="bg-black w-[100vw] h-1"></hr>
        </>
    )
};

export default Preview;