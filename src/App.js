import { Routes, Route } from "react-router-dom";
import {
    Main,
    Register,
    Navbar,
    Login,
    ArticleDetail,
    CreateArticle,
    EditArticle,
} from "./components";
import { useEffect } from "react";
import AuthService from "./service/auth";
import { useDispatch } from "react-redux";
import { signUserSuccess } from "./components/slice/auth";
import { getItem } from "./helpers/persistance-storage";

const App = () => {
    const dispatch = useDispatch();
    const getUser = async () => {
        try {
            const response = await AuthService.getUser();
            dispatch(signUserSuccess(response.user));
        } catch (error) {}
    };

    useEffect(() => {
        const token = getItem("token");
        if (token) {
            getUser();
        }
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/article/:slug" element={<ArticleDetail />} />
                    <Route path="/create-article" element={<CreateArticle />} />
                    <Route
                        path="/edit-article/:slug"
                        element={<EditArticle />}
                    />
                </Routes>
            </div>
        </div>
    );
};

export default App;
