"use client"

import Link from "next/link";
// imports
import { FaUser, FaPhone } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function Header() {
    const MenuItems = [
        {
            name: 'About',
            href: '#',
            icon: <FaUser className={`text-2xl h-[35px] w-[35px] rounded-full bg-gray-600 text-white mx-auto p-2`} />,
            children: [
                {
                    name: 'Column 1',
                    column: [
                        {
                            name: 'item 1',
                            href: '#'
                        },
                        {
                            name: 'item 2',
                            href: '#',
                        },
                        {
                            name: 'item 3',
                            href: '#',
                        },
                    ]
                },
                {
                    name: 'Column 2',
                    column: [
                        {
                            name: 'item 4',
                            href: '#'
                        },
                        {
                            name: 'item 5',
                            href: '#',
                        },
                        {
                            name: 'item 6',
                            href: '#',
                        },
                    ]
                },
                {
                    name: 'Column 3',
                    column: [
                        {
                            name: 'item 7',
                            href: '#'
                        },
                        {
                            name: 'item 8',
                            href: '#',
                        },
                        {
                            name: 'item 9',
                            href: '#',
                        },
                    ]
                },
                {
                    name: 'Column 4',
                    column: [
                        {
                            name: 'item 10',
                            href: '#'
                        },
                    ]
                },
            ]
        },
        {
            name: 'Projects',
            href: '#',
            icon: <FaPencil className={`text-2xl h-[35px] w-[35px] rounded-full bg-gray-600 text-white mx-auto p-2`} />
        },
        {
            name: 'Contact',
            href: '#',
            icon: <FaPhone className={`text-2xl h-[35px] w-[35px] rounded-full bg-gray-600 text-white mx-auto p-2`} />
        }
    ]

    return (
        <header className="bg-slate-800 text-white sticky top-0 z-20 shadow-lg">
            <div className="flex items-center justify-between gap-4 container relative">
                <div className="flex items-center h-full">
                    <p className="text-3xl">Logo</p>
                </div>
                <nav className="flex items-center justify-end p-2 gap-4 ml-auto">
                    {MenuItems.map((item, i) => (
                        <div key={i} className="group">
                            <Link href={item.href} className="text-sm px-4 py-4 rounded-lg hover:bg-slate-700 transition-all duration-300 flex items-center">
                                {item.name}
                            </Link>
                            {/* Mega Menu */}
                            {/* {item.children && (
                                <div className="absolute left-0 bottom-full w-full bg-gray-800 rounded-lg p-4 shadow-lg opacity-0 group-hover:opacity-100 group-hover:top-full group-hover:bottom-auto transition-all duration-300 z-0">
                                    <div className={`grid divide-x mx-auto grid-cols-${item.children.length}`}>
                                        {item.children.map((child, i) => (
                                            <div key={i} className="p-3 min-h-[350px]">
                                                <p>{child.name}</p>
                                                <ul className="p-1">
                                                    {child.column.map((subItem, k) => (
                                                        <li key={k} className="py-2">
                                                            <Link href={subItem.href} className="block px-4 py-2 hover:bg-blue-800 rounded-md">
                                                                {subItem.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )} */}
                        </div>
                    ))}
                </nav>
                <Link href="#" className="text-sm px-4 py-2 bg-blue-800 rounded-md hover:bg-blue-700 transition-all duration-300">Click Me</Link>
            </div>
        </header>
    )
}