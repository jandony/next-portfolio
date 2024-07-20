import { Suspense } from "react"
import Loading from "../loading"

export default function BlogLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <section className="flex w-full">
            {/* Include shared UI here e.g. a header or sidebar */}
            {/* <nav className="w-full py-4 bg-slate-100">
                <ul className="flex gap-4 justify-center items-center space-between w-full max-w-[1000px] mx-auto py-4 bg-slate-100">
                    <li>Home</li>
                    <li>About</li>
                    <li>Blog</li>
                    <li>Contact</li>
                </ul>
            </nav> */}

            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
        </section>
    )
}