"use client"

// imports
import { useEffect, useRef, useState } from "react";

export default function PrevCount() {
    const [count, setCount] = useState(0);
    const prevCount = useRef(0);

    useEffect(() => {
        prevCount.current = count;
    }, [count]);

    return (
        <div className="flex flex-col justify-center gap-2 my-2 border p-4">
            <h3 className="text-3xl text-white">Previous State</h3>
            <p>(useRef hook)</p>
            <p>Previous Count: {prevCount.current} | Current Count: {count}</p>
            <button onClick={() => setCount(count + 1)} className="px-4 py-2 w-fit cursor-pointer text-white bg-green-700 hover:bg-green-800">Add +1</button>
        </div>
    )
}