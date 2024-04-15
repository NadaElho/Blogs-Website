import React from "react";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Contact = (props) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="container my-16 mx-auto md:px-6">
        <section className="mb-32">
          <div className="relative h-[300px] overflow-hidden bg-cover bg-[50%] bg-no-repeat bg-[url('https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"></div>
          <div className="container px-6 md:px-12">
            <div className="block rounded-lg bg-[hsla(0,0%,100%,0.7)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.7)] dark:shadow-black/20 md:py-16 md:px-12 -mt-[100px] backdrop-blur-[30px]">
              <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                {props.t("contact")}
              </h2>
              <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                {props.t("recommend")}
              </p>
              <div className="mx-auto max-w-[700px]">
                <Formik
                  initialValues={{
                    email: "",
                    message: "",
                    name: "",
                    image: null,
                  }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.firstname) {
                      errors.firstname = props.t("required");
                    }
                    if (!values.lastname) {
                      errors.lastname = props.t("required");
                    }
                    if (!values.email) {
                      errors.email = props.t("required");
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = props.t("invalid email");
                    }
                    if (!values.message) {
                      errors.message = props.t("required");
                    }
                    return errors;
                  }}
                  onSubmit={async (
                    { firstname, lastname, message, email },
                    { setSubmitting }
                  ) => {
                    localStorage.setItem("email", email);
                    let res = await axios.post(
                      "http://localhost:3000/api/v1/contact/",
                      {
                        firstname,
                        lastname,
                        message,
                        email,
                      }
                    );
                    toast.success(props.t("sent"));
                    navigate("/");

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
                      <div className="flex justify-center gap-2  flex-wrap md:flex-nowrap">
                        <div className="mb-3 w-full md:w-1/2">
                          <label
                            htmlFor="firstname"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white rtl:text-right"
                          >
                            {props.t("firstname")}
                          </label>
                          <input
                            type="firstname"
                            name="firstname"
                            placeholder={props.t("firstname")}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#af7152] focus:border-[#af7152] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#af7152] dark:focus:border-[#af7152] dark:shadow-sm-light"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstname}
                          />
                          <div className="text-red-500">
                            {touched.firstname && errors.firstname}
                          </div>
                        </div>
                        <div className="mb-3 w-full md:w-1/2">
                          <label
                            htmlFor="lastname"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white rtl:text-right"
                          >
                            {props.t("lastname")}
                          </label>
                          <input
                            type="lastname"
                            name="lastname"
                            placeholder={props.t("lastname")}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#af7152] focus:border-[#af7152] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#af7152] dark:focus:border-[#af7152] dark:shadow-sm-light"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastname}
                          />
                          <div className="text-red-500">
                            {touched.lastname && errors.lastname}
                          </div>
                        </div>
                      </div>
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
                          placeholder={props.t("email")}
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#af7152] focus:border-[#af7152] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#af7152] dark:focus:border-[#af7152] dark:shadow-sm-light"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        <div className="text-red-500">
                          {touched.email && errors.email}
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="message"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white rtl:text-right"
                        >
                          {props.t("message")}
                        </label>
                        <textarea
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.message}
                          id="message"
                          rows="5"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#af7152] focus:border-[#af7152] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#af7152] dark:focus:border-[#af7152] dark:shadow-sm-light"
                          placeholder={props.t("message")}
                          required
                        ></textarea>
                        <div className="text-red-500">
                          {errors.message && touched.message && errors.message}
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="text-[#af7152] w-20 mt-5 hover:text-white border border-[#af7152] hover:bg-[#af7152] focus:ring-4 focus:outline-none focus:ring-[#af7152] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-[#af7152] dark:text-[#af7152] dark:hover:text-white dark:hover:bg-[#af7152] dark:focus:ring-yellow-900"
                      >
                        {props.t("send")}
                      </button>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
