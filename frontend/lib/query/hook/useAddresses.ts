import { Order, ShippingData } from "@/interface";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useAddresses = () => {
    return useQuery<ShippingData[]>({
        queryKey: ["addresses"],
        queryFn: async () => {
            const res = await api.get('/addresses');
             return res.data.data
        }
    })
} 

export const useDefaultAddress = () => {
    return useQuery({
        queryKey:["defaultAddress"],
        queryFn: async () => {
            const res = await api.get("/address/default");
            return res.data.data
        }
    })
}

export const useOrder = () => {
    return useQuery({
        queryKey:["my-orders"],
        queryFn: async (): Promise<Order[]> => {
            const res = await api.get("/my-orders");
            return  res.data.data
        }
    })
}