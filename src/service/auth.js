import axios from "./api";

const AuthService = {
    async userRegister(user) {
        const response = await axios.post("/users", { user });
        return response?.data;
    },
    async userLogin(user) {
        const response = await axios.post("/users/login", { user });
        return response?.data;
    },
    async getUser() {
        const { data } = await axios.get("/user");
        return data;
    },
};
export default AuthService;
