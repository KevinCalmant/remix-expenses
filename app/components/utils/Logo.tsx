import {Link} from "@remix-run/react";

const Logo = () => {
    return (
        <h1 id="logo">
            <Link to="/">RemixExpenses</Link>
        </h1>
    );
}

export default Logo;