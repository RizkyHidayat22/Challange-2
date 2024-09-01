import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Toastify from "toastify-js";

export default function AddUser({ base_url }) {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  async function handleUser(
    e,
    username,
    email,
    password,
    role,
    phoneNumber,
    address
  ) {
    e.preventDefault();
    try {
      const body = { username, email, password, role, phoneNumber, address };
      const { data } = await axios.post(`${base_url}/add-user`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      navigate("/");
      Toastify({
        text: `Succedd add new Staff`,
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
      <div className="form-container mx-auto pt-6">
        <form
          className="form space-y-4"
          onSubmit={(e) =>
            handleUser(e, username, email, password, role, phoneNumber, address)
          }
          method="POST"
        >
          <div className="form-group flex items-center space-x-2">
            <label htmlFor="username" className="w-1/4 pl-11">
              Nama Pengguna :
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="input username"
              className="w-3/4 input border-2 border-gray-300 rounded-md ml-2"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="form-group flex items-center space-x-2">
            <label htmlFor="email" className="w-1/4 pl-11">
              Email :
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="input email"
              className="w-3/4 input border-2 border-gray-300 rounded-md ml-2"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group flex items-center space-x-2">
            <label htmlFor="password" className="w-1/4 pl-11">
              Kata Sandi :
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="input password"
              className="w-3/4 input border-2 border-gray-300 rounded-md ml-2"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group flex items-center space-x-2">
            <label htmlFor="password" className="w-1/4 pl-11">
              role :
            </label>
            <input
              id="role"
              name="role"
              type="role"
              placeholder="input role"
              className="w-3/4 input border-2 border-gray-300 rounded-md ml-2"
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="form-group flex items-center space-x-2">
            <label htmlFor="phoneNumber" className="w-1/4 pl-11">
              Nomor Telepon :
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="input  Phone Number"
              className="w-3/4 input border-2 border-gray-300 rounded-md ml-2"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="form-group flex items-center space-x-2">
            <label htmlFor="address" className="w-1/4 pl-11">
              Alamat :
            </label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="input adress"
              className="w-3/4 input border-2 border-gray-300 rounded-md ml-2"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-group flex justify-center">
            <button
              type="submit"
              className="submit-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
