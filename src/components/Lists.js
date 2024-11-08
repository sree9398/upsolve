import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ListsComponent = ({ currentUserId }) => {
  
  const { username } = useContext(AuthContext);
  const [lists, setLists] = useState([]);
  const [newList, setNewList] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  const [selectedList, setSelectedList] = useState(null);
  const [problemLink, setProblemLink] = useState("");
  currentUserId=username;
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/lists");
        setLists(response.data);
      } catch (err) {
        console.error("Error fetching lists:", err);
        setError("Failed to fetch lists.");
      }
    };

    fetchLists();
  }, []);

  const handleInputChange = (e) => {
    setNewList({ ...newList, [e.target.name]: e.target.value });
  };

  const handleCreateList = async () => {
    if (!newList.name || !newList.description) {
      setError("Name and description are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/lists", {
        ...newList,
        author: username,
        userId: username,  // Ensure this is set correctly
      });

      setLists([...lists, response.data]);
      setNewList({ name: "", description: "" });
      setError("");
    } catch (err) {
      console.error("Error creating new list:", err);
      const errorMessage = err.response?.data?.message || "Error creating new list.";
      setError(errorMessage);
    }
  };

  const handleOpenList = (list) => {
    setSelectedList(list);
  };

  const handleAddProblemLink = async () => {
    if (!problemLink) {
      alert("Problem link cannot be empty.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/lists/${selectedList._id}/add-problem`,
        { url: problemLink }
      );

      setLists(
        lists.map((list) =>
          list._id === selectedList._id ? response.data : list
        )
      );
      setSelectedList(response.data);
      setProblemLink("");
    } catch (err) {
      alert("Error adding problem link: " + err.message);
    }
  };

  const handleDeleteProblemLink = async (problemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/lists/${selectedList._id}/delete-problem/${problemId}`
      );

      setLists(
        lists.map((list) =>
          list._id === selectedList._id ? response.data : list
        )
      );
      setSelectedList(response.data);
    } catch (err) {
      console.error("Error deleting problem link:", err);
      alert("Error deleting problem link.");
    }
  };

  const handleDeleteList = async (listId) => {
    try {
      await axios.delete(`http://localhost:5000/api/lists/${listId}`, {
        headers: { "user-id": currentUserId }, // Send userId in headers
      });
      setLists(lists.filter((list) => list._id !== listId));
    } catch (err) {
      console.error("Error deleting list:", err);
      alert("Failed to delete the list: " + (err.response?.data?.message || err.message));
    }
  };
  

  const handleCloseList = () => {
    setSelectedList(null);
  };

  const formatDateInTimezone = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    
    <div className="container mx-auto p-4">
      <p>{formatDateInTimezone()}</p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Create a New List</h2>
      <div className="p-4 border rounded shadow">
        <div className="mb-4">
          <label className="block font-bold">List Name</label>
          <input
            type="text"
            name="name"
            value={newList.name}
            onChange={handleInputChange}
            className="mt-2 p-2 border rounded w-full"
            placeholder="Enter list name"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold">Description</label>
          <textarea
            name="description"
            value={newList.description}
            onChange={handleInputChange}
            className="mt-2 p-2 border rounded w-full"
            placeholder="Enter description"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleCreateList}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create List
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4 pt-4">Your Lists</h2>
      <div className="grid gap-4">
        {lists
          .filter((list) => list.userId === currentUserId)
          .map((list) => (
            <div key={list._id} className="border p-4 rounded shadow">
              <h3 className="font-bold">{list.name}</h3>
              <p>{list.description}</p>
              <p className="text-medium text-gray-500 mb-4">
                Published by{" "}
                <Link
                  to={`/profile/${encodeURIComponent(list.author)}`}
                  className="text-blue-600 hover:underline"
                >
                  {list.author}
                </Link>
              </p>
              <button
                onClick={() => handleOpenList(list)}
                className="bg-gray-200 px-2 py-1 rounded mt-2"
              >
                View List
              </button>
              <button
                onClick={() => handleDeleteList(list._id)}
                className="bg-red-500 text-white px-2 py-1 rounded ml-2"
              >
                Delete List
              </button>
            </div>
          ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Other Users' Lists</h2>
      <div className="grid gap-4">
        {lists
          .filter((list) => list.userId !== currentUserId)
          .map((list) => (
            <div key={list._id} className="border p-4 rounded shadow">
              <h3 className="font-bold">{list.name}</h3>
              <p>{list.description}</p>
              <p className="text-medium text-gray-500 mb-4">
                Published by{" "}
                <Link
                  to={`/profile/${encodeURIComponent(list.author)}`}
                  className="text-blue-600 hover:underline"
                >
                  {list.author}
                </Link>
              </p>
              <button
                onClick={() => handleOpenList(list)}
                className="bg-gray-200 px-2 py-1 rounded mt-2"
              >
                View List
              </button>
            </div>
          ))}
      </div>

      {/* Modal for list details */}
      {selectedList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-2/3 max-w-xl">
            <h3 className="text-xl font-bold mb-2">{selectedList.name}</h3>
            <p className="mb-2">{selectedList.description}</p>
            <p className="text-medium text-gray-500 mb-4">
              Published by{" "}
              <Link
                to={`/profile/${encodeURIComponent(selectedList.author)}`}
                className="text-blue-600 hover:underline"
              >
                {selectedList.author}
              </Link>
            </p>

            {/* Problem links */}
            <div className="mt-4">
              <h4 className="font-bold">Problem Links</h4>
              {selectedList.problemLinks?.length > 0 ? (
                <ul>
                  {selectedList.problemLinks.map((link) => (
                    <li key={link._id} className="mt-2">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        {link.url}
                      </a>
                      {selectedList.userId === currentUserId && (
                        <button
                          onClick={() => handleDeleteProblemLink(link._id)}
                          className="text-red-500 ml-2"
                        >
                          Delete
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No problem links added yet.</p>
              )}
            </div>

            {selectedList.userId === currentUserId && (
              <div className="mt-4">
                <input
                  type="text"
                  value={problemLink}
                  onChange={(e) => setProblemLink(e.target.value)}
                  className="border p-2 rounded w-full"
                  placeholder="Enter problem link"
                />
                <button
                  onClick={handleAddProblemLink}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                >
                  Add Problem Link
                </button>
              </div>
            )}

            <button
              onClick={handleCloseList}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListsComponent;
