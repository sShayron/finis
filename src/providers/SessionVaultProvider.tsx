import { AuthResult } from "@types";
import { PropsWithChildren, createContext, useContext } from "react";

export const SessionVaultContext = createContext<{
  clearSession: () => Promise<void>;
  getSession: () => Promise<AuthResult | null>;
  setSession: (value?: AuthResult) => Promise<void>;
}>({
  clearSession: () => {
    throw new Error("Method not implemented.");
  },
  getSession: () => {
    throw new Error("Method not implemented.");
  },
  setSession: () => {
    throw new Error("Method not implemented.");
  },
});

export const SessionVaultProviqder: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const clearSession = (): Promise<void> => {
    return Promise.resolve();
  };

  const getSession = (): Promise<AuthResult | null> => {
    return Promise.resolve(null);
  };

  const setSession = (value?: AuthResult): Promise<void> => {
    return Promise.resolve();
  };

  return (
    <SessionVaultContext.Provider
      value={{ clearSession, getSession, setSession }}
    >
      {children}
    </SessionVaultContext.Provider>
  );
};

export const useSession = () => useContext(SessionVaultContext);
