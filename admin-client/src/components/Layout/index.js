import Sidebar from "../sidebar/Sidebar"
import Topbar from "../topbar/Topbar"
import "./styles.css"

const Layout = ({ children }) => {
    return (
        <>
            <Topbar />
            <div className="container">
                <Sidebar />
                {children}
            </div>
        </>
    )
}

export default Layout