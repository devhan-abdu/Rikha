import { AppError } from "./AppError";

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
                tx_ref,
                "callback_url": "http://localhost:5000/api/verify-transaction",
                "return_url": "http://localhost:3000/payment-success",
                customization: {
                    title: "Rikha",
                    description: `Payment for ${tx_ref}`,
                    order_id: orderId,
                },
            })
        });

        if (!response.ok) {
            throw new AppError(`Payment gateway failed to initialize transaction. Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'failed') {
            throw new AppError(`Payment gateway rejected transaction: ${data.message}`);
        }
        if (!data.data || !data.data.checkout_url) {
            throw new AppError("Payment gateway response was successful but missing redirect URL.");
        }

        return data.data.checkout_url

    } catch (error) {
        throw new AppError("An unexpected error occurred during payment initialization.");
    }
}