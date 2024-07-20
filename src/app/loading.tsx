export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="flex justify-center items-center min-h-[1000px] w-full">
            <div className="h-[200px] w-[200px] relative flex items-center justify-center">
                <div className="absolute h-full w-full border-t-2 border-dashed border-green-700 rounded-full animate-spin">
                </div>
                <p className="absolute h-fit w-full text-lg text-center my-auto animate-bounce">Loading...</p>
            </div>
        </div>
    )
}