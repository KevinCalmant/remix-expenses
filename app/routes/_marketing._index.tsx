import {Link} from "@remix-run/react";
import {FaArrowRight, FaChartBar, FaDollarSign} from "react-icons/fa";
import {HeadersArgs} from "@remix-run/node";

const Index = () => {
    return (
        <main>
            <section className="marketing-section">
                <header>
                    <FaDollarSign/>
                    <h2>A Central Space</h2>
                </header>
                <div className="marketing-content">
                    <div className="marketing-image">
                        <img src="images/expenses-management.jpg" alt="A list of expenses"/>
                    </div>
                    <div className="marketing-explanation">
                        <p>Manage your expenses in one centrale place.</p>
                        <p>
                            <Link className="cta" to="/expenses">
                                <span>Get Started</span>
                                <FaArrowRight/>
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
            <section className="marketing-section">
                <header>
                    <FaChartBar/>
                    <h2>Detailed Analytics</h2>
                </header>
                <div className="marketing-content">
                    <p className="marketing-explanation">
                        Benefit from best-in-class analytics to understad your spending patterns.
                    </p>
                    <div className="marketing-image">
                        <img src="images/expenses-chart.jpg" alt="A demo bar chart."/>
                    </div>
                </div>
            </section>
        </main>
    );
};

export const meta = () => ([{
    title: "RemixExpenses - The Complete App",
    description: "Manage your expenses with ease.",
}]);

export const headers = ({parentHeaders}: HeadersArgs) => {
    return {
        "Cache-Control": parentHeaders.get("Cache-Control"),
    };
};

export const handle = {disableJS: true};

export default Index;