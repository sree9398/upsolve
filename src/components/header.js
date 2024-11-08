"use client";
import "../css/App.css";
import { useContext, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function Header() {
  const { isAuthenticated, handleLogout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogoutClick = () => {
    handleLogout(); // Call handleLogout from context
    setMobileMenuOpen(false); // Close the mobile menu
  };

  return (
    <div className="header">
      <header className="bg-neutral-200 header bg-indigo-400">
        <nav
          aria-label="Global"
          className="mx-auto bg-indigo-20 flex max-w-7xl items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <h1 className="text-lg font-semibold leading-6 text-gray-900">
              Upsolve
            </h1>
            <Link to="/" className="-m-1.5 p-1.5 tooltip-image-container">
              <span className="hidden-text">Upsolver</span>
              <img
                alt="Logo"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-lg font-semibold leading-6 text-gray-900">
                <Link
                  to="/"
                  className="text-lg font-semibold leading-6 text-gray-900"
                >
                  Home
                </Link>
              </PopoverButton>
            </Popover>
            <Link
              to="profile"
              className="text-lg font-semibold leading-6 text-gray-900"
            >
              Profile
            </Link>
            <Link
              to="blogs"
              className="text-lg font-semibold leading-6 text-gray-900"
            >
              Blogs
            </Link>
            <Link
              to="lists"
              className="text-lg font-semibold leading-6 text-gray-900"
            >
              Lists
            </Link>
            <Link
              to="resources"
              className="text-lg font-semibold leading-6 text-gray-900"
            >
              Resources
            </Link>
            <Link
              to="streams"
              className="text-lg font-semibold leading-6 text-gray-900"
            >
              Streams
            </Link>

            <Link
              to="contact"
              className="text-lg font-semibold leading-6 text-gray-900"
            >
              Contact
            </Link>
          </PopoverGroup>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {isAuthenticated ? (
              <button
                onClick={handleLogoutClick}
                className="text-lg font-semibold leading-6 text-gray-900"
              >
                Log Out <span aria-hidden="true">&rarr;</span>
              </button>
            ) : (
              <Link
                to="login"
                className="text-lg font-semibold leading-6 text-gray-900"
              >
                Log In <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile menu */}
        <Dialog
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-10" />
          <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Upsolve</span>
                <img
                  alt="Logo"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-8 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-4 py-6 flex flex-col">
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-semibold leading-6 text-gray-900"
                  >
                    Home
                  </Link>
                  <Link
                    to="profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-semibold leading-6 text-gray-900"
                  >
                    Profile
                  </Link>
                  <Link
                    to="blogs"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-semibold leading-6 text-gray-900"
                  >
                    Blogs
                  </Link>
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to="lists"
                    className="text-lg font-semibold leading-6 text-gray-900"
                  >
                    Lists
                  </Link>
                  <Link
                    to="resources"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-semibold leading-6 text-gray-900"
                  >
                    Resources
                  </Link>
                  <Link
                    to="streams"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-semibold leading-6 text-gray-900"
                  >
                    Streams
                  </Link>

                  <Link
                    to="contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-semibold leading-8 text-gray-900"
                  >
                    Contact
                  </Link>
                </div>
                <div className="py-6">
                  {isAuthenticated ? (
                    <button
                      onClick={handleLogoutClick}
                      className="text-lg font-semibold leading-6 text-gray-900"
                    >
                      Log Out <span aria-hidden="true">&rarr;</span>
                    </button>
                  ) : (
                    <Link
                      to="login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-semibold leading-6 text-gray-900"
                    >
                      Log In <span aria-hidden="true">&rarr;</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
}
