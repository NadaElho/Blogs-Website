import { Formik } from "formik";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import img from "../assets/Blogging-amico.svg";
import axios from "axios";
import axiosInstance from "../interceptor";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const EditBlog = (props) => {
  const [cats, setCats] = useState([]);
  const [image, setImage] = useState({});
  const navigate = useNavigate();
  const [blogData, setaBlogData] = useState({
    title: "",
    content: "",
    description: "",
    image: image,
    category: "",
  });
  const { id } = useParams();

  useEffect(() => {
    //Select Box Options
    (async () => {
      let { data } = await axios.get(
        "https://blogs-node-ta7t.onrender.com/api/v1/categories"
      );
      setCats(data.data);
    })();

    (async () => {
      let { data } = await axios.get(
        `https://blogs-node-ta7t.onrender.com/api/v1/blogs/${id}`
      );
      console.log(data);
      if (data.title) {
        setaBlogData(data);
        setImage(data.image);
      }
    })();
    console.log(blogData);
  }, [id]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(file);
  };
  return (
    <div className="flex flex-row justify-center md:justify-evenly items-center min-h-[calc(100vh-70px)]">
      <img src={img} className="w-[400px] hidden md:block" alt="" />

      <div className="flex flex-col w-full md:w-1/2">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto mt-5">
          <div className="absolute inset-0 bg-gradient-to-r from-[#d7b8a9] to-[#af7152] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

          <div className="relative px-4 py-10 bg-white dark:bg-gray-800 shadow-lg sm:rounded-3xl sm:p-20">
            {blogData._id ? (
              <Formik
                initialValues={{ ...blogData }}
                enableReinitialize={true}
                validate={(values) => {
                  const errors = {};
                  if (!values.title) {
                    errors.title = props.t("required");
                  }
                  if (!values.description) {
                    errors.description = props.t("required");
                  }
                  if (!values.content) {
                    errors.content = props.t("required");
                  }
                  if (!values.category) {
                    errors.category = props.t("required");
                  }
                  return errors;
                }}
                onSubmit={async (
                  { description, title, content, category },
                  { setSubmitting }
                ) => {
                  const formData = new FormData();
                  formData.append("title", title);
                  formData.append("description", description);
                  formData.append("content", content);
                  formData.append(
                    "category",
                    category ? category : blogData.category._id
                  );
                  formData.append("image", image ? image : blogData.image);
                  formData.append("userId", localStorage.getItem("id"));
                  console.log(blogData);
                  try {
                    const response = await axiosInstance.patch(
                      `/blogs/${id}`,
                      formData
                    );
                    navigate("/blogs");
                    toast.success("Blog updated successfully");
                  } catch (err) {
                    console.log(err);
                    toast.error("There is a problem, try again later");
                  }
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form
                    className="max-w-sm mx-auto w-full"
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-3">
                      <label
                        htmlFor="title"
                        className="shadow-sm block mb-2 text-sm font-medium text-gray-900 dark:text-white rtl:text-right"
                      >
                        {props.t("title")}
                      </label>
                      <input
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                        id="title"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#af7152]  focus:border-[#af7152]  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#af7152]  dark:focus:border-[#af7152]  dark:shadow-sm-light"
                        placeholder={props.t("title")}
                        required
                      />
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {touched.title && errors.title}
                      </p>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white rtl:text-right"
                      >
                        {props.t("description")}
                      </label>
                      <input
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        id="description"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#af7152]  focus:border-[#af7152]  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#af7152]  dark:focus:border-[#af7152]  dark:shadow-sm-light"
                        placeholder={props.t("description")}
                        required
                      />
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {touched.description && errors.description}
                      </p>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="content"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white rtl:text-right"
                      >
                        {props.t("content")}
                      </label>
                      <textarea
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.content}
                        id="content"
                        rows="5"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#af7152]  focus:border-[#af7152]  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#af7152]  dark:focus:border-[#af7152]  dark:shadow-sm-light"
                        placeholder={props.t("content")}
                        required
                      ></textarea>
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {touched.content && errors.content}
                      </p>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white rtl:text-right"
                      >
                        {props.t("category")}
                      </label>
                      <select
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.category._id}
                        id="category"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#af7152]  focus:border-[#af7152]  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#af7152]  dark:focus:border-[#af7152] "
                      >
                        {cats.map((cat) => {
                          return (
                            <option key={cat._id} value={cat._id}>
                              {props.lang == "en" ? cat.name_en : cat.name_ar}
                            </option>
                          );
                        })}
                      </select>
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {touched.category && errors.category}
                      </p>
                    </div>
                    <div className="mb-3">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white rtl:text-right"
                        htmlFor="image"
                      >
                        {props.t("upload")}
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="image"
                        onChange={(e) => handleFileChange(e)}
                        // onBlur={handleBlur}
                        // value={values.image}
                        id="image"
                        type="file"
                      ></input>
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {touched.image && errors.image}
                      </p>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="text-[#af7152] mt-3 hover:text-white border border-[#af7152] hover:bg-[#af7152] focus:ring-4 focus:outline-none focus:ring-[#af7152] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-[#af7152] dark:text-[#af7152] dark:hover:text-white dark:hover:bg-[#af7152] dark:focus:ring-yellow-900"
                    >
                      {props.t("submit")}
                    </button>
                  </form>
                )}
              </Formik>
            ) : (
              // <h2>Loading blog data...</h2>
              <div className="max-w-sm mx-auto w-full h-screen">
                <Skeleton width="full lg:w-1/2" />
                <Skeleton className="mb-5" count={1} width={300} height={40} />
                <Skeleton width="full lg:w-1/2" />
                <Skeleton
                  className="mb-5"
                  count={1}
                  width="full lg:w-1/2"
                  height={40}
                />
                <Skeleton width="full lg:w-1/2" />
                <Skeleton
                  className="mb-5"
                  count={1}
                  width="full lg:w-1/2"
                  height={100}
                />
                <Skeleton width="full lg:w-1/2" />
                <Skeleton
                  className="mb-5"
                  count={1}
                  width="full lg:w-1/2"
                  height={40}
                />
                <Skeleton width="full lg:w-1/2" />
                <Skeleton
                  className="mb-5"
                  count={1}
                  width="full lg:w-1/2"
                  height={40}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
