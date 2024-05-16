import { IonIcon, IonInput, IonText } from "@ionic/react";
import "./styles.css";
import { useFormContext } from "react-hook-form";

export const InputWithIcon = ({
  icon,
  placeholder,
  name,
  type = "text",
}: {
  icon: string;
  placeholder: string;
  name: string;
  type?: HTMLIonInputElement["type"];
}) => {
  const {
    register,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <div className="input-with-icon w-100">
      <IonInput
        type={type}
        className={`finis-input ${error ? "is-invalid" : ""}`}
        placeholder={placeholder}
        fill="solid"
        onFocus={() => {
          clearErrors(name);
        }}
        {...register(name)}
      />
      <div className="icon-wrap">
        <IonIcon color={error ? "danger" : "#00000080"} icon={icon}></IonIcon>
      </div>
      {error && (
        <div className="finis-error">
          <IonText color="danger">{error?.message as string}</IonText>
        </div>
      )}
    </div>
  );
};
