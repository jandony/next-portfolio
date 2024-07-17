"use client"

// imports
import { useEffect, useReducer } from "react";

// TypeScript Definitions
type Item = {
    id: number;
    name: string;
    price: number;
};

type State = {
    items: Item[];
    totalAmount: number;
};

type Action =
    | { type: 'ADD_ITEM'; payload: Item }
    | { type: 'REMOVE_ITEM'; payload: { id: number; price: number } }
    | { type: 'RESET_CART' };


// Reducer: initial State
const initialState = {
    items: [],
    totalAmount: 0,
};

// Reducer: reducer function
function cartReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'ADD_ITEM':
            const updatedItems = [...state.items, action.payload];
            const updatedTotalAmount = state.totalAmount + action.payload.price;
            return {
                ...state,
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            };
        case 'REMOVE_ITEM':
            const filteredItems = state.items.filter(item => item.id !== action.payload.id);
            const reducedTotalAmount = state.totalAmount - action.payload.price;
            return {
                ...state,
                items: filteredItems,
                totalAmount: reducedTotalAmount,
            };
        case 'RESET_CART':
            return {
                ...state,
                items: [],
            };
        default:
            return state;
    }
}

export default function ShoppingCart() {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addItemToCart = (item: Item) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
    };

    const removeItemFromCart = (id: number, price: number) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { id, price } });
    };

    const resetCart = () => {
        dispatch({ type: 'RESET_CART' });
    }

    useEffect(() => {
        console.log(state)
    }, [state]);

    return (
        <div className="flex flex-col gap-4 border p-8">
            <div>
                <h3 className="text-3xl text-white py-2">Shopping Cart</h3>
                <label className="w-full">Lesson: Custom video player with play, pause, and seek controls.</label>
            </div>

            <div className="flex gap-4">
                <div className="grid grid-cols-2 items-start gap-4 w-full p-4">
                    <div className="w-full">
                        <div className="h-[150px] w-full mb-4 bg-slate-600"></div>
                        <p>$10.00</p>
                        <button onClick={() => addItemToCart({ id: state.items.length + 1, name: 'Product 1', price: 10 })} className="mt-3 px-4 py-2 rounded-lg cursor-pointer text-white bg-green-700 hover:bg-green-800">Add Product 1</button>
                    </div>
                    <div className="w-full">
                        <div className="h-[150px] w-full mb-4 bg-slate-600"></div>
                        <p>$20.00</p>
                        <button onClick={() => addItemToCart({ id: state.items.length + 1, name: 'Product 2', price: 20 })} className="mt-3 px-4 py-2 rounded-lg cursor-pointer text-white bg-green-700 hover:bg-green-800">Add Product 2</button>
                    </div>
                    <div className="w-full">
                        <div className="h-[150px] w-full mb-4 bg-slate-600"></div>
                        <p>$30.00</p>
                        <button onClick={() => addItemToCart({ id: state.items.length + 1, name: 'Product 3', price: 30 })} className="mt-3 px-4 py-2 rounded-lg cursor-pointer text-white bg-green-700 hover:bg-green-800">Add Product 3</button>
                    </div>
                    <div className="w-full">
                        <div className="h-[150px] w-full mb-4 bg-slate-600"></div>
                        <p>$40.00</p>
                        <button onClick={() => addItemToCart({ id: state.items.length + 1, name: 'Product 4', price: 40 })} className="mt-3 px-4 py-2 rounded-lg cursor-pointer text-white bg-green-700 hover:bg-green-800">Add Product 4</button>
                    </div>
                </div>

                <div className="border p-4 w-full relative">
                    {state.items.length === 0 && (
                        <div className="border-b p-4 w-full">
                            <p>No items in your cart! Add an item to show.</p>
                        </div>
                    )}
                    <div className={`max-h-[425px] scroll-auto overflow-auto relative ${state?.items.length >= 8 && 'pr-3'}`}>
                        {state.items.map((item, i) => (
                            <div key={i} className="flex items-center justify-between gap-4 border-b py-2 w-full">
                                <span>{item.name} ({item.id})</span>
                                <span className="ml-auto">${item.price}.00</span>
                                <button onClick={() => removeItemFromCart(item.id, item.price)} className="px-4 py-2 cursor-pointer text-white bg-red-700 hover:bg-red-800">Remove</button>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between p-4 bg-black border-t absolute bottom-0 left-0 right-0">
                        <p className="text-white font-semibold">Total Amount: ${state.totalAmount.toFixed(2)}</p>
                        <button onClick={() => resetCart()} className="px-4 py-2 cursor-pointer rounded-lg text-white bg-yellow-700 hover:bg-yellow-800">Reset Cart</button>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/25 py-4">
                <h4 className="text-xl text-white py-2">What I Learned:</h4>
                <p className="py-2">Redux</p>
                <ul className="list-disc px-6">
                    <li>Redux is a state management library that can add custom logic to State</li>
                    <li>Redux should NOT be used for all projects, but only larger and complex applications.</li>
                    <li>Store: Central repository for the application state. Can be remembered as "global states"</li>
                    <li>Slice: Component-like chunks of code that helps organize & manage multiple states and reducers. (Ex: authentication, profiles, notifications, etc.)</li>
                    <li>Dispatch: Redux methods that send actions to the store</li>
                    <li>Actions: Objects that define what & how to update application states</li>
                    <li>Reducers: Defined functions that update & manipulate state specified by the dispatch actions</li>
                </ul>
                <p className="py-2">Mini Project</p>
                <ul className="list-disc px-6">
                    <li>Reducers can be used for CRUD operations with State</li>
                    <li>Reducers use switch statements to keep logic organized and scalable</li>
                    <li>Reducers will never directly mutate the store's state. It will make a copy first, then will overwrite the entire state. (similar to React)</li>
                    <li>Initial State is very powerful for reset functions and remembering the original data that was used.</li>
                    <li>Payloads are passed inside Actions to determine how much or how little to update state by</li>
                </ul>
            </div>
        </div>
    )
}