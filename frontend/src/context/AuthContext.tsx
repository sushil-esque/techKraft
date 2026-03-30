import { getMe } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@/types";
import {
  createContext,
  useContext,
  type PropsWithChildren,
} from "react";


interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {

  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user: user || null, isLoading, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
