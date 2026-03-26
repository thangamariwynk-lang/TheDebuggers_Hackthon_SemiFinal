import React, { createContext, useContext, useState } from "react";

type Page = "login" | "signup" | "home" | "calls";
type CallType = "all" | "genuine" | "fake";

interface User {
  username: string;
  email: string;
}

interface AppContextType {
  user: User | null;
  theme: "light" | "dark";
  selectedCallType: CallType;

  login: (user: User) => void;
  signup: (user: User) => void;
  logout: () => void;

  toggleTheme: () => void;
  setCallType: (type: CallType) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [selectedCallType, setSelectedCallType] = useState<CallType>("all");

  const login = (userData: User) => setUser(userData);
  const signup = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <AppContext.Provider
      value={{
        user,
        theme,
        selectedCallType,
        login,
        signup,
        logout,
        toggleTheme,
        setCallType: setSelectedCallType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext)!;