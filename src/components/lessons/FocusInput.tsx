"use client"

// imports
import { useEffect, useRef } from "react";

export default function FocusInput() {
    // useRef
    const userName = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Focus the input element when the component mounts
        if (userName.current) {
            userName.current.focus();
        }
    }, []);

    return (
        <form className="flex flex-wrap gap-2 border p-4">
            <h3 className="text-3xl text-white">Auto Focus on page-load</h3>
            <label className="w-full">(useRef hook)This will focus on each render</label>
            <input ref={userName} type="text" placeholder="Username goes here..." className="border border-black py-1 px-2 min-w-[500px]" />
            <input type="submit" className="px-4 py-2 cursor-pointer text-white bg-green-700 hover:bg-green-800" />
        </form>
    )
}