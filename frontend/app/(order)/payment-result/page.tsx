'use client';

import React from 'react';
import { motion } from "framer-motion";
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const PaymentPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="py-10 px-16 flex flex-col items-center justify-center shadow-xl rounded-xl border border-gray-200 max-w-lg mx-auto text-center bg-white"
      >
        <CheckCircle className="text-green-500 w-12 h-12" />

        <h1 className="font-bold text-2xl mt-4">Thank you for your order!</h1>
        <p className="mt-2 text-gray-600">We will confirm your payment shortly.</p>

        <div className="flex gap-3 mt-6">
          <Button
            className="text-white bg-primary hover:scale-105 transition-all duration-300 "
            onClick={() => router.push("/account/orders")}
          >
            Go to Orders
          </Button>

          <Button
            variant="outline"
            onClick={() => router.push("/categories")}
          >
            Continue Shopping
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentPage;
