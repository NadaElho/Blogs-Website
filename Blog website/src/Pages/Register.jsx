import { Formik } from "formik";
import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [err, setErr] = useState("");
  return (
    <div className="flex flex-col">
      <h1>Anywhere in your app!</h1>
      <Formik
        initialValues={{ email: "", password: "", name: "", image: null }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Required";
          }
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
          if (!values.image) {
            errors.image = "Requird";
          }
          return errors;
        }}
        onSubmit={async (
          { name, password, image, email },
          { setSubmitting }
        ) => {
          localStorage.setItem("email", email);
          try {
            let res = await axios.post(
              "http://localhost:3000/api/v1/users/",
              {
                name,
                password,
                email,
                image,
              },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            setErr(res.data.message);
            console.log(res.data.message);
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
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            <div className="text-red-500">{touched.name && errors.name}</div>
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
            <div className="text-red-500">{errors.password && touched.password && errors.password}</div>
            <input
              type="file"
              name="image"
              onChange={(e) => setFieldValue("image", e.target.files[0])}
            />
            <div className="text-red-500">{errors.image && touched.image && errors.image}</div>
            <div>{err}</div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
