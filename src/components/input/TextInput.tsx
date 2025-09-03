import type { HTMLInputTypeAttribute } from "react";

interface Props {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  classname?: string;
  style?: React.CSSProperties;
  type: HTMLInputTypeAttribute;
  isdisabled?: boolean | undefined;
  value: string;
  required?: boolean | undefined;
  error?: string | undefined;
}

export const TextInput = ({
  placeholder,
  onChange,
  name,
  classname,
  style,
  type,
  isdisabled,
  value,
  required,
  error,
}: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
      }}
    >
      <label htmlFor={name} className="lbl-input">
        {name}
      </label>
      <input
        className={classname || "input"}
        style={style}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={isdisabled ? true : false}
        required={required}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};
