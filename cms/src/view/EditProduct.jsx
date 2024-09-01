import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AddProduct from "../components/AddProduct";

export default function EditProduts({ base_url }) {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const { id } = useParams();

  async function fetchEdit() {
    try {
      let { data } = await axios.get(`${base_url}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchEdit();
  }, []);

  async function handelEdit(e, name, description, price, imgUrl, stock, categoryId) {
    e.preventDefault();
    try {
        let body = { name, description, price: +price, imgUrl, stock: +stock, categoryId: +categoryId };
        const { data } = await axios.put(`${base_url}/products/${id}`, body, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });

        navigate("/")
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <>
      <AddProduct base_url={base_url} product={product} handleSubmit={handelEdit} />
    </>
  );
}
