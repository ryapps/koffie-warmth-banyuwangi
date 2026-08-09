import React from "react";

interface StatusBadgeProps {
  status: string;
  variant?: "success" | "warning" | "danger" | "info" | "pending";
}

const variantMap = {
  success: "bg-green-100 text-green-800",
  warning: "bg-amber-100 text-amber-800",
  danger: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
  pending: "bg-yellow-100 text-yellow-800",
};

const statusMap: { [key: string]: "success" | "warning" | "danger" | "info" | "pending" } = {
  aktif: "success",
  active: "success",
  published: "success",
  confirmed: "success",
  draft: "info",
  pending: "pending",
  nonaktif: "danger",
  inactive: "danger",
  hidden: "danger",
  cancelled: "danger",
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  variant = statusMap[status] || "info",
}) => {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${variantMap[variant]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
