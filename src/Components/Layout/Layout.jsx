import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Offline } from "react-detect-offline";
function Layout() {
    return <>
        <Navbar />
        <div className="fix">
            <Outlet />
        </div><Offline>
            <div className="network">
                <i className="fas fa-wifi p-1"></i>
                You're Offline
            </div>
        </Offline>
        <Footer />
    </>;
}

export default Layout;