import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { increment, decrement, incrementByAmount, incrementAsync } from "@/lib/redux/counter/counterSlice";

export default function Redux() {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="flex flex-col justify-center gap-2 my-2 border p-4">
            <h3 className="text-3xl text-white">State Management: Redux</h3>
            <p>(Redux Toolkit)</p>

            <div className="mt-4">
                <div className="flex items-center gap-4 py-2">
                    <button onClick={() => dispatch(decrement())} className="cursor-pointer px-4 py-2 rounded-full bg-blue-800 hover:bg-blue-700 hover:text-white">Decrement</button>
                    <h2>{count}</h2>
                    <button onClick={() => dispatch(increment())} className="cursor-pointer px-4 py-2 rounded-full bg-blue-800 hover:bg-blue-700 hover:text-white">Increment</button>
                </div>
                <div className="flex items-center gap-4 py-2 text-sm">
                    <button onClick={() => dispatch(incrementByAmount(10))} className="cursor-pointer px-4 py-2 border rounded-full hover:bg-slate-600 hover:text-white">Increment by 10</button>
                    <button onClick={() => dispatch(incrementAsync(10))} className="cursor-pointer px-4 py-2 border rounded-full hover:bg-slate-600 hover:text-white">(async) Increment by 10</button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {
                    [...Array(8)].map((i) => {
                        return (
                            <div key={i} className="flex justify-center items-center gap-2 border p-4">
                                Total Count: <span className="text-lg text-white">{count}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
