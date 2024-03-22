import { useDispatch, useSelector } from "react-redux";
import { Input } from "../ui";
import { icon } from "./constants";
import { useEffect, useState } from "react";
import { signUserStart, signUserSuccess, signUserFailure } from "./slice/auth";
import AuthService from "../service/auth";
import { ValidationError } from "./";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isLoading, loggedIn } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const registerHandler = async (e) => {
        e.preventDefault();
        dispatch(signUserStart());
        const user = { username: name, email, password };
        try {
            const response = await AuthService.userRegister(user);
            console.log(response);

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
                    <h1 className="h3 mb-3 fw-normal">Please regsiter</h1>
                    <ValidationError />

                    <Input label={"Username"} state={name} setState={setName} />
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
                        onClick={registerHandler}
                        disabled={isLoading}
                        type="submit"
                    >
                        {isLoading ? "Loading..." : "Register"}
                    </button>
                    <p className="mt-5 mb-3 text-body-secondary">©2024-2025</p>
                </form>
            </main>
        </div>
    );
};

export default Register;
