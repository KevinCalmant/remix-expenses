import type {ZodError} from "zod";

export function extractErorrMessages(error: ZodError): string[] {
    return error.errors.map((zodIssue) => zodIssue.message);
}