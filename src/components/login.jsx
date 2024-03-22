import { icon } from "./constants";
import { Input } from "../ui";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUserSuccess, signUserFailure, signUserStart } from "./slice/auth";
import AuthService from "../service/auth";
import { ValidationError } from "./";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isLoading, loggedIn } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const loginHandler = async (e) => {
        e.preventDefault();
        dispatch(signUserStart());
        const user = { email, password };
        try {
            const response = await AuthService.userLogin(user);

            dispatch(signUserSuccess(response.user));
            navigate("/");
        } catch (error) {
            dispatch(signUserFailure(error.response?.data.errors));
        }
    };

    useEffect(() => {
        if (loggedIn) {
            navigate("/");
        }
    }, [loggedIn]);
    return (
        <div className="text-center">
            <main className="form-signin w-25 m-auto">
                <form>
                    <img
                        className="mb-6"
                        src={icon}
                        alt=""
                        width="150"
                        height="150"
                    />
                    <h1 className="h3 mb-3 fw-normal">Please Login</h1>
                    <ValidationError />

                    <Input
                        label={"Email address"}
                        state={email}
                        setState={setEmail}
                    />
                    <Input
                        label={"Password"}
                        type={"password"}
                        state={password}
                        setState={setPassword}
                    />

                    <div className="form-check text-start my-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value="remember-me"
                            id="flexCheckDefault"
                        />
                        <label className=" checkbox" value="remember-me">
                            Remember me
                        </label>
                    </div>
                    <button
                        className="btn btn-primary w-100 py-2"
                        onClick={loginHandler}
                        disabled={isLoading}
                        type="submit"
                    >
                        {isLoading ? "Loading..." : "Login"}
                    </button>
                    <p className="mt-5 mb-3 text-body-secondary">©2024-2025</p>
                </form>
            </main>
        </div>
    );
};

export default Login;
