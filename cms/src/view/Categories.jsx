import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function CategoryPage({ base_url }) {
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
  
  return (
    <>
      <div class="p-4">
        <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr class="bg-gray-100 border-b border-gray-200">
              <th class="py-2 px-4 text-left text-gray-600 font-semibold">Category</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((el) => (
              <tr key={el.id} class="hover:bg-gray-50 border-b border-gray-200">
                <td class="py-2 px-4 text-gray-700">{el.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
