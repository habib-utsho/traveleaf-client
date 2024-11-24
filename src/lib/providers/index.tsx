"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import UserContextProvider from "@/context/user.provider";

interface ProvidersProps {
  children: React.ReactNode;
}
export function Providers({ children }: ProvidersProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <UserContextProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#00ABE4",
          },
          components: {
            Button: {
              colorPrimary: "#00ABE4",
              fontWeight: "bold",
            },
            Checkbox: {
              colorPrimary: "#00ABE4",
            },
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ConfigProvider>
    </UserContextProvider>
  );
}
