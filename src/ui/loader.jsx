const Loader = () => {
    return (
        <button
            className="btn btn-primary d-block mx-auto"
            type="button"
            disabled
        >
            <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
            ></span>
            <span role="status">Loading...</span>
        </button>
    );
};

export default Loader;
