import { createStore, combineReducers, applyMiddleware} from "redux";
import { Tuple, configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import { thunk } from "redux-thunk";



const rootReducers = combineReducers({
    profilePage : profileReducer,
    dialogsPage : dialogsReducer,
    usersPage : usersReducer,
    auth : authReducer
})

const middleware = [thunk]

const store = configureStore({
    reducer : rootReducers,
    middleware : () => new Tuple(thunk),
})
// const store = createStore(rootReducers, applyMiddleware(thunk))

// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

export default store;