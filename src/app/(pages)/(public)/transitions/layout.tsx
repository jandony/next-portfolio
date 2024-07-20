import { TransitionProvider } from "@/app/context/TransitionContext";
import DelayedLink from "@/components/globals/DelayedLink";
import Overlay from "@/components/globals/Overlay";
import Link from "next/link";
import { Suspense } from "react"

export default function TransitionLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <TransitionProvider>
            <section className="fixed top-0 left-0 z-50 flex flex-col w-full min-h-screen pt-20">
                <Suspense>
                    <Overlay />
                    <div className="flex justify-center items-center gap-4">
                        <DelayedLink href="/transitions/one" className="border px-4 py-2 hover:text-black hover:bg-white transition-all duration-300">
                            Page 1
                        </DelayedLink>
                        <DelayedLink href="/transitions/two" className="border px-4 py-2 hover:text-black hover:bg-white transition-all duration-300">
                            Page 2
                        </DelayedLink>
                        <DelayedLink href="/transitions/three" className="border px-4 py-2 hover:text-black hover:bg-white transition-all duration-300">
                            Page 3
                        </DelayedLink>
                        <DelayedLink href="/transitions/four" className="border px-4 py-2 hover:text-black hover:bg-white transition-all duration-300">
                            Page 4
                        </DelayedLink>
                        <DelayedLink href="/transitions/five" className="border px-4 py-2 hover:text-black hover:bg-white transition-all duration-300">
                            Page 5
                        </DelayedLink>
                    </div>
                    {children}
                </Suspense>
            </section>
        </TransitionProvider>
    )
}