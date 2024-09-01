import { createBrowserRouter } from "react-router-dom";

import DetaiProduct from "../view/DetailProduct";
import Homepage from "../view/homepage";

const router =  createBrowserRouter([
    {
        path : "/",
        element : <Homepage/>
    },
    {
        path : "/detail/:id",
        element : <DetaiProduct/>
    },
])

export default router