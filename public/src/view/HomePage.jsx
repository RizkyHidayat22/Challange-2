import Card from "../components/Card";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Homepage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState();
  const [sort, setSort] = useState("");

  async function getProduct() {
    try {
      setLoading(true);
      const data = await axios.get(`https://server.rizkyhidayat.dev/pub/products/?page=${currentPage}&search=${search}&${filter ? `filter[category]=${filter} ` : ``}&sort=${sort}`);

      setProducts(data.data.data);
      setPage(+data.data.totalPage);
      setCurrentPage(+data.data.page);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const makePlus = () => {
    if (currentPage >= page) {
      setCurrentPage(currentPage + 0);
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
  }, [currentPage, search, sort, filter]);

  return (
    <>
      <div className="join grid grid-cols-2 pt-7 mx-20">
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
      <div className="pt-6 ">
        <div className="grid grid-cols-3 gap-4 pt-7 mx-20">
          <select
            onChange={(e) => {
              setSort(e.target.value);
            }}
            name="sort"
            id="sort"
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled selected>
              SORT
            </option>
            <option value="ASC">New Collection</option>
            <option value="DESC">Older Collection </option>
          </select>
          <select
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            name="filter"
            id="filter"
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled selected>
              Category
            </option>
            <option value="1">Pria</option>
            <option value="2">Wanita</option>
            <option value="3">Anak-anak</option>
          </select>
          <form className="flex justify-center items-center w-full">
            <input
              type="search"
              name="search"
              placeholder="Search"
              className="input input-bordered input-accent w-full mx-1 input-sm"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </form>
        </div>
      </div>
      <div className="flex flex-wrap  justify-around">{loading ? "Loading..." : products.map((product) => <Card key={product.name} product={product} />)}</div>
    </>
  );
}
