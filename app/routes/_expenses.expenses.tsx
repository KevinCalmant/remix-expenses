import {Link, Outlet, useLoaderData} from "@remix-run/react";
import ExpensesList from "~/components/expenses/ExpensesList";
import {FaDownload, FaPlus} from "react-icons/fa";
import {getExpenses} from "~/data/expenses.server";
import {HeadersArgs, json, LoaderArgs} from "@remix-run/node";
import {requireUserSession} from "~/data/auth.server";

const ExpensesLayout = () => {
    const expenses = useLoaderData();

    const hasExpenses = expenses?.length > 0

    return (
        <>
            <Outlet/>
            <main>
                <section id="expenses-actions">
                    <Link to="add">
                        <FaPlus/>
                        <span>Add Expense</span>
                    </Link>
                    <a href="/expenses/raw">
                        <FaDownload/>
                        <span>Load Row Data</span>
                    </a>
                </section>
                {hasExpenses && <ExpensesList expenses={expenses}/>}
                {!hasExpenses && (
                    <section id="no-expenses">
                        <h1>No expenses found</h1>
                        <p>Start <Link to="add">adding some</Link> today.</p>
                    </section>
                )}
            </main>
        </>
    );
};

export const loader = async ({request}: LoaderArgs) => {
    const expenses = getExpenses(await requireUserSession(request));
    return json(expenses, {
        headers: {
            "Cache-Control": "max-age=3",
        },
    });
};

export const headers = ({loaderHeaders}: HeadersArgs) => {
    return {
        "Cache-Control": loaderHeaders.get("Cache-Control"),
    };
};

export default ExpensesLayout;