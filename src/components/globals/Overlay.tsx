"use client"

import { useTransition } from '@/app/context/TransitionContext';

export default function Overlay() {
    const { isTransitioning } = useTransition();

    return (
        <div className={`flex flex-col justify-center items-center absolute left-0 bg-black z-auto w-full transition-all duration-500 ${isTransitioning ? 'z-auto h-full top-0' : '-z-50 h-0 -top-20'}`}>
            <div className="flex flex-col items-center justify-center gap-6 h-full">
                <h1 className="text-white text-4xl z-auto animate-bounce">loading page...</h1>
                <div className="w-24 h-24 border-t-4 border-blue-500 border-solid rounded-full animate-spin z-auto"></div>
            </div>
        </div>
    );
};
