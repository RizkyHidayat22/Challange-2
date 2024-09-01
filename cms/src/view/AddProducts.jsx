import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";
import AddProduct from "../components/AddProduct";

export default function AddProducts({ base_url }) {
  const navigate = useNavigate();
  async function handelAdd(e, name, description, price, imgUrl, stock, categoryId) {
    e.preventDefault();
    try {
      let body = { name, description, price: +price, imgUrl, stock: +stock, categoryId: +categoryId };
      const { data } = await axios.post(`${base_url}/products`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      navigate("/");
      Toastify({
        text: `Succedd add new product`,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#008000",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    } catch (error) {
      Toastify({
        text: error.response.data.message,
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
    }
  }

  return (
    <>
      <AddProduct base_url={base_url} handleSubmit={handelAdd}  />
    </>
  );
}
