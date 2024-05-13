import { PropsWithChildren, createContext, useState, useContext } from "react";
import { useSession } from "./SessionVaultProvider";
import { AuthResult } from "@types";
import { AuthService } from "@services";

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  login: (body: {
    email: string;
    password: string;
  }) => Promise<AuthResult | undefined>;
  logout: () => Promise<void>;
}>({
  isAuthenticated: false,
  login: () => {
    throw new Error("Method not implemented.");
  },
  logout: () => {
    throw new Error("Method not implemented.");
  },
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { clearSession, setSession } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const saveAuthResult = async (
    authResult: AuthResult | null
  ): Promise<void> => {
    if (authResult) {
      await setSession(authResult);
      setIsAuthenticated(true);
    } else {
      await clearSession();
      setIsAuthenticated(false);
    }
  };

  const login = async (body: { email: string; password: string }) => {
    try {
      const { data } = await AuthService.signIn(body);
      if (data) {
        await saveAuthResult(data);
      }
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const logout = async (): Promise<void> => {
    console.error("Method not implemented");
  };

  return (
    <AuthContext.Provider value={{ login, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
