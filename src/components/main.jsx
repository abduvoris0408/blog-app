import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../ui";
import { useNavigate } from "react-router-dom";
import { getArticlesSuccess, getArticlesStart } from "./slice/article";
import { useEffect } from "react";
import ArticleService from "../service/article";

const Main = () => {
    const { articles, isLoading } = useSelector((state) => state.article);
    const { loggedIn, user } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getArticles = async () => {
        dispatch(getArticlesStart());
        try {
            const response = await ArticleService.getArticles();

            dispatch(getArticlesSuccess(response.articles));
        } catch (error) {}
    };
    const deleteArticle = async (slug) => {
        try {
            const response = await ArticleService.deleteArticle(slug);
            getArticles();
            console.log(response);
        } catch (error) {}
    };

    useEffect(() => {
        getArticles();
    }, []);

    return (
        <>
            {isLoading && <Loader />}

            <div className="album py-5  ">
                <div>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {articles?.map((item) => (
                            <div className="col" key={item.id}>
                                <div className="card h-100 shadow-sm">
                                    <svg
                                        className="bd-placeholder-img card-img-top"
                                        width="100%"
                                        height="225"
                                        xmlns="http://www.w3.org/2000/svg"
                                        role="img"
                                        aria-label="Placeholder: Thumbnail"
                                        preserveAspectRatio="xMidYMid slice"
                                        focusable="false"
                                    >
                                        <title>Placeholder</title>
                                        <rect
                                            width="100%"
                                            height="100%"
                                            fill="#55595c"
                                        ></rect>
                                    </svg>
                                    <div className="card-body">
                                        <p className="card-text fw-bold m-0">
                                            {item.title}
                                        </p>
                                        <p className="card-text ">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className=" card-footer d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-success"
                                                onClick={() =>
                                                    navigate(
                                                        `/article/${item.slug}`
                                                    )
                                                }
                                            >
                                                View
                                            </button>

                                            {loggedIn &&
                                                user?.username ==
                                                    item.author.username && (
                                                    <>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-outline-secondary"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/edit-article/${item.slug}`
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() =>
                                                                deleteArticle(
                                                                    item.slug
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    </>
                                                )}
                                        </div>
                                        <small className="text-muted fw-bold text-capitalize">
                                            {item.author.username}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Main;
