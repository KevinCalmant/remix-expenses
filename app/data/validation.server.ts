import {z} from "zod";

export const credentialsSchema = z.object({
    email: z.string().email("Invalid email address."),
    password: z.string().min(7, "Invalid password. Must be at least 7 characters."),
});

export type CredentialModel = z.infer<typeof credentialsSchema>;

export const expenseSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(0, "Invalid expense title. Must be at least one character long").max(30, "Invalid expense title. Must be at most 30 characters long."),
    amount: z.string().transform((a) => parseFloat(a)).pipe(z.coerce.number().min(0, "Invalid amount. Must be a number greater than zero.")),
    date: z.string().transform((d) => new Date(d)).pipe(z.coerce.date().max(new Date(), "Invalid date. Must be a date before today")),
    dateAdded: z.string().optional().nullable(),
});

export type ExpenseModel = z.infer<typeof expenseSchema>;
