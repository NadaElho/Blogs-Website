import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import EditBlog from "./Pages/EditBlog";
import BlogDetails from "./Pages/BlogDetails";
import Blogs from "./Pages/Blogs";
import Categories from "./Pages/Categories";
import AddBlog from "./Pages/AddBlog";
import Contact from "./Pages/Contact";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import CheckEmail from "./Pages/CheckEmail";
import Navbar from "./Components/Navbar";
import PrivateRoute from "./ProtectedRoutes/PrivateRoute"
import Guard from "./ProtectedRoutes/Guard";
import AuthContext from "./AuthContext";

function App() {
  const { t, i18n } = useTranslation();
  const [dark, setDark] = useState(localStorage.getItem("dark") || "light");
  const { auth } = useContext(AuthContext);

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
      <SkeletonTheme
        baseColor={dark == "dark" ? "#111827" : "#EEE"}
        highlightColor={dark == "dark" ? "#525252" : "#FFF"}
      >
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
            <Route path="/contact" element={<Contact t={t} />} />
            <Route element={<PrivateRoute isAuthenticated={auth.token} />}>
              <Route path="/login" element={<Login t={t} />} />
              <Route path="/register" element={<Register t={t} />} />
              <Route
                path="/forgot-password"
                element={<ForgotPassword t={t} />}
              />
              <Route
                path="/reset-password/:id/:token"
                element={<ResetPassword t={t} />}
              />
              <Route path="/check-email" element={<CheckEmail t={t} />} />
            </Route>
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
            <Route element={<Guard isAuthenticated={auth.token} />}>
              <Route
                path="/blogs/blog"
                element={<AddBlog t={t} lang={i18n.resolvedLanguage} />}
              />
              <Route path="/blog/:id" element={<BlogDetails t={t} />} />
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
