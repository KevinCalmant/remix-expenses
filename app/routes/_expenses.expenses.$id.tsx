import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/utils/Modal";
import {useNavigate} from "@remix-run/react";
import type {ActionArgs} from "@remix-run/node";
import {redirect, V2_MetaArgs} from "@remix-run/node";
import {deleteExpense, updateExpense} from "~/data/expenses.server";
import {extractErorrMessages} from "~/utils/zod.utils";
import {ZodError} from "zod";
import {expenseSchema} from "~/data/validation.server";
import type {Expense} from ".prisma/client";

const ExpenseDetailsPage = () => {
    const navigate = useNavigate();

    const handleOnClose = () => {
        navigate('..');
    };

    return (
        <Modal onClose={handleOnClose}>
            <ExpenseForm/>
        </Modal>
    );
}

export const action = async ({params, request}: ActionArgs) => {
    const expenseId = params.id!;
    if (request.method === "PATCH") {
        const formData = Object.fromEntries(await request.formData());
        try {
            await updateExpense(expenseId!, expenseSchema.parse(formData));
        } catch (error) {
            if (error instanceof ZodError) {
                return extractErorrMessages(error);
            }
            throw error;
        }
    } else if (request.method === "DELETE") {
        await deleteExpense(expenseId);
    }
    return redirect("/expenses");
};

export const meta = ({params, matches}: V2_MetaArgs) => {
    const expenses = matches.find((match) => match.id === 'routes/_expenses.expenses')?.data as Expense[];
    const expense = expenses.find((expense) => expense.id === params.id);
    return [{
        title: expense?.title,
        description: "Update expense.",
    }];
};


export default ExpenseDetailsPage;