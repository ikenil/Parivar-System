import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "@shared/schema";

export type UserRole = "super-admin" | "admin" | "member";
export type Language = "en" | "gu";

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  userRole: UserRole;
  language: Language;
  setLanguage: (lang: Language) => void;
  currentSection: string;
  setCurrentSection: (section: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<Language>("en");
  const [currentSection, setCurrentSection] = useState("dashboard");

  const logout = () => {
    setUser(null);
    setCurrentSection("dashboard");
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        userRole: (user?.role as UserRole) || "member",
        language,
        setLanguage,
        currentSection,
        setCurrentSection,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
