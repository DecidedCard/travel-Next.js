import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextUIProvider } from "@nextui-org/react";

const queryClient = new QueryClient();

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>{children}</NextUIProvider>
    </QueryClientProvider>
  );
};

export default Provider;
