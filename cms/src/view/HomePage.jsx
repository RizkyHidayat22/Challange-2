import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage({ base_url }) {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  async function getProduct() {
    try {
      let { data } = await axios.get(`${base_url}/products?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setProduct(data.data);
      setPage(+data.totalPage);
      setCurrentPage(+data.page);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(e, id) {
    e.preventDefault();
    try {
      await axios.delete(`${base_url}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      getProduct();
    } catch (error) {
      console.log(error);
    }
  }

  const makePlus = () => {
    if (currentPage >= page) {
      setCurrentPage(currentPage + 0);
      console.log("ok");
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const makeMinus = () => {
    if (currentPage === 1) {
      setCurrentPage(currentPage + 0);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    getProduct();
  }, [currentPage]);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Name Product</th>
              <th>Image</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {product.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>
                  <img className="w-12" src={product.imgUrl} alt="" />
                </td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <button onClick={() => navigate(`/edit/${product.id}`)} className="btn btn-sm m-1 bg-yellow-200">
                    Edit
                  </button>
                  <button onClick={()=> navigate(`edit/img/${product.id}`)} className="btn btn-sm m-1 bg-yellow-400">Edit Image</button>
                  <button onClick={(e) => handleDelete(e, product.id)} className="btn btn-sm m-1  bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="join grid grid-cols-2 pt-3">
        <button
          onClick={() => {
            makeMinus();
          }}
          className="join-item btn btn-outline"
        >
          Previous page
        </button>
        <button
          onClick={() => {
            makePlus();
          }}
          className="join-item btn btn-outline"
        >
          Next
        </button>
      </div>
    </>
  );
}
