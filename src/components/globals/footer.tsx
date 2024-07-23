import DelayedLink from "./DelayedLink";

export default function Footer() {
    return (
        <footer className="block text-gray-500 mt-auto">
            <div className="bg-[#0b111e] py-[100px]">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Logo Column */}
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <DelayedLink href="/" className="transition-all duration-300">
                            <p className="text-3xl text-white">Logo</p>
                        </DelayedLink>
                        <p className="text-center md:text-left">Your Company Slogan</p>
                    </div>

                    {/* First Column */}
                    <div>
                        <h3 className="text-white text-lg mb-2">Column 1 Heading</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">List Item 1</a></li>
                            <li><a href="#" className="hover:text-white">List Item 2</a></li>
                            <li><a href="#" className="hover:text-white">List Item 3</a></li>
                        </ul>
                    </div>

                    {/* Second Column */}
                    <div>
                        <h3 className="text-white text-lg mb-2">Column 2 Heading</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">List Item 1</a></li>
                            <li><a href="#" className="hover:text-white">List Item 2</a></li>
                            <li><a href="#" className="hover:text-white">List Item 3</a></li>
                        </ul>
                    </div>

                    {/* Third Column */}
                    <div>
                        <h3 className="text-white text-lg mb-2">Column 3 Heading</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">List Item 1</a></li>
                            <li><a href="#" className="hover:text-white">List Item 2</a></li>
                            <li><a href="#" className="hover:text-white">List Item 3</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-[#121212] p-4">
                <p className="text-center text-sm">
                    &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
                </p>
            </div>
        </footer>
    )
}