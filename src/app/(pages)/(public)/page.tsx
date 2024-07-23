"use client"

// Imports
// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";

import { GiHook } from "react-icons/gi";
import { SiRedux } from "react-icons/si";
import { LuClipboardList } from "react-icons/lu";

import ShoppingCart from "@/components/lessons/ShoppingCart";
import WizardStepper from "@/components/lessons/WizardStepper";
import FocusInput from "@/components/lessons/FocusInput";
import PrevCount from "@/components/lessons/PrevCount";
import ToggleVisibility from "@/components/lessons/ToggleVisibility";
import Typography from "@/components/lessons/Typography";
import Performance from "@/components/lessons/Performance";
import Redux from "@/components/lessons/Redux";
import RHFBasics from "@/components/lessons/RHFBasics";
import StopwatchTimer from "@/components/lessons/StopwatchTimer";
import ImageCarousel from "@/components/lessons/ImageCarousel";
import VideoPlayer from "@/components/lessons/VideoPlayer";
import ToDoList from "@/components/lessons/ToDoList";
import RecipeManager from "@/components/lessons/RecipeManager";
import RHFRegistrationForm from "@/components/lessons/RHFRegistrationForm";
import RHFDynamicFormBuilder from "@/components/lessons/RHFDynamicFormBuilder";
import RHFMultiStepForm from "@/components/lessons/RHFMultiStepForm";
import { Suspense } from "react";
import Loading from "../../loading";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
        <main className="flex flex-col gap-4">
            <div className="flex flex-col gap-6">
                <Suspense fallback={<Loading />}>

                    {/* Hero */}
                    <div className="flex flex-col bg-[url('https://images.unsplash.com/photo-1561736778-92e52a7769ef')] bg-center bg-no-repeat bg-cover py-[100px] relative z-0">
                        <div className="overlay absolute top-0 left-0 h-full w-full bg-black/90 backdrop-blur-md"></div>
                        <div className="flex flex-col flex-grow container z-10">
                            <div className="grid grid-cols-2 gap-10 h-full w-full">
                                <div className="flex flex-col justify-center gap-6">
                                    <h1 className="h-fit text-5xl font-semibold text-white">Welcome to the <br />Home page</h1>
                                    <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    <Button className="w-fit bg-blue-800 hover:bg-blue-700">Click Me</Button>
                                </div>
                                <Image src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853" alt="hero image" height={600} width={600} className="h-[500px] w-[500px] object-cover border-8" />
                            </div>
                        </div>
                    </div>
                    {/* End Hero */}

                    {/* --- REF HOOK */}
                    {/* <h2 className="flex items-center gap-2 mt-6 text-white text-4xl font-semibold"> <GiHook /> REF HOOK</h2>
                    <FocusInput />
                    <StopwatchTimer />
                    <ImageCarousel />
                    <VideoPlayer /> */}

                    {/* --- REDUX TOOLKIT ---- */}
                    {/* <h2 className="flex items-center gap-2 mt-6 text-white text-4xl font-semibold"><SiRedux /> REDUX TOOLKIT</h2>
                    <ShoppingCart />
                    <ToDoList />
                    <RecipeManager /> */}

                    {/* <h2 className="flex items-center gap-2 mt-6 text-white text-4xl font-semibold"><LuClipboardList /> REACT HOOK FORMS</h2>
                    <RHFRegistrationForm />
                    <RHFMultiStepForm /> */}

                    {/* <h2 className="flex items-center gap-2 mt-6 text-white text-4xl font-semibold"><LuClipboardList /> OTHER WORK</h2> */}
                    {/* <RHFBasics /> */}
                    {/* <PrevCount /> */}
                    {/* <ToggleVisibility /> */}
                    {/* <WizardStepper /> */}
                    {/* <Performance /> */}
                    {/* <Redux /> */}
                    {/* <RHFDynamicFormBuilder /> */}

                </Suspense>
            </div>
        </main>
    );
}
