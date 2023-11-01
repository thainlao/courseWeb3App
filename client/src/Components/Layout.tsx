import React,{ReactNode} from "react"
import Navbar from "./Navbar"

interface LayoutPage {
    children: ReactNode;
}

const Layout: React.FC<LayoutPage> = ({children}) => {

    return (
        <React.Fragment>
            <Navbar />
            {children}
        </React.Fragment>
    )
}

export default Layout;