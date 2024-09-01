import Navbar from "../components/Navbar";
import {Outlet} from "react-router-dom"
export default function LayoutPage(){
    return(
        <>
        <Navbar/>
        <Outlet/>
        </>
    )
}