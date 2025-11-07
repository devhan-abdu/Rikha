import { AppError } from "./AppError";
import dotenv from "dotenv"
dotenv.config();

export const createTransaction = async (tx_ref: string, amount: number, orderId: number): Promise<string | null> => {
    try {
        const response = await fetch("https://api.chapa.co/v1/transaction/initialize", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.CHAPA_SECRET_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount,
                currency: "ETB",
                orderId: orderId,
                tx_ref,
                "callback_url": `${process.env.BACKEND_URL}/api/verify-payment/${tx_ref}`,
                "return_url": `${process.env.FRONTEND_URL}/order-status?tx_ref=${tx_ref}`,
                customization: {
                    title: "Rikha",
                    description: `Payment`,
                },
            })
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new AppError(`Payment gateway failed to initialize transaction. Status: ${response.status}. Body: ${errorBody}`);
        }

        const data = await response.json();

        if (data.status === 'failed') {
            throw new AppError(`Payment gateway rejected transaction: ${data.message}`);
        }
        if (!data.data || !data.data.checkout_url) {
            throw new AppError("Payment gateway response was successful but missing redirect URL.");
        }

        return data.data.checkout_url

    } catch (error: any) {
        throw new AppError(`An unexpected error occurred during payment initialization.${error}`);
    }
}



const CHAPA_API_BASE = "https://api.chapa.co/v1";
const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY!;


export const chapaRefund = async (tx_ref: string) => {
    if (!tx_ref) throw new AppError("Transaction reference is required", 400);

    try {
        const response = await fetch(`${CHAPA_API_BASE}/transaction/refund`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tx_ref }),
        });

        const data = await response.json();

        if (!response.ok || data.status !== "success") {
            throw new AppError(data.message || "Refund failed", response.status);
        }

        console.log("Chapa refund response:", data);

        return {
            status: "success",
            message: data.message,
            data: data.data,
        };
    } catch (err: any) {
        console.error("Refund error:", err.message || err);
        throw new AppError(err.message || "Chapa refund request failed", 500);
    }
};
