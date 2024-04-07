import { Formik } from "formik";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [errMsg, setErrMsg] = useState("");
  return (
    <div className="flex flex-col">
      <h1>Anywhere in your app!</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Required";
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
                email
              }
            );
            console.log(res);
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("id", res.data.id)
            setErrMsg(res.data.message);
          } catch (err) {
            console.log(err);
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
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <div className="text-red-500">{touched.email && errors.email}</div>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <div className="text-red-500">
              {errors.password && touched.password && errors.password}
            </div>
            <div>{errMsg}</div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
