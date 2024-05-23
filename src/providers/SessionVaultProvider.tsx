import { AuthResult } from "@types";
import { PropsWithChildren, createContext, useContext, useState } from "react";

export const SessionVaultContext = createContext<{
  session: AuthResult | null;
  clearSession: () => Promise<void>;
  getSession: () => Promise<AuthResult | null>;
  setSession: (value?: AuthResult) => Promise<void>;
}>({
  session: null,
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

export const SessionVaultProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [session, _setSession] = useState<AuthResult | null>(null);
  const clearSession = (): Promise<void> => {
    return Promise.resolve();
  };

  const getSession = (): Promise<AuthResult | null> => {
    return Promise.resolve(null);
  };

  const setSession = (value?: AuthResult): Promise<void> => {
    _setSession(value || null);
    return Promise.resolve();
  };

  return (
    <SessionVaultContext.Provider
      value={{ clearSession, getSession, setSession, session }}
    >
      {children}
    </SessionVaultContext.Provider>
  );
};

export const useSession = () => useContext(SessionVaultContext);
