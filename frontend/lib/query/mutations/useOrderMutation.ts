import { OrderData } from "@/interface";
import api from "@/lib/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
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
        onError: (err) => {
            const error = err as AxiosError<{ success: boolean, message: string }>
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(`${message}`);
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
        onError: (err) => {
            const error = err as AxiosError<{ success: boolean, message: string }>
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(`${message}`);
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
        onError: (err) => {
            const error = err as AxiosError<{ success: boolean, message: string }>
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(`${message}`);
        }
    })
}