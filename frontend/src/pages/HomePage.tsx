import React from "react";
import {Link} from "react-router-dom";
function HomePage() {
    return (
        <>
            <h1>
                HomePage
            </h1>

            <Link to="/chat"> ChatPage </Link>
        </>
    );
}

export default HomePage;