import { useEffect, useState } from "react";
import axios from "axios";
import ButtonHome from "./ButtonHome";

export default function AddProduct({ base_url, product, handleSubmit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  async function handelCategory() {
    try {
      const { data } = await axios.get(`${base_url}/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handelCategory();
  }, []);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
      setImgUrl(product.imgUrl);
      setCategoryId(product.categoryId);
    }
  }, [product]);
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, name, description, price, imgUrl, stock, categoryId)} method="POST">
        <div className=" grid grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="text-base label-text">Name</span>
            </label>
            <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" className="w-full input input-bordered input-accent" value={name} />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Description</span>
            </label>
            <input onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Enter Description" className="w-full input input-bordered input-accent" value={description} />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Price</span>
            </label>
            <input onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Enter Price" className="w-full input input-bordered input-accent" value={price} />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Stock</span>
            </label>
            <input onChange={(e) => setStock(e.target.value)} type="number" placeholder="Enter Stock" className="w-full input input-bordered input-accent" value={stock} />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Image (URL)</span>
            </label>
            <input onChange={(e) => setImgUrl(e.target.value)} type="text" placeholder="Image URL" className="w-full input input-bordered input-accent" value={imgUrl} />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Category</span>
            </label>
            <select onChange={(e) => setCategoryId(e.target.value)} className="w-full input input-bordered input-accent" name="category" id="" value={categoryId}>
              <option disabled value="">
                Category
              </option>
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button className="btn btn-accent w-full">Add New Product</button>
        </div>
   
      </form>
     
    </>
  );
}
