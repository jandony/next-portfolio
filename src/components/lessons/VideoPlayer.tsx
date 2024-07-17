"use client"

// imports
import { useRef, useEffect } from "react";

export default function VideoPlayer() {
    // YouTube video ID
    const videoID = "KWX8lzzzrzA"
    const videoRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<YT.Player | null>(null);

    useEffect(() => {
        // Load the IFrame Player API code asynchronously
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode && firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Create a new YouTube player instance
        window.onYouTubeIframeAPIReady = () => {
            if (videoRef.current) {
                playerRef.current = new window.YT.Player(videoRef.current, {
                    videoId: videoID,
                    events: {
                        onReady: onPlayerReady,
                    },
                });
            }
        };
    }, [videoID]);

    const onPlayerReady = (event: YT.PlayerEvent) => {
        event.target.playVideo();
    };

    const play = () => {
        playerRef.current && playerRef.current.playVideo();
    };

    const pause = () => {
        playerRef.current && playerRef.current.pauseVideo();
    };

    const restart = () => {
        if (playerRef.current) {
            playerRef.current.seekTo(0, true);
            playerRef.current.playVideo();
        }
    };


    return (
        <div className="flex flex-col justify-center gap-2 my-2 border p-8">
            <div>
                <h3 className="text-3xl text-white py-2">Video Player</h3>
                <label className="w-full">Lesson: Custom video player with play, pause, and seek controls.</label>
            </div>

            <div className="relative">
                <div className="absolute top-0 left-0 h-full w-full bg-transparent"></div>
                <div ref={videoRef} className="w-full h-full aspect-video"></div>
            </div>

            <div className="flex justify-center items-center gap-4 p-2 bg-gray-600 w-full">
                <button onClick={play} className="px-4 py-2 cursor-pointer text-white rounded-lg bg-green-700 hover:bg-green-800">Play</button>
                <button onClick={pause} className="px-4 py-2 cursor-pointer text-white rounded-lg bg-red-700 hover:bg-red-800">Pause</button>
                <button onClick={restart} className="px-4 py-2 cursor-pointer text-white rounded-lg bg-yellow-700 hover:bg-yellow-800">Restart</button>
            </div>

            <div className="border-t border-white/25 py-4">
                <h4 className="text-xl text-white py-2">What I Learned:</h4>
                <ul className="list-disc px-6">
                    <li>The useRef hook can be used to target specific elements in the DOM</li>
                    <li>The window.onYouTubeIframeAPIReady function can be used to dynamically embedd YouTube videos in the DOM</li>
                    <li>Customized controls can be created to improve accessibility</li>
                </ul>
            </div>
        </div>
    )
}