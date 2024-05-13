import { IonToast } from "@ionic/react";
import { PropsWithChildren, createContext, useContext, useState } from "react";

const ToastContext = createContext<{
  show: (msg: string, color: HTMLIonToastElement["color"]) => void;
}>({ show: () => console.log("Not implemented") });

export const ToastProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("Usuário ou senha inválidos");
  const [toastColor, setToastColor] =
    useState<HTMLIonToastElement["color"]>("danger");

  const show = (msg: string, color: HTMLIonToastElement["color"]) => {
    setToastColor(color);
    setMsg(msg);
    setIsOpen(true);
  };

  return (
    <ToastContext.Provider value={{ show }}>
      <>
        <IonToast
          position="top"
          isOpen={isOpen}
          message={msg}
          duration={5000}
          color={toastColor}
          onDidDismiss={() => setIsOpen(false)}
        />
        {children}
      </>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
