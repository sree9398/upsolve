// EditProfile.js
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { username } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    description: "",
    imageUrl: "",
    github: "",
    leetcode: "",
    codeforces: "",
    codechef: "",
    linkedin: "",
    atcoder: "",
    geeksforgeeks: "",
    code360: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate=useNavigate();
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/profile/${username}`
        );
        setProfileData(response.data);
      } catch (err) {
        setError("Failed to fetch profile data");
      }
    };

    fetchProfileData();
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/profile/${username}`,
        profileData
      );
      setSuccess("Profile updated successfully");
      navigate('/profile');
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 m-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6 m-8">
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-900"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={profileData.name}
              onChange={handleChange}
              placeholder="Name"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-900"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={profileData.email}
              onChange={handleChange}
              placeholder="Email"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-lg font-medium text-gray-900"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={profileData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-lg font-medium text-gray-900"
            >
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={profileData.location}
              onChange={handleChange}
              placeholder="Location"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-900"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={profileData.description}
              onChange={handleChange}
              placeholder="Description"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-lg font-medium text-gray-900"
            >
              Profile Image URL
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="text"
              value={profileData.imageUrl}
              onChange={handleChange}
              placeholder="Profile Image URL"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="linkedin"
              className="block text-lg font-medium text-gray-900"
            >
              LinkedIn
            </label>
            <input
              id="linkedin"
              name="linkedin"
              type="text"
              value={profileData.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn Profile URL"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="github"
              className="block text-lg font-medium text-gray-900"
            >
              GitHub
            </label>
            <input
              id="github"
              name="github"
              type="text"
              value={profileData.github}
              onChange={handleChange}
              placeholder="GitHub Profile URL"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="leetcode"
              className="block text-lg font-medium text-gray-900"
            >
              LeetCode
            </label>
            <input
              id="leetcode"
              name="leetcode"
              type="text"
              value={profileData.leetcode}
              onChange={handleChange}
              placeholder="LeetCode Profile URL"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="codeforces"
              className="block text-lg font-medium text-gray-900"
            >
              Codeforces
            </label>
            <input
              id="codeforces"
              name="codeforces"
              type="text"
              value={profileData.codeforces}
              onChange={handleChange}
              placeholder="Codeforces Profile URL"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="codechef"
              className="block text-lg font-medium text-gray-900"
            >
              CodeChef
            </label>
            <input
              id="codechef"
              name="codechef"
              type="text"
              value={profileData.codechef}
              onChange={handleChange}
              placeholder="CodeChef Profile URL"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
            />
          </div>
          
          
          <div>
            <label
              htmlFor="geeksforgeeks"
              className="block text-lg font-medium text-gray-900"
            >
              GeeksforGeeks
            </label>{" "}
            <input
              id="geeksforgeeks"
              name="geeksforgeeks"
              type="text"
              value={profileData.geeksforgeeks}
              onChange={handleChange}
              placeholder="GeeksforGeeks Profile URL"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
            />{" "}
          </div>{" "}
          {" "}
          {error && <p className="text-red-600">{error}</p>}{" "}
          {success && <p className="text-green-600">{success}</p>}{" "}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md shadow-md hover:bg-indigo-700"
          >
            {" "}
            Update Profile{" "}
          </button>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
};
 
export default EditProfile;