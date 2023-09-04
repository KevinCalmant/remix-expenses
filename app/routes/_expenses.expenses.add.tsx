import ExpenseForm from "~/components/expenses/ExpenseForm"
import Modal from "~/components/utils/Modal";
import {useNavigate} from "@remix-run/react";
import {addExpense} from "~/data/expenses.server";
import type {ActionArgs} from "@remix-run/node";
import {redirect} from "@remix-run/node";
import {expenseSchema} from "~/data/validation.server";
import {extractErorrMessages} from "~/utils/zod.utils";
import {ZodError} from "zod";
import {requireUserSession} from "~/data/auth.server";

const ExpenseAddPage = () => {
    const navigate = useNavigate();

    const handleOnClose = () => {
        navigate('..');
    };

    return (
        <Modal onClose={handleOnClose}>
            <ExpenseForm/>
        </Modal>
    );
};

export const action = async ({request}: ActionArgs) => {
    const userId = await requireUserSession(request);
    const formData = Object.fromEntries(await request.formData());
    try {
        await addExpense(expenseSchema.parse(formData), userId);
    } catch (error) {
        if (error instanceof ZodError) {
            return extractErorrMessages(error);
        }
        throw error;
    }
    return redirect("/expenses");
};

export default ExpenseAddPage;