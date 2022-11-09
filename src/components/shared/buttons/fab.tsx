import { HiOutlinePlusSm } from "react-icons/hi";

type Props = {
  onClick: () => void;
};

const FAB = ({ onClick }: Props) => {
  return (
    <button
      className="fixed bottom-8 right-8 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-teal-700"
      onClick={onClick}
    >
      <HiOutlinePlusSm className="text-3xl text-white" />
    </button>
  );
};

export default FAB;
