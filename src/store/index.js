import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../components/slice/auth";
import ArticleReducer from "../components/slice/article";
export const store = configureStore({
    reducer: { auth: AuthReducer, article: ArticleReducer },
    devTools: true,
});

//process.env.NODE_ENV !== "production"
