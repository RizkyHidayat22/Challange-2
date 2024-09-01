import { useNavigate } from "react-router-dom";

export default function Card({ product }) {
  const navigate = useNavigate();
  const handledetail = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <>
      <>
        <div className="card bg-base-100 w-96 shadow-xl m-9 hover:shadow-2xl hover:scale-100 transform scale-75 duration-300">
          <figure>
            <img src={product.imgUrl} alt="product image" />
          </figure>
          <div className="card-body">
            <h2 className="card-title flex items-center justify-between">
              {product.name}
              <div className="badge badge-secondary">new</div>
            </h2>
            <p>{product.description}</p>
            <div className="card-actions flex justify-between items-center mt-4">
              <div className="badge badge-outline">Rp.{product.price}</div>
              <button className="btn btn-primary py-2 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300">BUY</button>
              <button onClick={() => handledetail(product.id)} className="btn btn-secondary py-2 px-4 rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-300">
                Detail
              </button>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
