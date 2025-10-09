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
                orderId: orderId,
                tx_ref,
                "callback_url": `http://localhost:5000/api/verify-payment/${tx_ref}`,
                "return_url": `http://localhost:3000/order-status?tx_ref=${tx_ref}`,
                customization: {
                    title: "Rikha",
                    description: `Payment for ${tx_ref}`,
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