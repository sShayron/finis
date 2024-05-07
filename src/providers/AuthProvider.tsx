import {
  Auth0Provider,
  AuthConnect,
  AuthResult,
  ProviderOptions,
  TokenType,
} from "@ionic-enterprise/auth";
import { isPlatform } from "@ionic/react";
import {
  PropsWithChildren,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { useSession } from "./SessionVaultProvider";

const isNative = isPlatform("hybrid");

const provider = new Auth0Provider();

const options: ProviderOptions = {
  clientId: "H89xegjvrcUqO1KNDGQ9bus4Ny6EGNkl",
  discoveryUrl:
    "https://dev-awafifu0rws1gfy2.us.auth0.com/.well-known/openid-configuration",
  scope: "openid offline_access email picture profile",
  audience: "",
  logoutUrl: isNative ? "msauth://login" : "http://localhost:8100/login",
  redirectUri: isNative ? "msauth://login" : "http://localhost:8100/login",
};

const setupAuthConnect = async (): Promise<void> => {
  return AuthConnect.setup({
    platform: isNative ? "capacitor" : "web",
    logLevel: "DEBUG",
    ios: { webView: "private" },
    web: { uiMode: "popup", authFlow: "implicit" },
  });
};

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<string | undefined>;
}>({
  isAuthenticated: false,
  login: () => {
    throw new Error("Method not implemented.");
  },
  logout: () => {
    throw new Error("Method not implemented.");
  },
  getAccessToken: () => {
    throw new Error("Method not implemented.");
  },
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { clearSession, getSession, setSession } = useSession();
  const [isSetup, setIsSetup] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const refreshAuth = async (
    authResult: AuthResult
  ): Promise<AuthResult | null> => {
    let newAuthResult: AuthResult | null = null;

    if (await AuthConnect.isRefreshTokenAvailable(authResult)) {
      try {
        newAuthResult = await AuthConnect.refreshSession(provider, authResult);
      } catch (err) {
        console.log("Error refreshing session.", err);
      }
    }

    return newAuthResult;
  };

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

  const getAuthResult = async (): Promise<AuthResult | null> => {
    let authResult = await getSession();

    if (authResult && (await AuthConnect.isAccessTokenExpired(authResult))) {
      const newAuthResult = await refreshAuth(authResult);
      saveAuthResult(newAuthResult);
    }
    setIsAuthenticated(!!authResult);
    return authResult;
  };

  const login = async (): Promise<void> => {
    const authResult = await AuthConnect.login(provider, options);
    await saveAuthResult(authResult);
  };

  const logout = async (): Promise<void> => {
    const authResult = await getAuthResult();
    if (authResult) {
      await AuthConnect.logout(provider, authResult);
      await saveAuthResult(null);
    }
  };

  const getAccessToken = async (): Promise<string | undefined> => {
    const res = await getAuthResult();
    return res?.accessToken;
  };

  const getUserName = async (): Promise<string | undefined> => {
    const res = await getAuthResult();
    if (res) {
      const data = await AuthConnect.decodeToken<{ name: string }>(
        TokenType.id,
        res
      );
      return data?.name;
    }
  };

  useEffect(() => {
    setupAuthConnect().then(() => setIsSetup(true));
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, isAuthenticated, getAccessToken }}
    >
      {isSetup && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
