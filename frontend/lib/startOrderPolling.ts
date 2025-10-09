
export const startOrderPolling = (txRef: string): Promise<{ status: "success" | "failed" | "error", orderId: number | null }> => {
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
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/status?tx_ref=${txRef}`)
                const data = await response.json();

                if (data.status === "COMPLETED") {
                    clearInterval(intervalId);
                    return resolve({ status: "success", orderId: data.orderId });
                } else if (data.status === "FAILED") {
                    clearInterval(intervalId);
                    return resolve({ status: "failed", orderId: data.orderId });
                }
            } catch (error) {
                clearInterval(intervalId)
                return resolve({ status: "error", orderId: null });
            }
        }, POLL_INTERVAL)
    });
}