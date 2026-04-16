type ButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className: string;
  type: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  children: React.ReactNode;
};

function Button({ onClick, type, className, children }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={
        "text:sm cursor-pointer rounded-sm border-0 text-white transition-all duration-300 ease-in-out active:scale-90 md:text-base " +
        className
      }
    >
      {children}
    </button>
  );
}

export default Button;
