import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext"; // Import the AuthContext
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
import codechef from "../assets/codechef.png";
import codeforces from "../assets/Codeforces.png";
import atcoder from "../assets/atcoder.jpg";
// import SocialLinks from "./SocialLinks";
const AuthorProfile = () => {
  const { author } = useParams();
  const { isAuthenticated, setRedirectPath } = useContext(AuthContext); // Get username from AuthContext
  const [profile, setProfile] = useState(null); // To store the profile data
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };
  const handleLoginProfile = () => {
    setRedirectPath("profile");
    navigate("/login");
  };
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/profile/${author}`
        );
        // No need to check response.ok; axios will handle it
        const data = response.data;

        if (!data || Object.keys(data).length === 0) {
          setError("Profile data not found");
        } else {
          setProfile(data);
        }
      } catch (error) {
        setError("Failed to fetch profile data: " + error.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchProfileData();
    }
  }, [isAuthenticated, author]);

  if (error) {
    return (
      <>
        <h1 className="text-2xl text-center font-semibold text-red-900 mb-4 pl-8 pt-6">
          {error}
        </h1>
        {isAuthenticated ? (
          <div className="container text-2xl text-center font-semibold text-red-900 mb-4 pl-8 pt-6">
            <button
              onClick={handleEditProfile}
              className="bg-violet-600 text-center text-white py-2 px-4 rounded-md"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="container text-2xl text-center font-semibold text-red-900 mb-4 pl-8 pt-6">
            <button
              onClick={handleLoginProfile}
              className="bg-violet-600 text-center text-white py-2 px-4 rounded-md"
            >
              Login
            </button>
          </div>
        )}
      </>
    ); // Display error message if any
  }

  if (loading) {
    return (
      <>
        <div className="d-flex justify-content-center align-items-center mt-32">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden ">Loading...</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-4 pl-8 pt-6">
            Loading Profile Data...
          </h1>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-200 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-blue-100 rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="flex justify-end p-4">
          <button
            onClick={handleEditProfile}
            className="bg-amber-700 text-white py-2 px-4 rounded-xl"
          >
            Edit Profile
          </button>
        </div>
        <div className="flex flex-col lg:flex-row bg-gray-400 rounded-3xl m-6">
          {/* Profile Image */}
          <div className="w-full lg:w-1/4 p-4 flex items-center justify-center lg:justify-start">
            <img
              className="w-32 h-32 rounded-full border-4 border-green-500"
              src={profile.imageUrl}
              alt="Profile"
            />
          </div>
          {/* Profile Info */}
          <div className="w-full lg:w-3/4 p-4">
            <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-gray-800 text-xl mt-1">
              Username: {profile.username}
            </p>
            <p className="text-gray-800 text-xl mt-2">Email: {profile.email}</p>
            <p className="text-gray-800 text-xl mt-2">Phone: {profile.phone}</p>
            <p className="text-gray-800 text-xl mt-2">
              Location: {profile.location}
            </p>
            <p className="text-gray-800 text-xl mt-2">
              Description: {profile.description}
            </p>
          </div>
        </div>
        <div className="cont">
          {/* <h1 className="text-gray-800 text-xl mt-2 ml-10">Social Links</h1> */}
          <ul className="flex m-6 justify-evenly rounded-3xl items-center my-5 space-x-4 md:space-x-5 bg-neutral-400 p-6">
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  class="bi bi-linkedin"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  class="bi bi-github"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href={profile.twitter}
                target="_blank"
                rel="noreferrer noopener"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  class="bi bi-twitter-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href={profile.leetcode}
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  width="34"
                  height="34"
                  src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-shadow-tal-revivo.png"
                  alt="external-level-up-your-coding-skills-and-quickly-land-a-job-logo-shadow-tal-revivo"
                />
              </a>
            </li>
            <li>
              <a
                href={profile.codeforces}
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src={codeforces}
                  alt="codeforces"
                  width={180}
                  height={100}
                />
              </a>
            </li>
            <li>
              <a
                href={profile.codechef}
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src={codechef} width={52} height={52} alt="codechef" />
              </a>
            </li>
            <li>
              <a
                href={profile.atcoder}
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src={atcoder} alt="atcode" width={82} height={82} />
              </a>
            </li>
            <li>
              <a
                href={profile.geeksforgeeks}
                target="_blank"
                rel="noreferrer noopener"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="42"
                  height="42"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#43a047"
                    d="M29.035,24C29.014,23.671,29,23.339,29,23c0-6.08,2.86-10,7-10c3.411,0,6.33,2.662,7,7l2,0l0.001-9	L43,11c0,0-0.533,1.506-1,1.16c-1.899-1.066-3.723-1.132-6.024-1.132C30.176,11.028,25,16.26,25,22.92	c0,0.364,0.021,0.723,0.049,1.08h-2.099C22.979,23.643,23,23.284,23,22.92c0-6.66-5.176-11.892-10.976-11.892	c-2.301,0-4.125,0.065-6.024,1.132C5.533,12.506,5,11,5,11l-2.001,0L3,20l2,0c0.67-4.338,3.589-7,7-7c4.14,0,7,3.92,7,10	c0,0.339-0.014,0.671-0.035,1H0v2h1.009c1.083,0,1.977,0.861,1.999,1.943C3.046,29.789,3.224,32.006,4,33c1.269,1.625,3,3,8,3	c5.022,0,9.92-4.527,11-10h2c1.08,5.473,5.978,10,11,10c5,0,6.731-1.375,8-3c0.776-0.994,0.954-3.211,0.992-5.057	C45.014,26.861,45.909,26,46.991,26H48v-2H29.035z M11.477,33.73C9.872,33.73,7.322,33.724,7,32	c-0.109-0.583-0.091-2.527-0.057-4.046C6.968,26.867,7.855,26,8.943,26H19C18.206,30.781,15.015,33.73,11.477,33.73z M41,32	c-0.322,1.724-2.872,1.73-4.477,1.73c-3.537,0-6.729-2.949-7.523-7.73h10.057c1.088,0,1.975,0.867,2,1.954	C41.091,29.473,41.109,31.417,41,32z"
                  ></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        {/* Content Section */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Lists and Count */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">
              Lists & Counts
            </h2>
            <ul className="mt-4 space-y-2">
              <li className="flex justify-between text-gray-600">
                <span>List Count</span>
                <span>{profile.listCount}</span>
              </li>
              <li className="flex justify-between text-gray-600">
                <span>Upsolve List</span>
                <span>{profile.upsolveListCount}</span>
              </li>
            </ul>
          </div>

          {/* Followers & Friends */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">
              Followers & Friends
            </h2>
            <ul className="mt-4 space-y-2">
              <li className="flex justify-between text-gray-600">
                <span>Followers</span>
                <span>{profile.followers}</span>
              </li>
              <li className="flex justify-between text-gray-600">
                <span>Friends</span>
                <span>{profile.friends}</span>
              </li>
            </ul>
          </div>

          {/* Upvotes & Public Lists */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">
              Upvotes & Public Lists
            </h2>
            <ul className="mt-4 space-y-2">
              <li className="flex justify-between text-gray-600">
                <span>Upvotes</span>
                <span>{profile.upvotes}</span>
              </li>
              <li className="flex justify-between text-gray-600">
                <span>Public Lists</span>
                <span>{profile.publicLists}</span>
              </li>
            </ul>
          </div>

          {/* Public Blogs */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md col-span-2">
            <h2 className="text-2xl font-semibold text-gray-800">
              Public Blogs
            </h2>
            <ul className="mt-4 space-y-2">
              {profile.publicBlogs.map((blog, index) => (
                <li key={index} className="text-gray-600">
                  <a href="/" className="text-blue-600 hover:text-blue-800">
                    {blog}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
