"use client"

// imports
import { useState, useRef } from "react";

export default function StopwatchTimer() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(0);

    const start = () => {
        if (!isRunning) {
            setIsRunning(true);
            intervalRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
    };

    const stop = () => {
        if (isRunning) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
        }
    };

    const reset = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setTime(0);
    };

    return (
        <div className="flex flex-col gap-2 border p-8 ">
            <h3 className="text-3xl text-white">Stopwatch / Timer</h3>
            <label className="w-full">Lesson: Manage intervals and track state changes without causing unnecessary re-renders</label>

            <div className="border-2 border-gray-600 w-full max-w-[500px]">
                <p className="text-white text-6xl text-center bg-black p-6 w-full max-w-[500px]">{time} seconds</p>
                <div className="flex justify-center items-center gap-4 p-2 bg-gray-600 w-full max-w-[500px]">
                    <button onClick={start} className="px-4 py-2 cursor-pointer text-white rounded-lg bg-green-700 hover:bg-green-800">Start</button>
                    <button onClick={stop} className="px-4 py-2 cursor-pointer text-white rounded-lg bg-red-700 hover:bg-red-800">Stop</button>
                    <button onClick={reset} className="px-4 py-2 cursor-pointer text-white rounded-lg bg-yellow-700 hover:bg-yellow-800">Reset</button>
                </div>
            </div>
        </div>
    )
}