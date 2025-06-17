import React from "react";

export interface ChipProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
  onRemove?: () => void;
  onClick?: () => void;
  className?: string;
  removable?: boolean;
  clickable?: boolean;
}

export function Chip({
  children,
  variant = "default",
  size = "md",
  onRemove,
  onClick,
  className = "",
  removable = false,
  clickable = false,
}: ChipProps) {
  const baseClasses =
    "inline-flex items-center font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    default: "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500",
    primary: "bg-blue-100 text-blue-900 hover:bg-blue-200 focus:ring-blue-500",
    secondary:
      "bg-purple-100 text-purple-900 hover:bg-purple-200 focus:ring-purple-500",
    success:
      "bg-green-100 text-green-900 hover:bg-green-200 focus:ring-green-500",
    warning:
      "bg-yellow-100 text-yellow-900 hover:bg-yellow-200 focus:ring-yellow-500",
    danger: "bg-red-100 text-red-900 hover:bg-red-200 focus:ring-red-500",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs rounded-sm",
    md: "px-3 py-1 text-sm rounded-md",
    lg: "px-4 py-1.5 text-base rounded-lg",
  };

  const interactiveClasses = clickable || onClick ? "cursor-pointer" : "";
  const chipClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${interactiveClasses} ${className}`;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    }
  };

  const removeIconSize =
    size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-4 h-4";

  const ChipElement = clickable || onClick ? "button" : "span";

  return (
    <ChipElement
      className={chipClasses}
      onClick={handleClick}
      type={ChipElement === "button" ? "button" : undefined}
    >
      <span className="truncate">{children}</span>

      {(removable || onRemove) && (
        <button
          type="button"
          onClick={handleRemove}
          className="ml-1.5 -mr-1 flex-shrink-0 rounded-sm p-0.5"
        >
          <svg
            className={removeIconSize}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </ChipElement>
  );
}
