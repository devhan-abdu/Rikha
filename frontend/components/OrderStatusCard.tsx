"use client";

import React from "react";
import { Button } from "./ui/button";
import { CheckCircle, XCircle, Loader2, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface OrderStatusCardProps {
  status: "success" | "failed" | "pending" | "error";
  title: string;
  message: string;
  primaryAction?: {
    label: string;
    action: () => void;
    variant?: "default" | "outline";
  };
  secondaryAction?: {
    label: string;
    action: () => void;
    variant?: "default" | "outline";
  };
}

const icons = {
  success: <CheckCircle className="text-green-500 w-10 h-10" />,
  failed: <XCircle className="text-red-500 w-10 h-10" />,
  pending: <Loader2 className="text-yellow-500 w-10 h-10 animate-spin" />,
  error: <AlertTriangle className="text-orange-500 w-10 h-10" />,
};

const OrderStatusCard: React.FC<OrderStatusCardProps> = ({
  status,
  title,
  message,
  primaryAction,
  secondaryAction,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="p-10 flex flex-col items-center justify-center shadow-xl rounded-xl border border-gray-200 max-w-lg mx-auto text-center bg-white"
    >
      {icons[status]}
      <h1 className="font-bold text-2xl mt-4">{title}</h1>
      <p className="mt-2 text-gray-600">{message}</p>

      {(primaryAction || secondaryAction) && (
        <div className="flex gap-3 mt-6">
          {primaryAction && (
            <Button
              className="text-white"
              onClick={primaryAction.action}
            >
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="outline"
              onClick={secondaryAction.action}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default OrderStatusCard;
