import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Blogs = (props) => {
  const [blogs, setBlogs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [del, setDelete] = useState(false);
  const [toShowItems, setToShowItems] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [id, setId] = useState("");
  const { cat_id, title } = useParams();
  const userId = localStorage.getItem("id");

  const toggleMenu = (id) => {
    setId(id);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    (async function () {
      let url = cat_id
        ? `http://localhost:3000/api/v1/blogs/category/${cat_id}`
        : "http://localhost:3000/api/v1/blogs";
      try {
        const { data } = await axios.get(url);
        setBlogs(data);
        handleSearch(data);
        paginationHandler(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [del]);

  useEffect(() => {
    handleSearch(blogs);
  }, [title]);

  const handleSearch = (blogs) => {
    console.log(blogs);
    if (blogs.length > 0 && title) {
      let searchResult = blogs.filter((blog) => {
        return blog.title.toLowerCase().includes(title.toLowerCase());
      });
      setToShowItems([...searchResult]);
      setSearchResult([...searchResult]);
      paginationHandler(searchResult);
    }
  };

  const deleteBlog = async (id) => {
    await axios.delete(`http://localhost:3000/api/v1/blogs/${id}`, {
      headers: {
        jwt: localStorage.getItem("token"),
      },
    });
    toast("Blog deleted successfully");
    setDelete(!del);
  };

  let [pageNumbers, setPageNumbers] = useState([]);
  const paginationHandler = (toShowItems, curPage = 1) => {
    setCurPage(curPage);
    toShowItems = searchResult.length > 0 ? searchResult : toShowItems;
    let noOfItemsInPage = 2;
    let noOfItems = toShowItems.length;
    let noOfPages = Math.ceil(noOfItems / noOfItemsInPage);
    setPageNumbers([...Array(noOfPages).keys()].map((i) => i + 1)); //[...Array(5)] [undefined, undefined, undefined, undefined, undefined]
    const indexOfLastItem = curPage * noOfItemsInPage;
    const indexOfFirstItem = indexOfLastItem - noOfItemsInPage;
    setToShowItems(toShowItems.slice(indexOfFirstItem, indexOfLastItem));
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-[#af7152] m-5 text-3xl font-bold">
          {props.t("blogs")}
        </h1>
        <div className="flex gap-2 flex-wrap justify-center">
          {toShowItems &&
            toShowItems.map((blog) => (
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
                      {props.lang == "en"
                        ? blog.category.name_en
                        : blog.category.name_ar}
                    </p>
                    <span className="text-gray-700 dark:text-gray-400">
                      {blog.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {toShowItems && (
        <nav aria-label="Page navigation example">
          <ul className="flex items-center justify-center -space-x-px h-8 text-sm">
            <li>
              <button
                disabled={curPage == 1}
                onClick={() => paginationHandler(blogs, curPage - 1)}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </button>
            </li>
            {pageNumbers.map((num) => {
              return (
                <li key={num}>
                  <span
                    onClick={() => paginationHandler(blogs, num)}
                    className={`flex items-center justify-center px-3 h-8 leading-tight text-[#af7152] bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                      curPage == num
                        ? " text-[#af7152] border border-[#cc957c] bg-[#dbad98]  dark:border-gray-700  dark:bg-gray-900 dark:text-white"
                        : ""
                    }`}
                  >
                    {num}
                  </span>
                </li>
              );
            })}
            <li>
              <button
                disabled={curPage == pageNumbers.length}
                onClick={() => paginationHandler(blogs, curPage + 1)}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Blogs;
