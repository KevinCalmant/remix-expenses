import {
    isRouteErrorResponse,
    Link,
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration, useMatches,
    useRouteError,
} from "@remix-run/react";

import sharedStyles from '~/styles/shared.css';
import type {ReactNode} from "react";
import Error from "~/components/utils/Error";

const Document = ({title, children}: { title?: string, children: ReactNode }) => {
    const matches = useMatches();
    const disableJS = matches.some((match) => match.handle?.disableJS);
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            <title>{title}</title>
            <Meta/>
            <Links/>
        </head>
        <body>
        {children}
        <ScrollRestoration/>
        {!disableJS && <Scripts/>}
        <LiveReload/>
        </body>
        </html>
    )
};

const App = () => {
    return (
        <Document>
            <Outlet/>
        </Document>
    );
};

export const meta = () => ([{
    charset: "utf-8",
    title: "New Remix App",
    viewport: "width=device-width,initial-scale=1",
}]);

export const links = () => {
    return [{rel: "stylesheet", href: sharedStyles}];
};

export const ErrorBoundary = () => {
    const error = useRouteError() as Error;
    if (isRouteErrorResponse(error)) {
        return (
            <Document title={error.statusText}>
                <main>
                    <Error title={error.statusText}>
                        <p>{error.data?.message || "Something went wrong. Please try again later."}</p>
                        <p>Back to <Link to="/">safety</Link>.</p>
                    </Error>
                </main>
            </Document>
        );
    }
    return (
        <Document title="An error occured">
            <main>
                <Error title="An error occured">
                    <p>{error.message || "Something went wrong. Please try again later."}</p>
                    <p>Back to <Link to="/">safety</Link>.</p>
                </Error>
            </main>
        </Document>
    );
};


export default App;