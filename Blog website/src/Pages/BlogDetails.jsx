import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Footer from "../Components/Footer";

const BlogDetails = (props) => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  useEffect(() => {
    (async () => {
      await axios.patch(`http://localhost:3000/api/v1/blogs/views/${id}`);
    })();

    (async () => {
      let { data } = await axios.get(
        `http://localhost:3000/api/v1/blogs/${id}`
      );
      setBlog(data);
    })();
  }, [id]);
  return (
    <div>
      {blog._id ? (
        <div>
          <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
            <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
              <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                <header className="mb-4 lg:mb-6 not-format">
                  <address className="flex items-center mb-6 not-italic">
                    <div className="flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                      <img
                        className="mr-4 w-16 h-16 rounded-full"
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                        alt=""
                      />
                      <div>
                        <Link
                          to={`/blogs/user/${blog.userId._id}`}
                          rel="author"
                          className="text-xl font-bold text-gray-900 dark:text-white capitalize"
                        >
                          {blog.userId._id == localStorage.getItem("id")
                            ? props.t("you")
                            : blog.userId.name}
                        </Link>
                        <p className="flex items-center gap-2 text-base text-gray-500 dark:text-gray-400">
                          <FaRegEye />
                          <span>
                            {blog.views} {props.t("views")}
                          </span>
                        </p>
                        <p className="text-base text-gray-500 dark:text-gray-400">
                          <time
                            title="date"
                          >
                            {blog.date}
                          </time>
                        </p>
                      </div>
                    </div>
                  </address>
                  <h1 className="mb-4 text-3xl font-extrabold leading-tight text-[#af7152] lg:mb-6 lg:text-4xl">
                    {blog.title}
                  </h1>
                </header>
                <p className="lead my-3 dark:text-white">{blog.description}</p>

                <div>
                  <img src={blog.image} alt="" />
                </div>
                <p className="my-3 dark:text-white">{blog.content}</p>
              </article>
            </div>
          </main>
        </div>
      ) : (
        <div>
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 antialiased">
          <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
            <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
              <header className="mb-4 lg:mb-6 not-format">
                <address className="flex items-center mb-6 not-italic">
                  <div className="flex items-center mr-3 gap-3">
                  <Skeleton width={63} height={63} circle={true}/>
                    <div>
                    <Skeleton count={3} width={130} height={10}/>
                    </div>
                  </div>
                </address>
                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-[#af7152] lg:mb-6 lg:text-4xl">
                <Skeleton/>
                </h1>
              </header>

              <Skeleton className="my-3" count={3}/>

              <div>
              <Skeleton height={400} width="100%"/>
              </div>
              <p className="my-3">
              <Skeleton count={7}/>
              </p>
            </article>
          </div>
        </main>
      </div>
      )}
      <Footer/>
    </div>
  );
};

export default BlogDetails;
