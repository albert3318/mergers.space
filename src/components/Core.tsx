/* eslint-disable @next/next/no-img-element */
import React from 'react';

const Core = () => {
    return (
        <div className="h-[100vh] relative bg-white flex">
           <div className='w-[50vw] h-[100%] flex justify-center items-center'>
                <img className="w-96 h-96 border-purple-700 border-2 rounded-xl" alt="gameplay" src="background.png"></img>
           </div>
        </div>
    )
}

export default Core;