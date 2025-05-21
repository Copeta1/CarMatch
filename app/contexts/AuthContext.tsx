import { account } from "@/lib/appwrite";
import { router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  isLoading: true,
  login: async (email: string, password: string) => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      await account.get();
      setIsLoggedIn(true);
      router.replace("/(tabs)");
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      try {
        await account.deleteSessions();
      } catch (error) {
        console.log("No active session to delete");
      }
      await account.createEmailPasswordSession(email, password);
      setIsLoggedIn(true);
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Login faild:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setIsLoggedIn(false);
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
