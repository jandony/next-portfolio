"use client"

// imports
import { useState, useRef } from "react";

export default function StopwatchTimer() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const start = () => {
        if (!isRunning) {
            setIsRunning(true);
            intervalRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
    };

    const stop = () => {
        if (isRunning && intervalRef.current) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
        }
    };

    const reset = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setIsRunning(false);
        setTime(0);
    };

    return (
        <div className="flex flex-col gap-4 border p-8">
            <div>
                <h3 className="text-3xl text-white py-2">Stopwatch / Timer</h3>
                <label className="w-full">Lesson: Manage intervals and track state changes without causing unnecessary re-renders</label>
            </div>

            <div className="border-2 border-gray-600 w-full max-w-[500px]">
                <p className="text-white text-6xl text-center bg-black p-6 w-full max-w-[500px]">{time} seconds</p>
                <div className="flex justify-center items-center gap-4 p-2 bg-gray-600 w-full max-w-[500px]">
                    <button onClick={start} className="px-4 py-2 cursor-pointer text-white rounded-lg bg-green-700 hover:bg-green-800">Start</button>
                    <button onClick={stop} className="px-4 py-2 cursor-pointer text-white rounded-lg bg-red-700 hover:bg-red-800">Stop</button>
                    <button onClick={reset} className="px-4 py-2 cursor-pointer text-white rounded-lg bg-yellow-700 hover:bg-yellow-800">Reset</button>
                </div>
            </div>

            <div className="border-t border-white/25 py-4">
                <h4 className="text-xl text-white py-2">What I Learned:</h4>
                <ul className="list-disc px-6">
                    <li>The useRef hook can reference previous values for updating.</li>
                    <li>A useState variable can be used to track when a process is in progress or not.</li>
                    <li>A combination of the useRef hook, useState hook, and Interval functions can allow the state to update without causing re-renders to the DOM.</li>
                </ul>
            </div>
        </div>
    )
}