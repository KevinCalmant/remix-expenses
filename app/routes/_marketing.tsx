import {Outlet} from "@remix-run/react";
import marketingStyles from "~/styles/marketing.css";
import MainHeader from "~/components/navigation/MainHeader";
import type {LoaderArgs} from "@remix-run/node";
import {getUserFromSession} from "~/data/auth.server";

const MarketingAppLayout = () => {
    return (
        <>
            <MainHeader/>
            <Outlet/>
        </>
    );
};

export const loader = ({request}: LoaderArgs) => {
    return getUserFromSession(request);
};

export const links = () => {
    return [{rel: "stylesheet", href: marketingStyles}];
};

export const headers = () => {
    return {
        "Cache-Control": "max-age=3600",
    };
};

export default MarketingAppLayout;