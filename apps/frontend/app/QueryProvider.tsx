"use client";

import {
  environmentManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

function newQueryClient(): QueryClient {
  return new QueryClient();
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient(): QueryClient {
  if (environmentManager.isServer()) {
    return newQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = newQueryClient();
    return browserQueryClient;
  }
}

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
