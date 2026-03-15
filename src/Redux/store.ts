import {configureStore} from "@reduxjs/toolkit"
import counterReducer from "./features/counterExample/counterSlice"
import sidebarReducer from "./features/sideBar/sideBarSlice"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        sidebar: sidebarReducer,
    },
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch