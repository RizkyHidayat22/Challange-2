import { createBrowserRouter, redirect } from "react-router-dom";

import LayoutPage from "../layoutPage/layoutPage";
import HomePage from "../view/HomePage";
import Login from "../view/LoginPage";
import Toastify from "toastify-js";
import AddProducts from "../view/AddProducts";
import EditProduts from "../view/EditProduct";
import AddUser from "../view/AddUser";
import CategoryPage from "../view/Categories";
import EditImg from "../view/EditImgPage";

const base_url = "https://server.rizkyhidayat.dev";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login base_url={base_url} />,
    loader: () => {
      if (localStorage.access_token) {
        Toastify({
          text: "Already login",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#FF0000",
          },
          onClick: function () {}, // Callback after click
        }).showToast();
        return redirect("/");
      }

      return null;
    },
  },
  {
    element: <LayoutPage />,
    loader: () => {
      if (!localStorage.access_token) {
        Toastify({
          text: "Please login first",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#FF0000",
          },
          onClick: function () {}, // Callback after click
        }).showToast();
        return redirect("/login");
      }

      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage base_url={base_url} />,
      },
      {
        path: "/add",
        element: <AddProducts base_url={base_url} />,
      },
      {
        path: "/categories",
        element: <CategoryPage base_url={base_url} />,
      },
      {
        path: "/add-user",
        element: <AddUser base_url={base_url} />,
      },
      {
        path: "/edit/:id",
        element: <EditProduts base_url={base_url} />,
      },
      {
        path: "/edit/img/:id",
        element: <EditImg base_url={base_url} />,
      }
    ],
  },
]);

export default router;
