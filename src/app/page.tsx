"use client"

// Imports
// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";

import { GiHook } from "react-icons/gi";
import { SiRedux } from "react-icons/si";

import ShoppingCart from "@/components/lessons/ShoppingCart";
import WizardStepper from "@/components/lessons/WizardStepper";
import FocusInput from "@/components/lessons/FocusInput";
import PrevCount from "@/components/lessons/PrevCount";
import ToggleVisibility from "@/components/lessons/ToggleVisibility";
import Typography from "@/components/lessons/Typography";
import Performance from "@/components/lessons/Performance";
import Redux from "@/components/lessons/Redux";
import ReactHookForm from "@/components/lessons/ReactHookForm";
import StopwatchTimer from "@/components/lessons/StopwatchTimer";
import ImageCarousel from "@/components/lessons/ImageCarousel";
import VideoPlayer from "@/components/lessons/VideoPlayer";

export default function Home() {
    // const domain = "https://reactwp.jeffandony.com";
    // const pathname = usePathname();
    // const [data, setData] = useState([]);
    // const [blogPosts, setBlogPosts] = useState([]);

    // useEffect(() => {
    //     async function loadPosts() {
    //         try {
    //             const [pagesResponse, postsResponse] = await Promise.all([
    //                 fetch(domain + "/wp-json/wp/v2/pages?per_page=100"),
    //                 fetch(domain + "/wp-json/wp/v2/posts?per_page=100"),
    //             ]);

    //             if (!pagesResponse.ok || !postsResponse.ok) {
    //                 // Handle errors if necessary
    //                 return;
    //             }

    //             const [pages, posts] = await Promise.all([
    //                 pagesResponse.json(),
    //                 postsResponse.json(),
    //             ]);

    //             const allData = pages.concat(posts);

    //             setData(allData);
    //             setBlogPosts(allData);
    //         } catch (error) {
    //             // Handle other errors if necessary
    //             console.error("Error loading posts:", error);
    //         }
    //     }

    //     loadPosts();
    // }, [pathname]);

    // console.log(pathname);

    return (
        <main className="flex flex-col gap-4 p-6">
            <div className="flex flex-col gap-6">
                {/* <ReactHookForm /> */}
                {/* <PrevCount /> */}
                {/* <ToggleVisibility /> */}
                {/* <WizardStepper /> */}
                {/* <Performance /> */}
                {/* <Redux /> */}

                {/* --- REF HOOK */}
                <h2 className="flex items-center gap-2 mt-6 text-white text-4xl font-semibold"> <GiHook /> REF HOOK</h2>
                <FocusInput />
                <StopwatchTimer />
                <ImageCarousel />
                <VideoPlayer />

                {/* --- REDUX TOOLKIT ---- */}
                <h2 className="flex items-center gap-2 mt-6 text-white text-4xl font-semibold"><SiRedux /> REDUX TOOLKIT</h2>
                <ShoppingCart />
                {/* ToDoList */}
                {/* Recipe Manager */}
                {/* Search App */}
            </div>
        </main>
    );
}
