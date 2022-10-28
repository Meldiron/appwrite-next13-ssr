import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.body.classList.add("dark");
    document.body.classList.add("bg-gray-900");
  });

  return <Component {...pageProps} />;
}
