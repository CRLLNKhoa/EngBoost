import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  title: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  type?: "default" | "outline"|"delete";
  disabled?: boolean;
};

function Button({
  title,
  onClick,
  icon,
  type = "default",
  disabled = false,
}: Props) {
  return (
    <button onClick={onClick} disabled={disabled}
      className={cn(
        "btn flex items-center",
        type === "outline" && "btn-outline" ,
        type === "delete" && "btn-delete",
        type === "default" && "btn-primary",
        disabled && "btn-disabled"
      )}
    >
      {icon} <p className="ml-2">{title}</p>
    </button>
  );
}

export default Button;
