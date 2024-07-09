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
        <form className="flex flex-wrap gap-2 border p-8">
            <h3 className="text-3xl text-white">Form Focus Management</h3>
            <label className="w-full">Lesson: This input field will auto focus on each page re-load</label>

            <input ref={userName} type="text" placeholder="Username goes here..." className="text-white bg-slate-700 py-1 px-2 rounded-lg min-w-[500px]" />
            <input type="submit" className="px-4 py-2 cursor-pointer text-white rounded-lg bg-green-700 hover:bg-green-800" />
        </form>
    )
}