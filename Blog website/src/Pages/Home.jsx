import axios from "axios";
import { useEffect, useState } from "react";
import img from "../assets/blank-profile-picture-973460_640.webp";
const Home = () => {
  const [userData, setUserData] = useState({
    name: "",
    password: "",
    email: "",
    image: "",
  });

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    let userEmail = localStorage.getItem("email");
    userEmail &&
      (async function () {
        let { data } = await axios.get(
          `http://localhost:3000/api/v1/users/${userEmail}`
        );
        console.log(data);
        setUserData(data);
      })();

    (async function () {
      let { data } = await axios.get("http://localhost:3000/api/v1/blogs");
      setBlogs(data);
    })();
  }, []);
  return (
    <div>
      <div className="userInfo">
        <img
          src={
            userData.image
              ? `http://localhost:3000/uploads/${userData.image}`
              : img
          }
          alt="no im"
        />
        <h3>{userData.name || ""}</h3>
      </div>
      {blogs.map((blog) => {
        return (
          <div key={blog._id}>
            <div
              className={
                blog.userId == userData._id ? "text-red-500" : "text-gree-500"
              }
            >
              {blog.title}
            </div>
            <img src={`http://localhost:3000/uploads/${blog.image}`} alt="no" />
          </div>
        );
      })}
    </div>
  );
};

export default Home;
