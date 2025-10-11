import { ShippingData } from "@/interface";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useAddresses = () => {
    return useQuery<ShippingData[]>({
        queryKey: ["addresses"],
        queryFn: async () => {
            const res = await api.get('/addresses');
             return res.data.addresses
        }
    })
} 

export const useDefaultAddress = () => {
    return useQuery({
        queryKey:["defaultAddress"],
        queryFn: async () => {
            const res = await api.get("/address/default");
            return res.data.address
        }
    })
}