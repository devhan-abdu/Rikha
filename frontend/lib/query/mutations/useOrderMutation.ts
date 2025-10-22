import { OrderData } from "@/interface";
import api from "@/lib/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: OrderData): Promise<string> => {
            const res = await api.post('/order', data);
            return res.data.url
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["order"] });
        },
        onError: (error) => {
            console.log(error)
            toast.error("Failed to create order");
        }
    })
}