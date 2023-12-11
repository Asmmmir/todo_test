import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./todoSlice/todoSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import completedTasksReducer from "./AsyncSlice/AsyncSlice";

const store = configureStore({
reducer: {
    todo: todoSlice.reducer,
    completedTasks: completedTasksReducer,
},
devTools: true
})


export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector

export default store