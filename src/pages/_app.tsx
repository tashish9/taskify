import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import NavBar from "../components/layout/header/nav-bar";
import { useAuthStore } from "../utils/store";
import { QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const setIsUserLoggedIn = useAuthStore((state) => state.setIsUserLoggedIn);

  useEffect(() => {
    setIsUserLoggedIn(!!localStorage.getItem("token"));
  }, []);

  return (
    <div className="min-h-screen">
      <Head>
        <link rel="icon" href="/people.png" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <NavBar />
        <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  );
}
