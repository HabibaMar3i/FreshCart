import { Helmet } from "react-helmet";
import error from '../../Assets/error.svg'
function NotFound() {
    return <>
        <Helmet>
            <meta />
            <title>NotFound</title>
        </Helmet>
        <div className="container d-flex justify-content-center">
            <img src={error} alt="error"/>
        </div>
    </>;
}

export default NotFound;