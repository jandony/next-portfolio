export default function Page() {
    const bgImg = 'https://images.unsplash.com/photo-1475669698648-2f144fcaaeb1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

    return (
        <main className="flex flex-col gap-4">
            <div className="flex flex-col gap-6">

                {/* Hero */}
                <div style={{ backgroundImage: `url(${bgImg})` }} className="flex flex-col bg-center bg-no-repeat bg-cover py-[100px] relative z-0 border-b">
                    <div className="overlay absolute top-0 left-0 h-full w-full bg-black/80 backdrop-blur-sm"></div>
                    <div className="flex flex-col flex-grow container z-10">
                        <div className="flex flex-col justify-center gap-6">
                            <h1 className="h-fit text-5xl font-semibold text-white">About</h1>
                        </div>
                    </div>
                </div>
                {/* End Hero */}

            </div>
        </main>
    )
}