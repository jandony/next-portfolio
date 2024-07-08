"use client"

// Imports
// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
import ShoppingCart from "@/components/lessons/ShoppingCart";
import WizardStepper from "@/components/lessons/WizardStepper";
import FocusInput from "@/components/lessons/FocusInput";
import PrevCount from "@/components/lessons/PrevCount";
import ToggleVisibility from "@/components/lessons/ToggleVisibility";
import Typography from "@/components/lessons/Typography";
import Performance from "@/components/lessons/Performance";

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
                <Performance />
                {/* <FocusInput />
                <PrevCount />
                <ToggleVisibility />
                <ShoppingCart />
                <WizardStepper /> */}
            </div>
        </main>
    );
}
