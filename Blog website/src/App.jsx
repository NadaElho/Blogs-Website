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
import Contact from "./Pages/Contact";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import { SkeletonTheme } from 'react-loading-skeleton';

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
      <SkeletonTheme baseColor={dark == 'dark' ?  '#111827' : '#EEE'} highlightColor={dark == 'dark' ?  "#525252" : '#FFF'}>
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
            <Route
              path="/"
              element={<Home dark={dark} t={t} lang={i18n.resolvedLanguage} />}
            />
            <Route path="/login" element={<Login t={t} />} />
            <Route path="/register" element={<Register t={t} />} />
            <Route path="/contact" element={<Contact t={t} />} />
            <Route path="/forgot-password" element={<ForgotPassword t={t} />} />
            <Route path="/reset-password" element={<ResetPassword t={t} />} />
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
              path="/blogs/user/:user_id"
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
      </SkeletonTheme>
    </div>
  );
}

export default App;
