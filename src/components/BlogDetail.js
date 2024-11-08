// BlogDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment-timezone";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
      setBlog(response.data);
    } catch (err) {
      console.error("Error fetching blog details:", err);
      setError("Failed to fetch blog details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogDetail();
  }, [id]);

  const formatDateInTimezone = (dateString) => {
    const date = new Date(dateString);
    const timeZone = "Asia/Kolkata";
    return moment(date).tz(timeZone).format("MMMM DD, YYYY hh:mm:ss A");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold">{blog.title}</h2>
      <p className="text-medium text-gray-500 mb-4">
        Published on {formatDateInTimezone(blog.date)} by {blog.author}
      </p>
      <div className="text-gray-700 text-lg mb-4">{blog.content}</div>
    </div>
  );
};

export default BlogDetail;
