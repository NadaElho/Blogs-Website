import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import Categories from "./Categories";
import Footer from "../Components/Footer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");
  const userId = localStorage.getItem("id");

  //Toggle burger menu
  const toggleMenu = (id) => {
    setId(id);
    setIsOpen(!isOpen);
  };

  const [userData, setUserData] = useState({
    name: "",
    password: "",
    email: "",
    image: "",
  });

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    let userEmail = localStorage.getItem("email");

    //Get user data
    userEmail &&
      (async function () {
        let { data } = await axios.get(
          `https://blogs-node-ta7t.onrender.com/api/v1/users/${userEmail}`
        );
        console.log(data);
        setUserData(data);
      })();

    //Most popular blogs
    (async function () {
      let { data } = await axios.get(
        "https://blogs-node-ta7t.onrender.com/api/v1/blogs"
      );
      let mostPopular = data.sort((a, b) => b.views - a.views);
      setBlogs(mostPopular.slice(0, 3));
    })();
  }, []);

  return (
    <div>
      <div className="mx-auto">
        <div className="flex flex-col items-center justify-center p-7">
          <h1 className="text-[#af7152] m-7 text-3xl font-bold text-center">
            {props.t("popular")}
          </h1>
          <div className="flex gap-4 flex-wrap justify-center">
            {blogs.length != 0
              ? blogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="max-w-sm bg-white col-3 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  >
                    <div className="link relative">
                      <Link to={`/blog/${blog._id}`}>
                        <img
                          className="rounded-t-lg h-[255px] transition-opacity duration-300 hover:opacity-50"
                          src={blog.image}
                          alt=""
                        />
                      </Link>
                      <FaRegEye className="eye hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl" />
                      <div
                        className={`flex justify-end flex-col px-4 pt-4 absolute top-0  ${
                          props.lang == "ar" ? "right-0" : "left-0"
                        } ${blog.userId._id == userId ? "flex" : "hidden"}`}
                      >
                        <button
                          id="dropdownButton"
                          data-dropdown-toggle="dropdown"
                          className="inline-block justify-end z-9 text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5 w-[32px]"
                          type="button"
                          onClick={() => toggleMenu(blog._id)}
                        >
                          <span className="sr-only">Open dropdown</span>
                          <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 3"
                          >
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                          </svg>
                        </button>
                        {/* Dropdown menu */}
                        <div
                          id="dropdown"
                          className={`z-9 ${
                            id == blog._id && isOpen ? "block" : "hidden"
                          } text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                        >
                          <ul className="py-2" aria-labelledby="dropdownButton">
                            <li>
                              <Link
                                to={`/blogs/blog/${blog._id}`}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                              >
                                {props.t("edit")}
                              </Link>
                            </li>
                            <li>
                              <span
                                onClick={() => deleteBlog(blog._id)}
                                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                {props.t("delete")}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className=" min-h-[220px]">
                        <span>
                          <h5
                            className={`mb-2 text-2xl font-bold text-left tracking-tight text-gray-900 dark:text-white`}
                          >
                            {blog.title}
                          </h5>
                        </span>
                        <p className="mb-3 font-normal text-gray-700 text-left dark:text-gray-400 min-h-[100px]">
                          {blog.description}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p
                          className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[${blog.category.color}] rounded-lg `}
                          style={{ backgroundColor: blog.category.color }}
                        >
                          {props.lang == "en"
                            ? blog.category.name_en
                            : blog.category.name_ar}
                        </p>
                        <div>
                          <span className="text-gray-700 dark:text-gray-400">
                            {blog.date}
                          </span>
                          <div className="text-gray-700 dark:text-gray-400 flex justify-start items-center gap-2">
                            <FaRegEye />{" "}
                            <span title="number of views">
                              {blog.views} {props.t("views")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : [1, 2].map((ele, i) => {
                  return (
                    <div className="max-w-sm col-3" key={i}>
                      <Skeleton
                        className="w-[200px] md:w-[382px]"
                        height={255}
                      />
                      <div className="p-5">
                        <div className="my-4">
                          <Skeleton />
                        </div>
                        <Skeleton />
                        <Skeleton />
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
        <Categories t={props.t} lang={props.lang} from="home" />
      </div>
      <Footer t={props.t} lang={props.lang} from="home" />
    </div>
  );
};

export default Home;
