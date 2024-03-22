import { useCallback } from "react";
import { useSelector } from "react-redux";

const ValidationError = () => {
    const { error } = useSelector((state) => state.auth);

    const errorMessage = useCallback(() => {
        return Object.keys(error).map((name) => {
            const msg = error[name]?.join(", ");
            return `${name}- ${msg}`;
        });
    }, [error]);

    return (
        error != null &&
        errorMessage().map((error, i) => (
            <div
                className="alert alert-danger m-0 mb-2 p-2"
                role="alert"
                key={i}
            >
                {error}
            </div>
        ))
    );
};

export default ValidationError;
