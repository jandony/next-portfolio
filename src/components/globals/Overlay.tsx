"use client"

import { useTransition } from '@/app/context/TransitionContext';

export default function Overlay() {
    const { isTransitioning } = useTransition();

    return (
        // slide down transition effect
        // <div className={`flex flex-col justify-center items-center absolute left-0 bg-black w-full transition-all duration-500 ${isTransitioning ? 'z-50 h-full top-0' : '-z-50 h-0 -top-20'}`}>

        <div className={`flex flex-col justify-center items-center absolute top-0 left-0 w-full h-full bg-slate-900 transition-all duration-500 ${isTransitioning ? 'opacity-100 z-50' : 'opacity-0 -z-50'}`}>
            <div className="flex flex-col items-center justify-center gap-6 h-full">
                <p className="text-white text-4xl z-auto animate-bounce">loading...</p>
                <div className="w-24 h-24 border-t-4 border-blue-500 border-solid rounded-full animate-spin z-auto"></div>
            </div>
        </div>
    );
};
