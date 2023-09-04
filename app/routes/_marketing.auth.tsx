import AuthForm from "~/components/auth/AuthForm";
import authStyles from "~/styles/auth.css";
import type {ActionArgs} from "@remix-run/node";
import {ZodError} from "zod";
import {extractErorrMessages} from "~/utils/zod.utils";
import {credentialsSchema} from "~/data/validation.server";
import {login, signup} from "~/data/auth.server";
import {AuthError} from "~/utils/error.utils";
import {HeadersArgs} from "@remix-run/node";

const AuthPage = () => {
    return (
        <AuthForm/>
    )
};

export const action = async ({request}: ActionArgs) => {
    try {
        const searchParams = new URL(request.url).searchParams;
        const authMode = searchParams.get("mode") || "login";
        const formData = Object.fromEntries(await request.formData());
        const credentials = credentialsSchema.parse(formData);
        if (authMode === "login") {
            return await login(credentials);
        } else {
            return await signup(credentials);
        }
    } catch (error) {
        if (error instanceof ZodError) {
            return extractErorrMessages(error);
        } else if (error instanceof AuthError && error.status === 422) {
            return [error.message];
        }
        throw error;
    }
};

export const links = () => {
    return [{rel: "stylesheet", href: authStyles}];
};

export const headers = ({parentHeaders}: HeadersArgs) => {
    return {
        "Cache-Control": parentHeaders.get("Cache-Control"),
    };
};

export default AuthPage;