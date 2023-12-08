import * as React from'react';
import {Link, useNavigate} from "react-router-dom";

export default function Navbar() {

    return (
        <>
      <nav>
        <Link to="/">BocalAdvisor</Link>
      </nav>
      <nav>
        <Link to="/Page1">Hôtels</Link>
      </nav>
      <nav>
        <Link to="/Page2">Restaurants</Link>
      </nav>
        </>
    )
}