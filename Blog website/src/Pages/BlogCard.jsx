import React from "react";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";

const BlogCard = (props) => {
  let { blog, toggleMenu, userId, id, deleteHandler, isOpen } = props;
  return (
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
                  onClick={()=>deleteHandler(blog._id)}
                  className="block px-4 py-2 cursor-pointer text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {props.t("delete")}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="p-5">
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
        <div className="flex justify-between items-center">
          <p
            className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[${blog.category.color}] rounded-lg `}
            style={{ backgroundColor: blog.category.color }}
          >
            {props.lang == "en" ? blog.category.name_en : blog.category.name_ar}
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
  );
};

export default BlogCard;
