import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Categories = (props) => {

  let [categories, setCategories] = useState([]);
  
  useEffect(() => {
    (async function () {
      let { data } = await axios.get("http://localhost:3000/api/v1/categories");
      if (props.from == "home") {
        setCategories(data.data.slice(0, 3));
      } else {
        setCategories(data.data);
      }
    })();
  
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-[#af7152] m-7 text-3xl font-bold text-center">
        {props.from ? props.t("some categories") : props.t("categories")}
      </h1>
      <div className="flex gap-4 flex-wrap justify-center">
        {categories.length != 0 ?
          categories.map((category) => (
            <div
              key={category._id}
              className="max-w-sm bg-white col-3 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <Link
                to={`/blogs/category/${category._id}`}
                className="link relative"
              >
                <img
                  className="rounded-t-lg h-[255px] transition-opacity duration-300 hover:opacity-50"
                  src={category.image}
                  alt=""
                />
                <FaRegEye className="eye hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl" />
              </Link>
              <div className="p-5">
                <Link to="#">
                  <h5
                    className={`mb-2 text-2xl font-bold tracking-tight text-[${category.color}]`}
                    style={{ color: category.color }}
                  >
                    {props.lang == "en" ? category.name_en : category.name_ar}
                  </h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {props.lang == "en"
                    ? category.description_en
                    : category.description_ar}
                </p>
              </div>
            </div>
          )) : [1, 2, 3].map((ele, i) => {
            return (
              <div className="max-w-sm col-3" key={i}>
                <Skeleton className="w-[200px] md:w-[382px]" height={255}/>
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
  );
};

export default Categories;
