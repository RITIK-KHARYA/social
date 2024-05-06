import clsx from "clsx";
export default function Button({ children, onClick,className,...props}: any) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "bg-[#1CBF73] text-white font-bold py-2 px-6 rounded-md shadow-md drop-shadow-md ",
        className
      )}
    >
      {children}
    </button>
  );
}