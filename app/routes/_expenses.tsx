import {Outlet} from "@remix-run/react";
import expensesStyles from "~/styles/expenses.css";
import ExpensesHeader from "~/components/navigation/ExpensesHeader";

const ExpensesAppLayout = () => {
    return (
        <>
            <ExpensesHeader />
            <Outlet/>
        </>
    );
};

export const links = () => {
    return [{rel: "stylesheet", href: expensesStyles}];
};

export default ExpensesAppLayout;