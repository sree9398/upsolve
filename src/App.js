import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import './css/App.css';
import Stream from './components/Streams';
import Login from "./components/login";
import Register from "./components/register";
import ForgotPassword from "./components/forgotpassword";
import Homepage from "./components/homepage";
import { AuthProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Resources from "./components/Resources";
import Contact from "./components/Contact";
import Profile from "./components/profile";
import EditProfile from "./components/EditProfile";
import Blogs from './components/Blogs';
import AddBlogs from "./components/AddBlogs";
import AuthorProfile from './components/AuthorProfile';
import Lists from './components/Lists';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header /> {/* Header is shown to all users */}
        <Routes>
          {/* Public Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="resources" element={<Resources />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="streams" element={<Stream />} />
          <Route path="lists" element={<Lists />} />
          <Route path="add-blogs" element={<AddBlogs />} />
          <Route path="/profile/:author" element={<AuthorProfile />} />
          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
