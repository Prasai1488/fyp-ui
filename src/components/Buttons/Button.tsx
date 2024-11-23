import "./button.css";

// Define props for the component
type ButtonProps = {
  label: string;
  btnType: "submit" | "button" | "reset";
  size?: "small" | "large";
  disabled?: boolean;
  onClick?: () => void;
}

// Reusable button component
const Button = ({
  label = "Submit",
  btnType,
  size,
  disabled = false,
  onClick,
}: ButtonProps) => {
  // Determine the Bootstrap class for size
  const sizeClass =
    size === "small" ? "btn-sm" : size === "large" ? "btn-lg" : "";

  return (
    <button
      type={btnType}
      className={`btn custom-button ${sizeClass}`} // Combine base and size classes
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
