import "./button.css"

// Define props for the component
interface ButtonProps {
    label?: string; // Label for the button (default is "Submit")
    size?: "small" | "large"; // Size of the button
    disabled?: boolean; // Whether the button is disabled
    onClick?: () => void; // Click handler
  }
  
  // Reusable button component
  const Button = ({
    label = "Submit",
    size,
    disabled = false,
    onClick,
  }: ButtonProps) => {
    // Determine the Bootstrap class for size
    const sizeClass = size === "small" ? "btn-sm" : size === "large" ? "btn-lg" : "";
  
    return (
      <button
        type="button"
        className={`btn custom-button ${sizeClass}`} // Combine base and size classes
        disabled={disabled}
        onClick={onClick}
      >
        {label}
      </button>
    );
  };
  
  export default Button;
  
