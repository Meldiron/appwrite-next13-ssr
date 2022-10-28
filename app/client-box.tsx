"use client";

import { useState } from "react";
import { AppwriteService } from "../lib/appwrite";

export default function ClientBox() {
  const [clientAccount, setClientAccount] = useState({
    color: "text-orange-500",
    text: "Not fetched yet.",
  });

  async function getAccount() {
    setClientAccount({ color: "text-blue-500", text: "Fetching ..." });

    try {
      const account = await AppwriteService.getAccount();
      console.log(account);
      setClientAccount({
        color: "text-green-500",
        text: "Signed in as " + account.$id,
      });
    } catch (err) {
      console.error(err);
      setClientAccount({
        color: "text-red-500",
        text: "You are not signed in.",
      });
    }
  }

  return (
    <article className="p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-5 text-gray-500">
        <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-1.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-3 h-3 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          Client Side
        </span>
        <span className="text-sm">CSR</span>
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-left text-gray-900 dark:text-white">
        <svg
          className={"inline-block mr-2 " + clientAccount.color}
          width="20"
          height="20"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="4" cy="4" r="4" fill="currentColor"></circle>
        </svg>
        {clientAccount.text}
      </h2>

      <div className="mt-6">
        <button
          onClick={() => getAccount()}
          type="button"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Fetch
        </button>
      </div>
    </article>
  );
}
