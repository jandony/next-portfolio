"use client"

import Image from "next/image";
// imports
import { useEffect, useRef, useState } from "react";

export default function ImageCarousel() {
    const [startTransition, setTransition] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);

    const images = [
        'https://images.unsplash.com/photo-1720303672730-db8825c961f5',
        'https://images.unsplash.com/photo-1720469918563-8e586cdf81d2',
        'https://images.unsplash.com/photo-1720446983083-10ba2f82fc69',
    ];

    const nextImage = () => {
        setTransition(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            setTransition(false);
        }, 1000)
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         nextImage();
    //     }, 3000); // Change image every 3 seconds
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <div className="flex flex-wrap gap-2 border p-8">
            <h3 className="text-3xl text-white">Image Carousel</h3>
            <label className="w-full">Lesson: DOM Minipulation, managing transitions, animations, and auto-play features.</label>

            <div className="border-2 border-gray-600 w-full relative overflow-hidden">
                <div className="flex relative w-full aspect-video" ref={carouselRef}>
                    <Image src={`${images[currentIndex]}`} alt={`Slide ${currentIndex}`} height={274} width={411} className={`w-full h-auto object-cover transition-all duration-500 ${!startTransition ? 'scale-100 opacity-100' : 'mr-10 scale-95 opacity-0'}`} />
                </div>
                <div className="flex justify-between items-center gap-4 p-2 bg-gray-600 w-full absolute bottom-0">
                    <button onClick={prevImage} className="px-4 py-2 cursor-pointer text-white rounded-lg bg-black hover:bg-gray-900">Prev</button>
                    <span className="text-white text-2xl">{`${currentIndex + 1} / ${images.length}`}</span>
                    <button onClick={nextImage} className="px-4 py-2 cursor-pointer text-white rounded-lg bg-black hover:bg-gray-900">Next</button>
                </div>
            </div>

        </div>
    )
}