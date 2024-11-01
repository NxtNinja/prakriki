import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto_Mono } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
    <QueryClientProvider client={queryClient}>
      <main className={`${robotomono.className}`}>
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
}
