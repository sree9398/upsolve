import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { name, username, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 201) {
        alert("Registration successful");
        <div
          class="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>Registration Successfull</strong> You can login now
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>;
        navigate("/login");
      } else {
        setError(data.message || "An error occurred");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.log(error); // Log the error
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm form-login">
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-6 form-input">
          {/* Form fields */}
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-medium leading-6 text-gray-900"
            >
              Full Name
            </label>
            <div className="mt-2 form-input">
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={onChange}
                required
                placeholder="Enter Full Name"
                autoComplete="name"
                className="inp block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
              />
            </div>
          </div>

          {/* Other fields */}
          <div>
            <label
              htmlFor="username"
              className="block text-lg font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2 form-input">
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={onChange}
                required
                placeholder="Enter Username"
                autoComplete="username"
                className="inp block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2 form-input">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={onChange}
                required
                placeholder="Enter Email"
                autoComplete="email"
                className="inp block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={onChange}
                required
                placeholder="Enter Password"
                autoComplete="current-password"
                className="inp block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
