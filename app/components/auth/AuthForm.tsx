import {Form, useActionData, useNavigation, useSearchParams} from "@remix-run/react";
import {Link} from "react-router-dom";
import {FaLock, FaUserPlus} from 'react-icons/fa';

const AuthForm = () => {
    const [searchParams] = useSearchParams();
    const navigation = useNavigation();
    const validationErrors = useActionData<string[]>();

    const authMode = searchParams.get("mode") || "login";

    const submitButtonCaption = authMode === "login" ? "Login" : "Ceate User";
    const toggleButttonCaption = authMode === "login" ? "Create a new user" : "Log in with existing user";

    const isSubmitting = navigation.state !== "idle";

    return (
        <Form method="post" className="form" id="auth-form">
            <div className="icon-img">
                {authMode === "login" ? <FaLock/> : <FaUserPlus/>}
            </div>
            <p>
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" required/>
            </p>
            <p>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required/>
            </p>
            {
                validationErrors && (
                    <ul>
                        {
                            validationErrors.map((error) => (
                                <li key={error}>{error}</li>
                            ))
                        }
                    </ul>
                )
            }
            <div className="form-actions">
                <button disabled={isSubmitting}>
                    {isSubmitting ? "Authenticating..." : submitButtonCaption}
                </button>
                <Link to={authMode === "login" ? "?mode=signup" : "?mode=login"}>
                    {toggleButttonCaption}
                </Link>
            </div>
        </Form>
    );
};

export default AuthForm;