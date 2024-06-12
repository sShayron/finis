import { AxiosInstance } from "axios";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSession } from "./SessionVaultProvider";
import { client } from "@client";
import { useAuth } from "./AuthProvider";

type Bank = {
  id: string;
  userId: string;
  code: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const ClientContext = createContext<{
  client: AxiosInstance | null;
  banks: Bank[];
}>({
  client: null,
  banks: [],
});

export const ClientProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const session = useSession();
  const { logout } = useAuth();
  const [banks, setBanks] = useState<Bank[]>([]);

  const loadBanks = async () => {
    const { data } = await client.get("/bank");
    setBanks(data);
  };

  useEffect(() => {
    if (session.session?.accessToken) {
      client?.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${session.session?.accessToken}`;
        return config;
      });

      loadBanks();
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
    <ClientContext.Provider value={{ client, banks }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => useContext(ClientContext);
