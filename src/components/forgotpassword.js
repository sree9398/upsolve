import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function ForgotPassword() {
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false); // To track if OTP has been sent
  const [otpVerified, setOtpVerified] = useState(false); // To track if OTP is verified
  const [newPassword, setNewPassword] = useState(''); // For password reset
  const [confirmPassword, setConfirmPassword] = useState(''); // For confirm password

  // Handle OTP request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send email to backend to request OTP
      const response = await axios.post('http://localhost:5000/api/request-otp', { email });
      setMessage(response.data.message);
      setError(''); // Clear any previous error
      setOtpSent(true); // Show OTP input field once email is valid and OTP is sent
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred');
      }
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  // Handle OTP validation
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verify OTP with backend
      const response = await axios.post('http://localhost:5000/api/verify-otp', { email, otp });
      setMessage(response.data.message);
      setError('');
      setOtpVerified(true); // OTP is verified, show password reset form
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Invalid OTP. Please try again.');
      }
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  // Handle password reset
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      // Send new password to backend
      const response = await axios.post('http://localhost:5000/api/reset-password', { email, newPassword });
      setMessage(response.data.message);
      setError(''); // Clear any previous error
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred while resetting the password.');
      }
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm form-login">
        <form onSubmit={otpVerified ? handlePasswordReset : (otpSent ? handleOtpSubmit : handleSubmit)} className="space-y-6 form-input">
          {/* Email Input */}
          {!otpSent && (
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
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="inp block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                />
              </div>
            </div>
          )}

          {/* OTP Input */}
          {otpSent && !otpVerified && (
            <div>
              <label
                htmlFor="otp"
                className="block text-lg font-medium leading-6 text-gray-900"
              >
                Enter OTP
              </label>
              <div className="mt-2 form-input">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="inp block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                />
              </div>
            </div>
          )}

          {/* Password Reset Form */}
          {otpVerified && (
            <div>
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  New Password
                </label>
                <div className="mt-2 form-input">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="inp block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2 form-input">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="inp block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {otpVerified ? 'Reset Password' : (otpSent ? 'Verify OTP' : 'Send OTP')}
            </button>
          </div>

          {message && <p className="text-green-600">{message}</p>}
          {error && <p className="text-red-600">{error}</p>}
        </form>

        <p className="mt-10 text-center text-lg text-gray-500">
          Not a member?{" "}
          <Link
            to="../register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
