import { Formik } from "formik";
import img from '../assets/Blogging-amico.svg'
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
const AddBlog = (props) => {
  const [cats, setCats] = useState([]);
  const [image, setImage] = useState({ preview: "", data: "" });
  const navigate = useNavigate()
  useEffect(() => {
    (async () => {
      let { data } = await axios.get("http://localhost:3000/api/v1/categories");
      setCats(data.data);
    })();
  }, []);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
 
  return (
   <div className="flex flex-row justify-evenly items-center h-[calc(100vh-70px)]">
    <img src={img} className="w-1/4" alt="" />
     <div className="flex flex-col w-1/2">
      <Formik
        initialValues={{
          title: "",
          description: "",
          content: "",
          category: "",
        }}
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
            formData.append("category", category);
            formData.append("image", image);
            // formData.append("image", image.data);
            formData.append("userId", localStorage.getItem("id"))
            try{
              const response = await axios.post(
                "http://localhost:3000/api/v1/blogs",
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    jwt: localStorage.getItem("token"),
                    "Access-Control-Allow-Origin": "*"
                  },
                }
              );
              navigate("/blogs");
              toast.success("Blog added successfully");
            }catch(err){
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
          <form className="max-w-sm mx-auto w-full" onSubmit={handleSubmit}>
            <div className="mb-3 w-100">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white rtl:text-right"
              >
                {props.t("title")}
              </label>
              <input
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                id="title"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#af7152] focus:border-[#af7152] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#af7152] dark:focus:border-[#af7152] dark:shadow-sm-light"
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
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#af7152] focus:border-[#af7152] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#af7152] dark:focus:border-[#af7152] dark:shadow-sm-light"
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
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#af7152] focus:border-[#af7152] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#af7152] dark:focus:border-[#af7152] dark:shadow-sm-light"
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
                value={values.category}
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#af7152] focus:border-[#af7152] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#af7152] dark:focus:border-[#af7152]"
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
                onChange={(e)=>handleFileChange(e)}
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
              className="text-[#af7152] hover:text-white border border-[#af7152] hover:bg-[#af7152] focus:ring-4 focus:outline-none focus:ring-[#af7152] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-[#af7152] dark:text-[#af7152] dark:hover:text-white dark:hover:bg-[#af7152] dark:focus:ring-yellow-900"
            >
              {props.t("submit")}
            </button>
          </form>
        )}
      </Formik>
    </div>
   </div>
  );
};

export default AddBlog;
