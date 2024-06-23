import { configureStore } from '@reduxjs/toolkit'
import { blogReducer } from '../features/blog/blogSlice'
import { blogApi } from './../services/blog/blogApi';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
    reducer: {
        blog: blogReducer,
        [blogApi.reducerPath]: blogApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware)
})

setupListeners(store.dispatch)