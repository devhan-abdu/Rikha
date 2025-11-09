import { OrderData } from "@/interface";
import api from "@/lib/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: OrderData): Promise<string> => {
            const res = await api.post('/order', data);
            return res.data.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-orders"] });
        },
        onError: (error) => {
            console.log(error)
            toast.error("Failed to create order");
        }
    })
}

export const useRemove = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (orderId: number) => {
            const res = await api.delete(`/remove/${orderId}`)
            return res.data.success
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-orders"] })
            toast.success("Order removed")
        },
        onError: (error) => {
            console.log(error, "from the review")
            toast.error("Failed to remove the order");
        }
    })
}
export const useUpdateOrder = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (orderId: number) => {
            const res = await api.patch(`/cancel/${orderId}`)
            return res.data.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-orders"] })
            toast.success("Order cancelled")
        },
        onError: (error) => {
            console.log(error)
            toast.error("Failed to cancel order status");
        }
    })
}