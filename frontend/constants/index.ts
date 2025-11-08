import { NavItem } from "@/interface"
import { User, Package, MapPin, Lock, Star } from "lucide-react";



export const navData: NavItem[] = [
    {
        id: 1,
        name: 'Home',
        path: '/',
    },
    {
        id: 2,
        name: 'Catagory',
        path: '/category',
    },
    {
        id: 3,
        name: 'About',
        path: '/about',
    },
    {
        id: 4,
        name: 'Contact',
        path: '/contact',
    },
]

export const accountNav = [
    {
        name: "Profile",
        path: "/account/profile",
        icon: User,
    },
    {
        name: "Orders",
        path: "/account/orders",
        icon: Package,
    },
    {
        name: "Address",
        path: "/account/address",
        icon: MapPin,
    },
    {
        name: "Password",
        path: "/account/password",
        icon: Lock,
    },

];

export const orderTab = [
    {
        name: "View All",
        value: "all"
    },
    {
        name: "To Pay",
        value: "topay"
    },
    {
        name: "Processing",
        value: "processing"
    },
    {
        name: "Shipped",
        value: "shipped"
    },
    {
        name: "Delivered",
        value: "delivered"
    },
    {
        name: "Cancelled",
        value: "cancelled"
    },
]

export const subcityOptions = [
    "Addis Ketema",
    "Akaky Kaliti",
    "Arada",
    "Bole",
    "Gullele",
    "Kirkos",
    "Kolfe Keranio",
    "Lideta",
    "Nifas Silk-Lafto",
    "Yeka",
    "Lemi Kura"
]