import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import EditBlog from "./Pages/EditBlog";
import BlogDetails from "./Pages/BlogDetails";
import Blogs from "./Pages/Blogs";
import Categories from "./Pages/Categories";
import AddBlog from "./Pages/AddBlog";
import Navbar from "./Components/Navbar";

import PrivateRoute from "./ProtectedRoutes/privateRoute";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

function App() {
  const { t, i18n } = useTranslation();
  const [dark, setDark] = useState(localStorage.getItem("dark") || "light");
  
  useEffect(() => {
    dark == "dark"
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");

    console.log(i18n.resolvedLanguage);
  }, []);

  const languageHandler = () => {
    i18n.resolvedLanguage == "en"
      ? i18n.changeLanguage("ar")
      : i18n.changeLanguage("en");
  };
  const rootHtml = document.getElementById("root");
  if (rootHtml) {
    rootHtml.setAttribute("dir", i18n.resolvedLanguage == "en" ? "ltr" : "rtl");
  }
  const darkModeHandler = () => {
    let newMode = dark == "light" ? "dark" : "light";
    setDark(newMode);
    localStorage.setItem("dark", newMode);
    document.body.classList.toggle("dark");
  };

  return (
    <div className="rtl:font-noto ltr:font-sans dark:bg-gray-900 min-h-screen">
      <div></div>
      <BrowserRouter>
        <ToastContainer />
        <Navbar
          darkModeHandler={darkModeHandler}
          languageHandler={languageHandler}
          dark={dark}
          t={t}
        />
        <Routes>
          <Route path="/" element={<Home dark={dark} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/categories"
            element={<Categories t={t} lang={i18n.resolvedLanguage} />}
          />
          <Route
            path="/blogs"
            element={<Blogs t={t} lang={i18n.resolvedLanguage} />}
          />
          <Route
            path="/blogs/category/:cat_id"
            element={<Blogs t={t} lang={i18n.resolvedLanguage} />}
          />
          <Route
            path="/blogs/:title"
            element={<Blogs t={t} lang={i18n.resolvedLanguage} />}
          />
          <Route element={<PrivateRoute />}>
            <Route
              path="/blogs/blog"
              element={<AddBlog t={t} lang={i18n.resolvedLanguage} />}
            />
            <Route
              path="/blog/:id"
              element={<BlogDetails t={t} lang={i18n.resolvedLanguage} />}
            />
            <Route
              path="/blogs/blog/:id"
              element={<EditBlog t={t} lang={i18n.resolvedLanguage} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
