import {prisma} from "~/data/database.server";
import type {Expense} from ".prisma/client";
import type {ExpenseModel} from "~/data/validation.server";

export async function addExpense(expenseData: ExpenseModel, userId: string) {
    try {
        return await prisma.expense.create({
            data: {
                title: expenseData.title,
                amount: expenseData.amount,
                date: new Date(expenseData.date),
                User: {connect: {id: userId}}
            },
        });
    } catch (error) {
        throw new Error("Failed to created expense.");
    }
}

export async function updateExpense(id: string, expenseData: ExpenseModel) {
    try {
        return await prisma.expense.update({
            data: {
                title: expenseData.title,
                amount: expenseData.amount,
                date: new Date(expenseData.date),
            },
            where: {
                id,
            }
        })
    } catch (error) {
        throw new Error("Failed to update expense.")
    }
}

export async function getExpenses(userId: string, direction: 'asc' | 'desc' = 'desc'): Promise<Expense[]> {
    if (!userId) {
        throw new Error("Failed to fetch expenses");
    }
    try {
        return await prisma.expense.findMany({where: {userId}, orderBy: {date: direction}});
    } catch (error) {
        throw new Error("Failed to fetch expenses");
    }
}

export async function deleteExpense(id: string) {
    try {
        return await prisma.expense.delete({where: {id}});
    } catch (error) {
        throw new Error("Failed to delete expense.");
    }
}