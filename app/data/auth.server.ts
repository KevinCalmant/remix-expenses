import type {CredentialModel} from "~/data/validation.server";
import {prisma} from "~/data/database.server";
import {compare, hash} from "bcryptjs";
import {AuthError} from "~/utils/error.utils";
import {createCookieSessionStorage, redirect} from "@remix-run/node";
import * as process from "process";

const SESSION_SECRET = process.env.SESSION_SECRET!;

const sessionStorage = createCookieSessionStorage({
   cookie: {
       secure: process.env.NODE_ENV === "production",
       secrets: [SESSION_SECRET],
       sameSite: "lax",
       maxAge: 30 * 24 * 60 * 60,
       httpOnly: true,
   },
});

const createUserSession = async (userId: string, redirectPath: string) => {
    const session = await sessionStorage.getSession();
    session.set("userId", userId);
    return redirect(redirectPath, {
        headers: {
            "Set-Cookie": await sessionStorage.commitSession(session),
        }
    });
};

export const destroyUserSession = async (request: Request) => {
    const session = await sessionStorage.getSession(request.headers.get("Cookie"));
    return redirect("/", {
        headers: {
            "Set-Cookie": await sessionStorage.destroySession(session),
        }
    });
};

export const getUserFromSession = async (request: Request) => {
    const session = await sessionStorage.getSession(request.headers.get('Cookie'));
    const userId = session.get("userId");
    if (!userId) {
        return null;
    }
    return userId;
};

export const requireUserSession = async (request: Request) => {
    const userId = await getUserFromSession(request);
    if (!userId) {
        throw redirect("/auth?mode=login");
    }
    return userId;
}

export const signup = async ({email, password}: CredentialModel) => {
    const existingUser = await prisma.user.findFirst({where: {email}});
    if (existingUser) {
        throw new AuthError(422, "A user with the provided email address already exists.");
    }
    const passwordHash = await hash(password, 12);
    const user = await prisma.user.create({data: {email, password: passwordHash}});
    return createUserSession(user.id, "/expenses");
};

export const login = async ({email, password}: CredentialModel) => {
    const existingUser = await prisma.user.findFirst({where: {email}});
    if (!existingUser) {
        throw new AuthError(401, "Could not log you in, please check the provided credentials.");
    }

    const isPasswordCorrect = await compare(password, existingUser.password);
    if (!isPasswordCorrect) {
        throw new AuthError(401, "Could not log you in, please check the provided credentials.");
    }
    return createUserSession(existingUser.id, "/expenses");
}