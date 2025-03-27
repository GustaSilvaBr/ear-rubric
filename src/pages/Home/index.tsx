import { Outlet, useNavigate, Link } from "react-router-dom"
import "./styles.scss";

export function Home() {
    const navigate = useNavigate();

    function handleAddNewRubric() {
        return navigate("/rubric");
    }

    function backToHome() {
        return navigate("/");
    }

    return (
        <div className="home-container">
            <div className="sidebar">
                <Link to={"/"}>
                    <h2>Ear Rubric</h2>
                </Link>

                <button onClick={handleAddNewRubric} className="add-button">+ Add Rubric</button>
                <div className="footer">&#169; Made by Gustavo Silva</div>
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}