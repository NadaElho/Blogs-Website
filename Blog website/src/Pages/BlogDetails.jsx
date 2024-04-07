import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      await axios.patch(`http://localhost:3000/api/v1/blogs/views/${id}`);
    })();
  }, [id]);
  return <div>BlogDetails</div>;
};

export default BlogDetails;
