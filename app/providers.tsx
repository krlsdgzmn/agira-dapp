"use client";

import { Toaster } from "@/components/ui/toaster";
import { authSubscribe, initSatellite, type User } from "@junobuild/core-peer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { createContext, useEffect, useState, type ReactNode } from "react";

export const AuthContext = createContext<{ user: User | undefined | null }>({
  user: undefined,
});

interface AuthProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<User | undefined | null>(undefined);

  useEffect(() => {
    const sub = authSubscribe((user) => setUser(user));

    return () => sub();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children} </AuthContext.Provider>
  );
};

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    (async () =>
      await initSatellite({
        satelliteId: "mdw7w-piaaa-aaaal-ajoma-cai",
      }))();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
