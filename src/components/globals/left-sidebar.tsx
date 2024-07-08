"use client"

// imports
import { useState } from "react";
import Link from "next/link";

// React UI
import { GiMouse } from "react-icons/gi";
import { FaUser, FaPhone } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { LuArrowLeftFromLine } from "react-icons/lu";
import { LuArrowRightFromLine } from "react-icons/lu";

// Shadcn UI
import { Button } from "@/components/ui/button"

export default function LeftSidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const MenuItems = [
        {
            name: 'About',
            href: '#',
            icon: <FaUser className={`text-2xl h-[35px] w-[35px] rounded-full bg-gray-600 text-white mx-auto p-2 ${sidebarOpen && 'absolute top-3'}`} />,
            children: [
                {
                    name: 'Jeffrey',
                    href: '#'
                }
            ]
        },
        {
            name: 'Projects',
            href: '#',
            icon: <FaPencil className={`text-2xl h-[35px] w-[35px] rounded-full bg-gray-600 text-white mx-auto p-2 ${sidebarOpen && 'absolute top-3'}`} />
        },
        {
            name: 'Contact',
            href: '#',
            icon: <FaPhone className={`text-2xl h-[35px] w-[35px] rounded-full bg-gray-600 text-white mx-auto p-2 ${sidebarOpen && 'absolute top-3'}`} />
        }
    ]

    return (
        <aside className={`w-full max-w-[320px] h-screen border bg-slate-100 sticky transition-all duration-300 ${!sidebarOpen && 'max-w-[75px]'}`}>
            <div className={`flex flex-col h-full gap-6 py-6 ${sidebarOpen && 'container'}`}>
                <div className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
                    <GiMouse className="text-6xl" />
                    {sidebarOpen && <p className="font-bold text-lg">Jeffrey&apos;s <br />Web Development</p>}
                </div>

                <div className={`flex flex-col gap-4 ${sidebarOpen && 'hidden'}`}>
                    {
                        MenuItems.map((item, i) => {
                            return (
                                <Button key={i} variant="ghost" className="relative w-full mx-auto">
                                    {item.icon}
                                </Button>
                            )
                        })
                    }
                </div>

                {
                    MenuItems.map((item, i) => {
                        return (
                            <>

                                <Link key={i} href="#">{item.name}</Link>
                            </>

                        )
                    })
                }


                <Button onClick={() => setSidebarOpen((prev) => !prev)} className={`flex gap-2 w-fit mt-auto ${sidebarOpen ? 'ml-auto' : 'mx-auto'}`}>
                    {sidebarOpen ? <LuArrowLeftFromLine className="text-xl" /> : <LuArrowRightFromLine className="text-xl" />}
                    {sidebarOpen ? "Collapse" : ""}
                </Button>
            </div>
        </aside>
    )
}