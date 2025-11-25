import React, { useState, useEffect } from "react";

export const Toast = ({message = 'Error: some message', style = 'bold text-red-500', duration = 5, setMessage = () => {}}) => {
    const [timeLeft, setTimeLeft] = useState(duration * 1000); // multipled to convert from seconds to miliseconds.

    useEffect(() => {
        if(message === '') {
            setTimeLeft(duration * 1000);
        }

        // the amount of miliseconds between updating the timeleft.
        const tickRate = 40;
        const updateTimeLeft = setInterval(() => {
            
            if(timeLeft > 0) {
                setTimeLeft(timeLeft - tickRate);
            }
            else {
                clearInterval(updateTimeLeft);
                setMessage('');
            }
        }, tickRate);
        
        return () => {
            clearInterval(updateTimeLeft);            
        }
    }, [timeLeft, message])

    return (
        <div className={`absolute w-3/5 md:w-1/5 py-4 px-2 right-2 md:right-10 top-14 md:top-10 flex justify-center
                        rounded-lg border-zinc-400 border-2 shadow-xl bg-zinc-600 transition-all duration-300 
                        ${timeLeft <= 0 && 'opacity-30 -right-96 md:-right-24 scale-0'}
                        ${timeLeft > (duration * 1000) * 0.9999 && 'opacity-30 -right-96 md:-right-24 scale-0'}`}>
            <span className={`${style} text-xs md:text-lg`}>
                {message}
            </span>
        </div>
    )
}

