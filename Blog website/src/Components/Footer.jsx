import React from "react";
import { Link } from "react-router-dom";
import { ImBlogger } from "react-icons/im";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = (props) => {
  return (
    <div>
      <footer className="bg-white dark:bg-gray-900 mt-5">
        <div className="mx-auto w-full max-w-screen">
          <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 dark:text-white">
                <Link
                  to="/"
                  className="flex items-center rtl:flex-row-reverse rtl:gap-2 rtl:justify-end space-x-3 rtl:space-x-reverse rtl:text-left"
                >
                  {/* <ImBlogger style={{ color: "#af7152" }} /> */}
                  <img className="w-[30px]" src="https://user-images.githubusercontent.com/74038190/216122003-1c7d9078-357a-47f5-81c7-1c4f2552e143.png" alt="" />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                    Blogs
                  </span>
                </Link>
              </h2>
              <div className=" text-dark dark:text-gray-300 w-3/4">
                {props.t("blogDetails")}
              </div>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                {props.t("links")}
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    {props.t("home")}
                  </a>
                </li>
                <li className="mb-4">
                  <Link to="/blogs" className="hover:underline">
                    {props.t("blogs")}
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/categories" className="hover:underline">
                    {props.t("categories")}
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/contact" className="hover:underline">
                    {props.t("contact")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                {props.t("social")}
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://www.facebook.com/nadaelhosary51"
                    className="hover:underline"
                  >
                    {props.t("facebook")}
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://www.linkedin.com/in/nada-elhosary-0684611a5/"
                    className="hover:underline"
                  >
                    {props.t("linkedin")}
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://github.com/NadaElho"
                    className="hover:underline"
                  >
                    {props.t("github")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
              {props.t("rights")}
            </span>
            <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
              <a
                href="https://www.facebook.com/nadaelhosary51"
                className="text-gray-400 hover:text-[#af7152]"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 8 19"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Facebook page</span>
              </a>
              <a
                href="https://www.linkedin.com/in/nada-elhosary-0684611a5/"
                className="text-gray-400 hover:text-[#af7152]"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://github.com/NadaElho"
                className="text-gray-400 hover:text-[#af7152]"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">GitHub account</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
