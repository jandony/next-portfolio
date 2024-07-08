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
    | { type: 'REMOVE_ITEM'; payload: { id: number; price: number } };


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

    useEffect(() => {
        console.log(state)
    }, [state]);

    return (
        <div className="flex flex-col gap-2 border p-4">
            <h3 className="text-3xl text-white">Shopping Cart</h3>
            <p>(useReducer hook)</p>

            <div className="flex gap-4">
                <div className="grid grid-cols-2 items-start gap-4 w-full border p-4">
                    <div className="w-full">
                        <div className="h-[150px] w-full mb-4 bg-slate-100"></div>
                        <p>$10.00</p>
                        <button onClick={() => addItemToCart({ id: state.items.length + 1, name: 'Product 1', price: 10 })} className="px-4 py-2 cursor-pointer text-white bg-green-700 hover:bg-green-800">Add Product 1</button>
                    </div>
                    <div className="w-full">
                        <div className="h-[150px] w-full mb-4 bg-slate-100"></div>
                        <p>$20.00</p>
                        <button onClick={() => addItemToCart({ id: state.items.length + 1, name: 'Product 2', price: 20 })} className="px-4 py-2 cursor-pointer text-white bg-green-700 hover:bg-green-800">Add Product 2</button>
                    </div>
                    <div className="w-full">
                        <div className="h-[150px] w-full mb-4 bg-slate-100"></div>
                        <p>$30.00</p>
                        <button onClick={() => addItemToCart({ id: state.items.length + 1, name: 'Product 3', price: 30 })} className="px-4 py-2 cursor-pointer text-white bg-green-700 hover:bg-green-800">Add Product 3</button>
                    </div>
                    <div className="w-full">
                        <div className="h-[150px] w-full mb-4 bg-slate-100"></div>
                        <p>$40.00</p>
                        <button onClick={() => addItemToCart({ id: state.items.length + 1, name: 'Product 4', price: 40 })} className="px-4 py-2 cursor-pointer text-white bg-green-700 hover:bg-green-800">Add Product 4</button>
                    </div>
                </div>

                <div className="border p-4 w-full">
                    {state.items.length === 0 && (
                        <div className="border-b py-4 w-full">
                            <p>No items in your cart! Add an item to show.</p>
                        </div>
                    )}
                    {state.items.map(item => (
                        <div key={item.id} className="flex items-center justify-between gap-4 border-b py-2 w-full">
                            <span>{item.name} ({item.id})</span>
                            <span className="ml-auto">${item.price}.00</span>
                            <button onClick={() => removeItemFromCart(item.id, item.price)} className="px-4 py-2 cursor-pointer text-white bg-red-700 hover:bg-red-800">Remove</button>
                        </div>
                    ))}
                    <div className="py-4">
                        <strong>Total Amount: ${state.totalAmount.toFixed(2)}</strong>
                    </div>
                </div>
            </div>
        </div>
    )
}