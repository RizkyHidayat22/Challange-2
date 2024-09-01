import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <>
      <div className="navbar bg-slate-200  w-full z-50 shadow-md ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"></ul>
          </div>
          <img className="w-10" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UNIQLO_logo.svg/772px-UNIQLO_logo.svg.png" alt="" />
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal px-1 gap-5">
            <li>
              <Link to="/" className="text-2xl font-bold px-6">
                <span className="text-accent">Home</span>
              </Link>
            </li>
            <li>
              <Link to="/add" className="text-2xl font-bold px-6">
                <span className="text-accent">Add Product</span>
              </Link>
            </li>
            <li>
              <Link to="/add-user" className="text-2xl font-bold px-6">
                <span className="text-accent">Add User</span>
              </Link>
            </li>
            <li>
              <Link to="/categories" className="text-2xl font-bold px-6">
                <span className="text-accent">Category</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end ">
          <a onClick={handleLogout} className="btn bg-red-500">
            Logout
          </a>
        </div>
      </div>
    </>
  );
}
