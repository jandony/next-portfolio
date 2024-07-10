import { createSlice } from "@reduxjs/toolkit";

// Define the type of the state
interface TaskState {
    value: string[]; 
}

// Initial State
const initialState: TaskState = {
    value: [],
};

// Create Slice
const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addItem: (state, action) => {
            if (state.value) {
                state.value = [...state.value, action.payload];
            }
        },
        removeItem: (state, action) => {
            if (state.value) {
                state.value = state.value.filter(item => item !== action.payload);
            }
        },
        resetItems: (state) => {
            if (state.value) {
                state.value = [];
            }
        }
    },
});

// Export Slice actions and reducer
export const { addItem, removeItem, resetItems } = taskSlice.actions;

export default taskSlice.reducer;