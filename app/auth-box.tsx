"use client";

import { AppwriteService } from "../lib/appwrite";

export default function AuthBox() {
  async function login() {
    try {
      await fetch("/api/auth", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({}), // You could send email and password here
      });

      alert("Done. Fetch status, or refresh website.");
    } catch (err) {
      console.error(err);
      alert("Whoops! Check console logs.");
    }
  }

  async function logout() {
    try {
      await AppwriteService.deleteSession();
      alert("Done. Fetch status, or refresh website.");
    } catch (err) {
      console.error(err);
      alert("Whoops! Check console logs.");
    }
  }

  return (
    <div
      id="alert-additional-content-5"
      className="p-4 mt-6 border border-gray-300 rounded-lg bg-gray-50 dark:border-gray-600 dark:bg-gray-700"
      role="alert"
    >
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 mr-2 text-gray-700 dark:text-gray-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
          />
        </svg>

        <span className="sr-only">Info</span>
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Not Authorized?
        </h3>
      </div>
      <div className="mt-2 mb-4 text-sm text-left text-gray-700 dark:text-gray-300">
        Lets make an account with 1 click! This will create anonymous session.
      </div>
      <div className="flex">
        <button
          onClick={() => login()}
          type="button"
          className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="-ml-0.5 mr-2 h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
          Sign In
        </button>

        <button
          onClick={() => logout()}
          type="button"
          className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="-ml-0.5 mr-2 h-4 w-4 transform rotate-180"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
          Sign Out
        </button>
      </div>
    </div>
  );
}
