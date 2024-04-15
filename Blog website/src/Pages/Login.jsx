import { Formik } from "formik";
import axios from "axios";
import { useState } from "react";
import img from "../assets/Computer login-pana.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = (props) => {
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-center md:justify-evenly items-center min-h-[calc(100vh-70px)]">
      <img src={img} className="w-[420px] hidden md:block" alt="" />

      <div className="flex flex-col w-full md:w-1/2">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto mt-5">
          <div className="absolute inset-0 bg-gradient-to-r from-[#d7b8a9] to-[#af7152] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

          <div className="relative sm:p-20 px-3 py-8 bg-white dark:bg-gray-800 shadow-lg sm:rounded-3xl ">
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = props.t("required");
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = props.t("invalid email");
                }
                if (!values.password) {
                  errors.password = props.t("required");
                }
                return errors;
              }}
              onSubmit={async ({ password, email }, { setSubmitting }) => {
                localStorage.setItem("email", email);
                try {
                  let res = await axios.post(
                    "http://localhost:3000/api/v1/users/login",
                    {
                      password,
                      email,
                    }
                  );
                  console.log(res);
                  localStorage.setItem("token", res.data.token);
                  localStorage.setItem("id", res.data.id);
                  setErrMsg(res.data.message);
                  toast.success(props.t("logged"));
                  navigate("/");
                } catch (err) {
                  console.log(err);
                  toast.error(props.t("invalid"));
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
                <form onSubmit={handleSubmit} className="flex flex-col">
                  <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white rtl:text-right"
                    >
                      {props.t("email")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder={props.t("email")}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#af7152] focus:border-[#af7152] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#af7152] dark:focus:border-[#af7152] dark:shadow-sm-light"
                    />
                    <div className="text-red-500">
                      {touched.email && errors.email}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white rtl:text-right"
                    >
                      {props.t("password")}
                    </label>
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder={props.t("password")}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#af7152] focus:border-[#af7152] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#af7152] dark:focus:border-[#af7152] dark:shadow-sm-light"
                    />
                    <div className="text-red-500">
                      {errors.password && touched.password && errors.password}
                    </div>
                  </div>
                  <div>{errMsg}</div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-[#af7152] mt-5 hover:text-white border border-[#af7152] hover:bg-[#af7152] focus:ring-4 focus:outline-none focus:ring-[#af7152] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-[#af7152] dark:text-[#af7152] dark:hover:text-white dark:hover:bg-[#af7152] dark:focus:ring-yellow-900"
                  >
                    {props.t("login")}
                  </button>
                  <div className="text-lg mt-5 dark:text-white">
                    {props.t("noAccount")}&nbsp;
                    <span
                      className="cursor-pointer text-[#af7152]"
                      onClick={() => navigate("/register", { replace: true })}
                    >
                      {props.t("createAccount")}
                    </span>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
