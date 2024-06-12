import { PropsWithChildren, createContext, useState, useContext } from "react";
import { useSession } from "./SessionVaultProvider";
import { AuthResult } from "@types";
import { AuthService } from "@services";
import { useIonRouter } from "@ionic/react";

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  login: (body: {
    email: string;
    password: string;
  }) => Promise<AuthResult | undefined>;
  logout: () => Promise<void>;
  checkAuthentication: () => boolean;
}>({
  isAuthenticated: false,
  login: () => {
    throw new Error("Method not implemented.");
  },
  logout: () => {
    throw new Error("Method not implemented.");
  },
  checkAuthentication: () => {
    throw new Error("Method not implemented.");
  },
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useIonRouter();
  const { clearSession, setSession } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkAuthentication = () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const authResult: AuthResult = JSON.parse(auth);
      setIsAuthenticated(true);
      setSession(authResult);
      return true;
    }
    return false;
  };

  const saveAuthResult = async (
    authResult: AuthResult | null
  ): Promise<void> => {
    if (authResult) {
      localStorage.setItem("auth", JSON.stringify(authResult));
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
      await saveAuthResult(data);
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const logout = async (): Promise<void> => {
    localStorage.setItem("auth", "");
    await clearSession();
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ login, isAuthenticated, logout, checkAuthentication }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
