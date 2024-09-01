import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function DetaiProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState("");

  async function TogetProduct() {
    try {
      let { data } = await axios.get(`https://server.rizkyhidayat.dev/pub/products/${id}`);

      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  //    console.log(product);
  useEffect(() => {
    TogetProduct(id);
  }, []);
  return (
    <>
      <div className="card card-compact bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={product.imgUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p>{product.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">{product.price}</button>
          </div>
        </div>
      </div>
    </>
  );
}
