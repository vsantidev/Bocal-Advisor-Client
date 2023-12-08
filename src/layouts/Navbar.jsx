import * as React from'react';
import { Link } from "react-router-dom";

export default function Navbar() {

    return (
        <>
            <nav>
                <Link to="/">BocalAdvisor</Link>
            </nav>
            <nav>
                <Link to="/register">Inscription</Link>
            </nav>
            <nav>
                <Link to="/login">Connexion</Link>
            </nav>
        </>
    );
}