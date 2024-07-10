import { configureStore } from '@reduxjs/toolkit';

import counterReducer from "@/lib/redux/counter/counterSlice";
import taskReducer from "@/lib/redux/task/taskSlice";
import recipesReducer from "@/lib/redux/recipes/recipesSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        task: taskReducer,
        recipes: recipesReducer
    }
  });

// Infer the type of store
export type AppStore = typeof store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']