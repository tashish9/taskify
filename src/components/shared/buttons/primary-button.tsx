type Props = {
  name: string;
  type?: "button" | "submit" | "reset";
  onClick?: (...args: any[]) => any;
  additionalStyles?: string;
};

const PrimaryButton = ({ name, type, onClick, additionalStyles }: Props) => {
  return (
    <button
      className={`rounded-sm bg-teal-700 px-4 py-2 text-white ${
        additionalStyles || ""
      }`}
      onClick={onClick}
      type={type}
    >
      {name}
    </button>
  );
};

export default PrimaryButton;

// TODO replace colors with theme colors once u have one
