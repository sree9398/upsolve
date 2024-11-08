import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Link } from "react-router-dom";
import moment from "moment-timezone";

const Resources = () => {
  const { isAuthenticated, username } = useContext(AuthContext);
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({ category: '', name: '', link: '', addedBy: username });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingResource, setEditingResource] = useState(null);

  // Fetch resources from backend
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/resources");
        const data = await response.json();

        if (Array.isArray(data)) {
          setResources(data);
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
        setError("Failed to load resources");
      }
    };
    fetchResources();
  }, []);

  // Add a new resource
  const handleAddResource = async (e) => {
    e.preventDefault();
    if (newResource.category && newResource.name && newResource.link) {
      try {
        const response = await fetch("http://localhost:5000/api/resources", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newResource),
        });

        if (response.ok) {
          const addedResource = await response.json();
          setResources((prevResources) => [...prevResources, addedResource]);
          setNewResource({ category: '', name: '', link: '', addedBy: username });
          setSuccess("Resource added successfully");
        } else {
          const errorData = await response.json();
          setError("Failed to add resource: " + errorData.message);
        }
      } catch (error) {
        console.error("Error adding resource:", error);
        setError("An error occurred while adding the resource");
      }
    } else {
      setError("Please fill in all fields.");
    }
  };

  // Edit resource handler
  const handleEditResource = (resource) => {
    setEditingResource(resource);
  };

  // Save edited resource
  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/resources/${editingResource._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingResource),
      });

      if (response.ok) {
        const updatedResource = await response.json();
        setResources(resources.map(r => (r._id === updatedResource._id ? updatedResource : r)));
        setEditingResource(null);
        setSuccess("Resource updated successfully");
      } else {
        setError("Failed to update resource");
      }
    } catch (error) {
      console.error("Error updating resource:", error);
      setError("An error occurred while updating the resource");
    }
  };

  // Delete resource handler
  const handleDeleteResource = async (resourceId) => {
    console.log("Deleting resource with ID:", resourceId); // Log the resource ID
    try {
      const response = await fetch(`http://localhost:5000/api/resources/${resourceId}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setResources(resources.filter((resource) => resource._id !== resourceId));
        setSuccess("Resource deleted successfully");
      } else {
        setError("Failed to delete resource: " + response.status);
      }
    } catch (error) {
      console.error("Error deleting resource:", error);
      setError("An error occurred while deleting the resource");
    }
  };
  
  const formatDateInTimezone = (dateString) => {
    const date = new Date(dateString);
    const timeZone = "Asia/Kolkata";
    return moment(date).tz(timeZone).format("MMMM DD, YYYY hh:mm:ss A");
  };


  return (
    <div className="p-6 bg-neutral-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Resources for CS Students</h2>

      {/* Resources list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {resources.length > 0 ? (
          resources.map((resource) => (
            <div key={resource._id} className="bg-white shadow-md rounded-lg p-4">
              {editingResource && editingResource._id === resource._id ? (
                <div>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-lg mb-2"
                    value={editingResource.category}
                    onChange={(e) =>
                      setEditingResource({ ...editingResource, category: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-lg mb-2"
                    value={editingResource.name}
                    onChange={(e) =>
                      setEditingResource({ ...editingResource, name: e.target.value })
                    }
                  />
                  <input
                    type="url"
                    className="p-2 border border-gray-300 rounded-lg mb-2"
                    value={editingResource.link}
                    onChange={(e) =>
                      setEditingResource({ ...editingResource, link: e.target.value })
                    }
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-indigo-600">{resource.category}</h3>
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 mt-2 block"
                  >
                    {resource.name}
                  </a>
                  <p className="text-medium text-gray-500 mt-2">
                Added on{" "}
                {formatDateInTimezone(resource.dateAdded || resource.createdAt)} by{" "}
                <Link
                  to={`/profile/${encodeURIComponent(resource.addedBy)}`}
                  className="text-blue-600 hover:underline"
                >
                  {resource.addedBy || "Unknown"}
                </Link>
              </p>
                  {isAuthenticated && resource.addedBy === username && (
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => handleEditResource(resource)}
                        className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteResource(resource._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600">No resources available.</p>
        )}
      </div>

      {/* Add New Resource Section */}
      {isAuthenticated && (
        <>
          <h3 className="text-2xl font-bold text-gray-700 mb-4">Add a New Resource</h3>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Category (e.g., DSA, CP)"
                className="p-2 border border-gray-300 rounded-lg"
                value={newResource.category}
                onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
              />
              <input
                type="text"
                placeholder="Resource Name"
                className="p-2 border border-gray-300 rounded-lg"
                value={newResource.name}
                onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
              />
              <input
                type="url"
                placeholder="Resource Link"
                className="p-2 border border-gray-300 rounded-lg"
                value={newResource.link}
                onChange={(e) => setNewResource({ ...newResource, link: e.target.value })}
              />
            </div>
            <button
              onClick={handleAddResource}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Add Resource
            </button>
            {error && <p className="text-red-600 mt-2">{error}</p>}
            {success && <p className="text-green-600 mt-2">{success}</p>}
          </div>
        </>
      )}

      {!isAuthenticated && (
        <p className="text-gray-600 text-xl">Please log in to add resources.</p>
      )}
    </div>
  );
};

export default Resources;
