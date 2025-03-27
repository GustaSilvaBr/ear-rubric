import { Outlet, useNavigate } from "react-router-dom"

export function Home(){
    const navigate = useNavigate();

    function goRubric(){
        console.log("Hey")
        return navigate("/rubric");
    }

    return (
        <div>
            <h1>Home</h1>
            <button onClick={goRubric}>
                sign in
            </button>
            <Outlet/>
        </div>
    )
}