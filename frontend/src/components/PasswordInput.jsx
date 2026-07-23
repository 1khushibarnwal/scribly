import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const PasswordInput = ({
  value,
  onChange,
  placeholder,
  className = "",
  ...props
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        className={`input input-bordered w-full pr-10 ${className}`}
        value={value}
        onChange={onChange}
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
        tabIndex={-1}
      >
        {visible ? (
          <EyeOffIcon className="size-4" />
        ) : (
          <EyeIcon className="size-4" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
