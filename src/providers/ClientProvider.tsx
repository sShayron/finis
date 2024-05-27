import { AxiosInstance } from "axios";
import { PropsWithChildren, createContext, useContext, useEffect } from "react";
import { useSession } from "./SessionVaultProvider";
import { client } from "@client";
import { useAuth } from "./AuthProvider";

const ClientContext = createContext<{ client: AxiosInstance | null }>({
  client: null,
});

export const ClientProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const session = useSession();
  const { logout } = useAuth();

  useEffect(() => {
    if (session.session?.accessToken) {
      client?.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${session.session?.accessToken}`;
        return config;
      });
    }
  }, [session.session]);

  useEffect(() => {
    client.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response?.status === 401) {
          logout();
        }
      }
    );
  }, []);

  return (
    <ClientContext.Provider value={{ client }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => useContext(ClientContext);
