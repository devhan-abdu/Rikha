import { ShippingData } from "@/interface";
import api from "@/lib/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const useCreate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: ShippingData) => {
            const res = await api.post('/address', data);
            return res.data.address
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
            queryClient.invalidateQueries({ queryKey: ["address/default"] });
        },
        onError: (err) => {
            const error = err as AxiosError<{ success: boolean, message: string }>
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(`${message}`);
        }
    })
}
export const useSetDefault = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const res = await api.patch(`/address/${id}/default`, {});
            return res.data.address
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
            queryClient.invalidateQueries({ queryKey: ["address/default"] });
        },
        onError: (err) => {
            const error = err as AxiosError<{ success: boolean, message: string }>
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(`${message}`);
        }
    })
}
export const useUpdate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: number, data: ShippingData }) => {
            const res = await api.put(`/address/${id}`, data);
            return res.data.address
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
            queryClient.invalidateQueries({ queryKey: ["address/default"] });
        },
        onError: (err) => {
            const error = err as AxiosError<{ success: boolean, message: string }>
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(`${message}`);
        }
    })
}
export const useDelete = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const res = await api.delete(`/address/${id}`);
            return res.data.address
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
            queryClient.invalidateQueries({ queryKey: ["address/default"] });
        },
        onError: (err) => {
            const error = err as AxiosError<{ success: boolean, message: string }>
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(`${message}`);
        }
    })
}



