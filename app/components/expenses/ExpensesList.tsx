import type {ExpenseModel} from "~/data/validation.server";
import ExpenseListItem from "./ExpenseListItem";

const ExpensesList = ({expenses}: { expenses: ExpenseModel[] }) => {
    return (
        <ol id="expenses-list">
            {
                expenses.map((expense) => (
                    <li key={expense.id}>
                        <ExpenseListItem id={expense.id!} title={expense.title} amount={expense.amount}/>
                    </li>
                ))
            }
        </ol>
    );
}

export default ExpensesList;