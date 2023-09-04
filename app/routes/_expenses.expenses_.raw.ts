import {getExpenses} from "~/data/expenses.server";
import {LoaderArgs} from "@remix-run/node";
import {requireUserSession} from "~/data/auth.server";

export const loader = async ({request}: LoaderArgs) => {
    return getExpenses(await requireUserSession(request));
};