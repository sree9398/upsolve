import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Link } from "react-router-dom";
import moment from "moment-timezone";

const Streams = () => {
  const { isAuthenticated, username } = useContext(AuthContext);
  const [streams, setStreams] = useState([]);
  const [newStream, setNewStream] = useState({
    author: username,
    topic: "",
    description: "",
    youtubeLink: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingStream, setEditingStream] = useState(null);
  const [loading, setLoading] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(null); // State to manage the currently playing video

  // Fetch streams from backend
  useEffect(() => {
    const fetchStreams = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/streams");
        const data = await response.json();

        if (Array.isArray(data)) {
          setStreams(data);
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (error) {
        console.error("Error fetching streams:", error);
        setError("Failed to load streams");
      } finally {
        setLoading(false);
      }
    };
    fetchStreams();
  }, []);

  // Add a new stream
  const handleAddStream = async (e) => {
    e.preventDefault();
    if (newStream.topic && newStream.description && newStream.youtubeLink) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/streams", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newStream),
        });

        if (response.ok) {
          const addedStream = await response.json();
          setStreams((prevStreams) => [...prevStreams, addedStream]);
          setNewStream({
            author: username,
            topic: "",
            description: "",
            youtubeLink: "",
          });
          setSuccess("Stream added successfully");
        } else {
          const errorData = await response.json();
          setError("Failed to add stream: " + errorData.message);
        }
      } catch (error) {
        console.error("Error adding stream:", error);
        setError("An error occurred while adding the stream");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please fill in all fields.");
    }
  };

  // Edit stream handler
  const handleEditStream = (stream) => {
    setEditingStream(stream);
  };

  // Save edited stream
  const handleSaveEdit = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/streams/${editingStream._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingStream),
        }
      );

      if (response.ok) {
        const updatedStream = await response.json();
        setStreams(
          streams.map((s) => (s._id === updatedStream._id ? updatedStream : s))
        );
        setEditingStream(null);
        setSuccess("Stream updated successfully");
      } else {
        setError("Failed to update stream" + response.status);
      }
    } catch (error) {
      console.error("Error updating stream:", error);
      setError("An error occurred while updating the stream");
    } finally {
      setLoading(false);
    }
  };

  // Delete stream handler
  const handleDeleteStream = async (streamId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/streams/${streamId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setStreams(streams.filter((stream) => stream._id !== streamId));
        setSuccess("Stream deleted successfully");
      } else {
        setError("Failed to delete stream: " + response.status);
      }
    } catch (error) {
      console.error("Error deleting stream:", error);
      setError("An error occurred while deleting the stream");
    } finally {
      setLoading(false);
    }
  };

  const formatDateInTimezone = (dateString) => {
    const date = new Date(dateString);
    const timeZone = "Asia/Kolkata";
    return moment(date).tz(timeZone).format("MMMM DD, YYYY hh:mm:ss A");
  };

  // Function to handle video play
  const handleVideoClick = (link) => {
    const videoId = link.split("v=")[1]?.split("&")[0]; // Extract YouTube video ID
    if (videoId) {
      setPlayingVideo(videoId); // Set the playing video ID
    }
  };

  return (
    <div className="p-6 bg-neutral-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Streams</h2>

      {/* Loading indicator */}
      {loading && (
        <div className="d-flex justify-content-center align-items-center mt-32">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden ">Loading...</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-4 pl-8 pt-6">
            Loading Streams...
          </h1>
        </div>
      )}

      {/* Streams list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {streams.length > 0 ? (
          streams.map((stream) => (
            <div key={stream._id} className="bg-white shadow-md rounded-lg p-4">
              {editingStream && editingStream._id === stream._id ? (
                <div>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-lg mb-2"
                    value={editingStream.topic}
                    onChange={(e) =>
                      setEditingStream({
                        ...editingStream,
                        topic: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-lg mb-2"
                    value={editingStream.description}
                    onChange={(e) =>
                      setEditingStream({
                        ...editingStream,
                        description: e.target.value,
                      })
                    }
                  />
                  <input
                    type="url"
                    className="p-2 border border-gray-300 rounded-lg mb-2"
                    value={editingStream.youtubeLink}
                    onChange={(e) =>
                      setEditingStream({
                        ...editingStream,
                        youtubeLink: e.target.value,
                      })
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
                  <h3 className="text-xl font-semibold text-indigo-600">
                    {stream.topic}
                  </h3>
                  <p className="text-gray-500 mt-2">{stream.description}</p>
                  <Link
                    onClick={() => handleVideoClick(stream.youtubeLink)} // Handle click to play video
                    className="text-blue-500 mt-2 block"
                  >
                    Watch Stream
                  </Link>
                  {/* Embed the YouTube player if playingVideo is set */}
                  {playingVideo ===
                    stream.youtubeLink.split("v=")[1]?.split("&")[0] && (
                    <div className="mt-4">
                      <iframe
                        width="100%"
                        height="315"
                        src={`https://www.youtube.com/embed/${playingVideo}`} // Embed the YouTube video
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                  <p className="text-medium text-gray-500 mt-2">
                    Created on {formatDateInTimezone(stream.createdAt)} by{" "}
                    <Link
                      to={`/profile/${encodeURIComponent(stream.author)}`}
                      className="text-blue-600 hover:underline"
                    >
                      {stream.author}
                    </Link>
                  </p>
                  {isAuthenticated && stream.author === username && (
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => handleEditStream(stream)}
                        className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteStream(stream._id)}
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
          <p className="text-gray-600 text-xl">No streams available.</p>
        )}
      </div>

      {/* Add New Stream Section */}
      {isAuthenticated && (
        <>
          <h3 className="text-2xl font-bold text-gray-700 mb-4">
            Add a New Stream
          </h3>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-lg"
                placeholder="Topic"
                value={newStream.topic}
                onChange={(e) =>
                  setNewStream({ ...newStream, topic: e.target.value })
                }
              />
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-lg"
                placeholder="Description"
                value={newStream.description}
                onChange={(e) =>
                  setNewStream({ ...newStream, description: e.target.value })
                }
              />
              <input
                type="url"
                className="p-2 border border-gray-300 rounded-lg"
                placeholder="YouTube Link"
                value={newStream.youtubeLink}
                onChange={(e) =>
                  setNewStream({ ...newStream, youtubeLink: e.target.value })
                }
              />
            </div>
            <button
              onClick={handleAddStream}
              className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-700"
            >
              Add Stream
            </button>
            {error && <p className="text-red-600 mt-2">{error}</p>}
            {success && <p className="text-green-600 mt-2">{success}</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default Streams;
