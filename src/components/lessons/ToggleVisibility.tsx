"use client"

// imports
import { useEffect, useRef, useState } from "react";

export default function ToggleVisibility() {
    const [isVisible, setIsVisible] = useState(false);
    const prevIsVisible = useRef(isVisible);

    useEffect(() => {
        if (prevIsVisible.current !== isVisible) {
            // Trigger animation based on visibility change
            console.log('Visibility changed:', isVisible);
            prevIsVisible.current = isVisible;
        }
    }, [isVisible]);

    return (
        <div className="border p-8">
            <h3 className="text-3xl text-white">Visibility</h3>
            <p>(useRef hook)</p>
            <button onClick={() => setIsVisible(!isVisible)} className="px-4 py-2 cursor-pointer text-white bg-green-700 hover:bg-green-800">
                Toggle Visibility
            </button>
            <div className={`transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                I fade in and out
            </div>
        </div>
    )
}