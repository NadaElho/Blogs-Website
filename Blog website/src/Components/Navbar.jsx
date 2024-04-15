import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoMoon, IoSunny } from "react-icons/io5";
import { MdLanguage, MdAdd } from "react-icons/md";
import { ImBlogger } from "react-icons/im";

const Navbar = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchBy, setSearchBy] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    setSearchBy(e.target.value);
    console.log(searchBy);
    navigate(`/blogs/${searchBy}`);
  };

  const clickHandler = ()=>{
    if(localStorage.getItem('token')){
      localStorage.clear()
      navigate('/')
    }else{
      navigate('/login')
    }
  }
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0 z-10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse rtl:text-left"
        >
          <ImBlogger style={{ color: "#af7152" }} />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Blogs
          </span>
        </Link>
        <div className="flex md:order-2">
          <div className="relative block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="hidden md:block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#af7152] focus:border-[#af7152] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#af7152] dark:focus:border-[#af7152]"
              placeholder={props.t("search")}
              onChange={handleSearch}
              value={searchBy}
            />
          </div>
          <Link
            to="/blogs/blog"
            className="ms-2 flex items-center"
            title={props.t("add")}
          >
            <MdAdd
              size="1.5em"
              style={{ color: props.dark == "dark" ? "white" : "gray" }}
            />
          </Link>
          <button onClick={props.darkModeHandler} className="mx-2">
            {props.dark == "dark" && (
              <IoSunny style={{ color: "white" }} size="1.25em" />
            )}
            {props.dark != "dark" && (
              <IoMoon style={{ color: "gray" }} size="1.25em" />
            )}
          </button>
          <button onClick={props.languageHandler}>
            <MdLanguage
              style={{ color: props.dark == "dark" ? "white" : "gray" }}
              size="1.25em"
            />
          </button>
          <button onClick={clickHandler} className="text-[#af7152] mx-2 hidden md:block hover:text-white border border-[#af7152] hover:bg-[#af7152] focus:ring-4 focus:outline-none focus:ring-[#af7152] font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:border-[#af7152] dark:text-[#af7152] dark:hover:text-white dark:hover:bg-[#af7152] dark:focus:ring-yellow-900">
            {localStorage.getItem("token")
              ? props.t("logout")
              : props.t("login")}
          </button>
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex ml-2 items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-search"
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            isMenuOpen ? "flex" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-search"
        >
          <ul className="flex flex-col md:items-center  text-lg p-4 md:p-0 mt-4 w-screen md:w-fit font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li><input
              type="text"
              id="search-navbar"
              className="block md:hidden w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#af7152] focus:border-[#af7152] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#af7152] dark:focus:border-[#af7152]"
              placeholder={props.t("search")}
              onChange={handleSearch}
              value={searchBy}
            /></li>
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  color: isActive
                    ? "#af7152"
                    : props.dark == "dark"
                    ? "white"
                    : "black",
                })}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#af7152] md:p-0 dark:text-white md:dark:hover:text-[#af7152] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
              >
                {props.t("home")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blogs"
                style={({ isActive }) => ({
                  color: isActive
                    ? "#af7152"
                    : props.dark == "dark"
                    ? "white"
                    : "black",
                })}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#af7152] md:p-0 dark:text-white md:dark:hover:text-[#af7152] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
              >
                {props.t("blogs")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                style={({ isActive }) => ({
                  color: isActive
                    ? "#af7152"
                    : props.dark == "dark"
                    ? "white"
                    : "black",
                })}
                className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#af7152] md:p-0 md:dark:hover:text-[#af7152] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${({
                  isActive,
                }) => (isActive ? "text-[#af7152]" : "text-gray-900")}`}
              >
                {props.t("categories")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                style={({ isActive }) => ({
                  color: isActive
                    ? "#af7152"
                    : props.dark == "dark"
                    ? "white"
                    : "black",
                })}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#af7152] md:p-0 dark:text-white md:dark:hover:text-[#af7152] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                {props.t("contact")}
              </NavLink>
            </li>
            <li>
              {/* <NavLink
                to="/about"
                style={({ isActive }) => ({
                  color: isActive
                    ? "#af7152"
                    : props.dark == "dark"
                    ? "white"
                    : "black",
                })}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#af7152] md:p-0 dark:text-white md:dark:hover:text-[#af7152] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                {props.t("about")}
              </NavLink> */}
              <button onClick={clickHandler} className="text-[#af7152] block md:hidden my-2 mx-3 hover:text-white border border-[#af7152] hover:bg-[#af7152] focus:ring-4 focus:outline-none focus:ring-[#af7152] font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:border-[#af7152] dark:text-[#af7152] dark:hover:text-white dark:hover:bg-[#af7152] dark:focus:ring-yellow-900">
                {localStorage.getItem("token")
                  ? props.t("logout")
                  : props.t("login")}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
