import { FaHandshake, FaTrophy } from "react-icons/fa";
import PricingPlan from "~/components/marketing/PricingPlan";
import {HeadersArgs} from "@remix-run/node";

const PRICING_PLANS = [
    {
        id: 'p1',
        title: 'Basic',
        price: 'Free forever',
        perks: ['1 User', 'Up to 100 expenses/year', 'Basic analytics'],
        icon: FaHandshake
    },
    {
        id: 'p2',
        title: 'Pro',
        price: '$9.99/month',
        perks: ['Unlimited Users', 'Unlimited expenses/year', 'Detailed analytics'],
        icon: FaTrophy
    },
];

const PricingPage = () => {
    return (
        <main id="pricing">
            <h2>Great Product, Simple Pricing</h2>
            <ol id="pricing-plans">
                {
                    PRICING_PLANS.map((plan) => (
                        <li className="plan" key={plan.id}>
                            <PricingPlan 
                                title={plan.title}
                                price={plan.price}
                                perks={plan.perks}
                                icon={plan.icon}
                            />
                        </li>
                    ))
                }
            </ol>
        </main>
    );
};

export const meta = () => ([{
    title: "Pricing",
    description: "See our pricing plans.",
}]);

export const headers = ({parentHeaders}: HeadersArgs) => {
    return {
        "Cache-Control": parentHeaders.get("Cache-Control"),
    };
};

export const handle = {disableJS: true};

export default PricingPage;