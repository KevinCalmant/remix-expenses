import {FaExclamationCircle} from "react-icons/fa"
import {ReactNode} from "react";

const Error = ({title, children}: { title: string, children: ReactNode }) => {
    return (
        <div className="error">
            <div className="icon">
                <FaExclamationCircle/>
            </div>
            <h2>{title}</h2>
            {children}
        </div>
    );
}

export default Error;