import api from "./api";

export const startOrderPolling = (txRef: string): Promise<{ status: "success" | "failed" | "error" | "pending", orderId: number | null }> => {
    const POLL_INTERVAL = 2000;
    const MAX_ATTEMPTS = 15;

    let attempts = 0;

    return new Promise((resolve) => {
        const intervalId = setInterval(async () => {
            attempts++;

            if (attempts > MAX_ATTEMPTS) {
                clearInterval(intervalId);
                return resolve({ status: "error", orderId: null });
            }

            try {
                const response = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/order/status?tx_ref=${txRef}`)
                const order = response.data.order;
                console.log(order, order, order)

                if (order.paymentStatus === "COMPLETED") {
                    clearInterval(intervalId);
                    return resolve({ status: "success", orderId: order.id });
                } else if (order.paymentStatus === "FAILED") {
                    clearInterval(intervalId);
                    return resolve({ status: "failed", orderId: order.id });
                }
                else if (order.paymentStatus === "PENDING") {
                    clearInterval(intervalId);
                    return resolve({ status: "pending", orderId: order.id });
                }
            } catch (error) {
                console.log(error)
                clearInterval(intervalId)
                return resolve({ status: "error", orderId: null });
            }
        }, POLL_INTERVAL)
    });
}