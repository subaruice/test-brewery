import { ButtonHTMLAttributes, FC } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<Props> = ({ children, type = "button", ...args }) => {
    return (
        <button
            type={type}
            {...args}
            className="fixed right-10 bottom-10 cursor-pointer hover:bg-red-600 px-10 rounded py-2 bg-red-500 text-white font-medium border border-white/50"
        >
            {children}
        </button>
    );
};

export default Button;
