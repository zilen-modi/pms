"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, type ReactNode } from "react";

interface QueryClientWrapperProps {
  children: ReactNode;
}

interface ErrorWithStatus {
  status?: number;
}

export function QueryClientWrapper({ children }: QueryClientWrapperProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1000 * 60 * 5,
            staleTime: 1000 * 60 * 1,
            retry: (failureCount, error) => {
              const status = (error as ErrorWithStatus)?.status;
              if (status && status >= 400 && status < 500) {
                return false;
              }
              return failureCount < 3;
            },
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 30000),
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
          },
          mutations: {
            retry: (failureCount, error) => {
              const status = (error as ErrorWithStatus)?.status;
              if (status && status >= 400 && status < 500) {
                return false;
              }
              return failureCount < 2;
            },
            onError: (error) => {
              console.error("Mutation error:", error);
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
