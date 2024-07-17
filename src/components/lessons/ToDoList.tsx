"use client"

// imports
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { addItem, removeItem, resetItems } from "@/lib/redux/task/taskSlice";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useState } from "react";


export default function ToDoList() {
    const tasks = useSelector((state: RootState) => state.task.value);
    const dispatch = useDispatch<AppDispatch>();

    const [taskField, setTaskField] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (taskField.trim()) {
            if (!tasks.includes(taskField)) {
                dispatch(addItem(taskField));
                setTaskField('');
                setErrorMessage('');
            } else {
                setErrorMessage('Task already exists.');
            }
        } else {
            setErrorMessage('Task cannot be empty.');
        }
    }

    return (
        <div className="flex flex-col gap-2 border p-8">
            <div>
                <h3 className="text-3xl text-white py-2">ToDo List</h3>
                <p>(Redux Toolkit)</p>
            </div>

            <div className="flex gap-4">
                <div className="grid grid-cols-2 items-start gap-4 w-full p-4">
                    <form onSubmit={handleTask}>
                        <div className="flex items-start gap-4 w-full pr-4">
                            <Input type="text" placeholder="Enter Task..." value={taskField} onChange={(e) => setTaskField(e.target.value)} className="text-white bg-slate-700" />
                            <Button type="submit" className="cursor-pointer px-4 py-2 rounded-lg bg-green-700 hover:bg-green-800">Add Task</Button>
                        </div>
                        {errorMessage && <p className="text-red-500 p-2">{errorMessage}</p>}
                    </form>

                    <div className="border p-4 w-full relative h-[425px]">
                        {tasks.length === 0 && (
                            <div className="border-b p-4 w-full">
                                <p>No items in your cart! Add an item to show.</p>
                            </div>
                        )}

                        <div className={`h-full max-h-[425px] scroll-auto overflow-auto relative ${tasks.length >= 8 && 'pr-3'}`}>
                            {tasks.map((item, i) => (
                                <div key={i} className="flex items-center justify-between gap-4 border-b py-2 w-full">
                                    <span>{item}</span>
                                    <button onClick={() => dispatch(removeItem(item))} className="px-4 py-2 cursor-pointer text-white bg-red-700 hover:bg-red-800">Remove</button>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between p-4 bg-black border-t absolute bottom-0 left-0 right-0">
                            <p className="text-white font-semibold">{tasks && tasks.length} Tasks</p>
                            <button onClick={() => dispatch(resetItems())} className="px-4 py-2 cursor-pointer rounded-lg text-white bg-yellow-700 hover:bg-yellow-800">Reset Cart</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/25 py-4">
                <h4 className="text-xl text-white py-2">What I Learned:</h4>
                <ul className="list-disc px-6">
                    <li>CRUD operation using the Redux Toolkit</li>
                    <li>Using form checks to see if an item already exists inside the state's array</li>
                    <li>Simple form validation with error handling messages</li>
                </ul>
            </div>
        </div>
    )
}