import { useState } from "react";
import { AppwriteService, APPWRITE_PROJECT_ID } from "../lib/appwrite";
import { cookies } from 'next/headers';

async function getData() {
  const sessionNames = [
    'a_session_' + APPWRITE_PROJECT_ID.toLowerCase(),
    'a_session_' + APPWRITE_PROJECT_ID.toLowerCase() + '_legacy',
  ];

  const c = cookies();

  let hash = c.get(sessionNames[0]) ?? c.get(sessionNames[1]) ?? '';

  AppwriteService.setSession(hash);

  let account: any;
  try {
    account = await AppwriteService.getAccount();
  } catch(err) {
    console.error(err);
  }

  console.log(account);

  const serverAccount = account ? {
    color: "text-green-500", text: "Signed in as " + account.$id
  } : {
    color: "text-red-500", text: "You are not signed in."
  }

  return {
    ...serverAccount
  };
}

export default async function Home() {
  const serverAccount = await getData();

  const [clientAccount, setClientAccount] = useState({ color: "text-orange-500", text: "Not fetched yet." });

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

  async function getAccount() {
    setClientAccount({ color: "text-blue-500", text: "Fetching ..." });

    try {
      const account = await AppwriteService.getAccount();
      console.log(account);
      setClientAccount({ color: "text-green-500", text: "Signed in as " + account.$id });
    } catch (err) {
      console.error(err);
      setClientAccount({ color: "text-red-500", text: "You are not signed in." });
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-12">
        <a
          href="#"
          className="inline-flex items-center justify-between px-1 py-1 pr-4 text-sm text-gray-700 bg-gray-100 rounded-full mb-7 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          role="alert"
        >
          <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">
            Wrong framework?
          </span>
          <span className="text-sm font-medium">Check out SSR with others</span>
          <svg
            className="w-5 h-5 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Appwrite Loves Next.js!
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          This is a demo application. You can see authorized requests working
          both on client side, and during pre-render. The whole process uses
          secure cookies, so this will only work if the appwrite server is a
          subdomain of your frontend app.
        </p>
        <div className="flex flex-col mb-12 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a
            href="https://github.com/Meldiron/appwrite-next-ssr"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>GitHub</title>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            View on GitHub
          </a>
        </div>
        <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
          <span className="font-semibold text-gray-400 uppercase">
            SEE IT IN ACTION:
          </span>

          <div className="grid gap-8 mt-10 lg:grid-cols-2">
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
                      d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z"
                    />
                  </svg>
                  Server Side
                </span>
                <span className="text-sm">SSR</span>
              </div>
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-left text-gray-900 dark:text-white">
                <svg
                  className={"inline-block mr-2 " + serverAccount.color}

                  width="20"
                  height="20"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="4" cy="4" r="4" fill="currentColor"></circle>
                </svg>
                {serverAccount.text}
              </h2>

              <div className="mt-6">
                <button
                  type="button"
                  disabled={true}
                  className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Already Fetched
                </button>
              </div>
            </article>

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
          </div>

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
              Lets make an account with 1 click! This will create anonymous
              session.
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
        </div>
      </div>
    </section>
  );
}
