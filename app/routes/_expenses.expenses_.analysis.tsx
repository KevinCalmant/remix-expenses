import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpensesStatistics";
import {isRouteErrorResponse, Link, useLoaderData, useRouteError} from "@remix-run/react";
import {getExpenses} from "~/data/expenses.server";
import {json, LoaderArgs} from "@remix-run/node";
import Error from "~/components/utils/Error";
import {requireUserSession} from "~/data/auth.server";

const ExpenseAnalysis = () => {
    const expenses = useLoaderData();
    return (
        <main>
            <Chart expenses={expenses}/>
            <ExpenseStatistics expenses={expenses}/>
        </main>
    );
}

export const loader = async ({request}: LoaderArgs) => {
    const expenses = await getExpenses(await requireUserSession(request));
    if (!expenses || expenses.length === 0) {
        throw json(
            {
                message: "Could not load expenses for the requested analysis."
            },
            {
                status: 404,
                statusText: "Expenses not found",
            },
        );
    }
    return expenses;
};

export const ErrorBoundary = () => {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
        return (
            <main>
                <Error title={error.statusText}>
                    <p>{error.data?.message || "Something went wrong. Please try again later."}</p>
                    <p>Back to <Link to="/">safety</Link>.</p>
                </Error>
            </main>
        );
    }
    return (
        <main>
            <Error title="An error occured">
                <p>Something went wrong. Please try again later.</p>
                <p>Back to <Link to="/">safety</Link>.</p>
            </Error>
        </main>
    );
};

export default ExpenseAnalysis;