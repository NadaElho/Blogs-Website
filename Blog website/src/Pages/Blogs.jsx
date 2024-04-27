import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axiosInstance from "../interceptor";
import Confirm from "./Confirm";
import Pagination from "./Pagination";
import BlogCard from "./BlogCard";

const Blogs = (props) => {
  const [blogs, setBlogs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [del, setDelete] = useState(false);
  const [toShowItems, setToShowItems] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [id, setId] = useState("");
  const { cat_id, title, user_id } = useParams();
  const userId = localStorage.getItem("id");
  const [show, setShow] = useState(false);
  const [idToDel, setIdToDel] = useState(null);
  const toggleMenu = (id) => {
    setId(id);
    setIsOpen(!isOpen);
  };

  const deleteHandler = (id) => {
    setShow(true);
    setIdToDel(id);
    setIsOpen(false);
  };

  useEffect(() => {
    (async function () {
      let url = cat_id
        ? `https://blogs-node-ta7t.onrender.com/api/v1/blogs/category/${cat_id}` // Category blogs
        : user_id
        ? `https://blogs-node-ta7t.onrender.com/api/v1/blogs/user/${user_id}` // User blogs
        : "https://blogs-node-ta7t.onrender.com/api/v1/blogs"; // All blogs
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

  //Serach by blog title
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

  //Delete Blog
  const deleteBlog = async (id) => {
    await axiosInstance.delete(`/blogs/${id}`);
    toast("Blog deleted successfully");
    setDelete(!del);
  };

  //Pagination
  let [pageNumbers, setPageNumbers] = useState([]);
  const paginationHandler = (toShowItems, curPage = 1) => {
    setCurPage(curPage);
    toShowItems = searchResult.length > 0 ? searchResult : toShowItems;
    let noOfItemsInPage = 2;
    let noOfItems = toShowItems.length;
    let noOfPages = Math.ceil(noOfItems / noOfItemsInPage);
    setPageNumbers([...Array(noOfPages).keys()].map((i) => i + 1));
    const indexOfLastItem = curPage * noOfItemsInPage;
    const indexOfFirstItem = indexOfLastItem - noOfItemsInPage;
    setToShowItems(toShowItems.slice(indexOfFirstItem, indexOfLastItem));
  };

  return (
    <div className="relative">
      <Confirm
        show={show}
        setShow={setShow}
        deleteBlog={deleteBlog}
        idToDel={idToDel}
        t={props.t}
      />
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-[#af7152] m-7 text-3xl font-bold">
          {props.t("blogs")}
        </h1>
        <div className="flex gap-4 flex-wrap justify-center">
          {toShowItems.length != 0
            ? toShowItems.map((blog) => (
                <BlogCard
                  blog={blog}
                  userId={userId}
                  t={props.t}
                  id={id}
                  key={blog.id}
                  setIdToDel={setIdToDel}
                  deleteHandler={deleteHandler}
                  toggleMenu={toggleMenu}
                  isOpen = {isOpen}
                />
              ))
            : [1, 2].map((ele, i) => {
                return (
                  <div className="max-w-sm col-3" key={i}>
                    <Skeleton className="w-[200px] md:w-[382px]" height={255} />
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

      {toShowItems.length != 0 && (
        <Pagination
          pageNumbers={pageNumbers}
          paginationHandler={paginationHandler}
          curPage={curPage}
          blogs={blogs}
        />
      )}
    </div>
  );
};

export default Blogs;
