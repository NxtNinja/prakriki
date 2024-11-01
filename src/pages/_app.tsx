import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto_Mono } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";

const robotomono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["500"],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Prakriti</title>
        <link rel="icon" href="/favicon.ico" />
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Prakriti" />
        <meta
          property="og:description"
          content="Get accurate and real-time weather forecasts and updates."
        />
        <meta property="og:image" content="/favicon.ico" />{" "}
        {/* Replace with your app's image URL */}
        <meta property="og:url" content="https://prakriti.netlify.app" />
        <meta property="og:type" content="website" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <main className={`${robotomono.className}`}>
          <Component {...pageProps} />
        </main>
      </QueryClientProvider>
    </>
  );
}
