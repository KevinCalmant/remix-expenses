import {useMemo} from "react";
import type {ExpenseModel} from "~/data/validation.server";

type Statistic = {
    minAmount: number,
    maxAmount: number,
    sum: number,
    mean: number,
};

const calculateSummaryStatistics = (expenses: ExpenseModel[]): Statistic => {
    const amounts = expenses.map((expense) => +expense.amount);
    const sum = amounts.reduce((prev, curr) => prev + curr, 0);
    return {
        minAmount: Math.max(...amounts),
        maxAmount: Math.min(...amounts),
        sum,
        mean: sum / expenses.length,
    };
}

const ExpenseStatistics = ({expenses}: { expenses: ExpenseModel[] }) => {
    const {minAmount, maxAmount, sum, mean} = useMemo(
        () => calculateSummaryStatistics(expenses),
        [expenses],
    );

    return (
        <section>
            <h2>Summary Statistics</h2>
            <dl id="expense-statistics">
                <div>
                    <dt>Total</dt>
                    <dd>${sum.toFixed(2)}</dd>
                </div>
                <div>
                    <dt>Average</dt>
                    <dd>${mean.toFixed(2)}</dd>
                </div>
                <div>
                    <dt>Min. Amount</dt>
                    <dd>${minAmount.toFixed(2)}</dd>
                </div>
                <div>
                    <dt>Max. amount</dt>
                    <dd>${maxAmount.toFixed(2)}</dd>
                </div>
            </dl>
        </section>
    )
}

export default ExpenseStatistics;