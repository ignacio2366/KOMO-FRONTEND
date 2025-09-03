interface SubmitButtonProps {
  label: string;
  classname?: string;
  style?: React.CSSProperties;
  onClick: () => void;
}

export const SubmitButton = ({
  label,
  classname,
  onClick,
  style,
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      style={style}
      className={` ${classname || "btn-submit"}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
