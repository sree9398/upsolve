import React, { useEffect, useState, useContext } from "react";
import ReactStringReplace from "react-string-replace";
import { PencilIcon, ArrowLongUpIcon, TrashIcon } from "@heroicons/react/20/solid"; // Import TrashIcon
import { AuthContext } from "./AuthContext";
import axios from "axios";
import moment from "moment-timezone";
import Modal from "./Modal"; // Import your Modal component
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate

const Blogs = () => {
  const navigate = useNavigate(); // Define navigate using useNavigate
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null); // State to hold the selected blog for the modal

  const { isAuthenticated, setRedirectPath, username } = useContext(AuthContext);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(response.data);
    } catch (err) {
      alert(err);
      setError("Failed to fetch blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleLoginRedirect = () => {
    setRedirectPath("/blogs");
    navigate("/login");
  };

  const handleBlogRedirect = () => {
    navigate("/add-blogs");
  };

  const handleEditRedirect = (blogId) => {
    navigate(`/edit-blogs/${blogId}`);
  };

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await axios.delete(`http://localhost:5000/api/blogs/${blogId}`);
        setBlogs(blogs.filter(blog => blog.id !== blogId)); // Update the state to remove the deleted blog
        alert("Blog deleted successfully!");
      } catch (error) {
        alert("Failed to delete the blog.");
      }
    }
  };

  const parseContent = (content) => {
    return ReactStringReplace(content, /(https?:\/\/[^\s]+)/g, (match, i) => (
      <a
        key={i}
        href={match}
        className="text-blue-500 underline hover:text-blue-700"
        target="_blank"
        rel="noopener noreferrer"
      >
        {match}
      </a>
    ));
  };

  const formatDateInTimezone = (dateString) => {
    const date = new Date(dateString);
    const timeZone = "Asia/Kolkata";
    return moment(date).tz(timeZone).format("MMMM DD, YYYY hh:mm:ss A");
  };

  const openModal = (blog) => {
    setSelectedBlog(blog); // Set the selected blog to be displayed in the modal
  };

  const closeModal = () => {
    setSelectedBlog(null); // Close the modal by setting selected blog to null
  };

  return (
    <div className="min-h-screen bg-neutral-200 p-8">
      {loading && (
        <div className="d-flex justify-content-center align-items-center mt-32">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden ">Loading...</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-4 pl-8 pt-6">
            Loading Blogs...
          </h1>
        </div>
      )}
      {error && (
        <>
          <p className="text-center font-semibold text-2xl text-red-500">{error}</p>
          <p className="text-center font-semibold text-2xl text-blue-500">
            <Link to="/add-blogs">Add Blogs</Link>
            
          </p>
        </>
      )}
      {!loading && !error && (
        <>
          {isAuthenticated ? (
            <div className="flex justify-end mr-20">
              <button
                onClick={handleBlogRedirect}
                className="flex items-center p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <PencilIcon className="h-6 w-6 mr-2" />
                Add Blogs
              </button>
            </div>
          ) : (
            <div className="flex justify-end mr-20">
              <button
                onClick={handleLoginRedirect}
                className="flex items-center p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <ArrowLongUpIcon className="h-6 w-6 mr-2" />
                Login
              </button>
            </div>
          )}
          <h1 className="text-3xl font-bold text-center mb-8">Blog Posts</h1>
          <div className="space-y-6">
            {blogs.length === 0 ? (
              <p className="text-center">No blogs available.</p>
            ) : (
              blogs.map((blog) => (
                <div
                  key={blog.id}
                  onClick={() => openModal(blog)}
                  className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
                >
                  <h2 className="text-2xl font-bold text-gray-800 cursor-pointer" >
                    {blog.title}
                  </h2>
                  <p className="text-medium text-gray-500 mb-4">
                    Published on {formatDateInTimezone(blog.date)} by{" "}
                    <Link
                      to={`/profile/${encodeURIComponent(blog.author)}`}
                      className="text-blue-600 hover:underline"
                    >
                      {blog.author}
                    </Link>
                  </p>

                  <div className="text-gray-700 text-lg mb-4">
                    {parseContent(blog.content)}
                  </div>
                  <div className="flex justify-between items-center text-gray-600">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <svg
                          className="w-5 h-5 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M3 8h4l1-4h4l1 4h4v7H3V8z" />
                        </svg>
                        <span className="ml-1">{blog.upvotes} Upvotes</span>
                      </span>
                      <span className="flex items-center">
                        <svg
                          className="w-5 h-5 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M18 10V8a6 6 0 00-12 0v2a6 6 0 00-6 6v2h24v-2a6 6 0 00-6-6z" />
                        </svg>
                        <span className="ml-1">{blog.comments} Comments</span>
                      </span>
                    </div>
                    <span className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M4 12l4-4 4 4h8" />
                      </svg>
                      <span className="ml-1">{blog.views} Views</span>
                    </span>
                  </div>

                  {/* Edit and Delete Buttons */}
                  {isAuthenticated && blog.author === username && (
                    <div className="flex justify-end space-x-4 mt-4">
                      <button
                        onClick={() => handleEditRedirect(blog.id)}
                        className="flex items-center p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        <PencilIcon className="h-5 w-5 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="flex items-center p-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <TrashIcon className="h-5 w-5 mr-1" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </>
      )}
      {/* Modal for displaying blog details */}
      <Modal blog={selectedBlog} onClose={closeModal} />
    </div>
  );
};

export default Blogs;
