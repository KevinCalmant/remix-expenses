const FormattedDate = ({date}: { date: string }) => {
    const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return <time dateTime={new Date(date).toISOString()}>{formattedDate}</time>;
}

export default FormattedDate;