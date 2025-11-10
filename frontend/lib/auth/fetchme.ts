"use server";

import { cookies } from "next/headers"

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL!;


export async function fetchMe() {
    try {
        const cookieStore = await cookies();
        const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join("; ");

        const res = await fetch(`${BACKEND_URL}/user/me`, {
            method: "GET",
            headers: cookieHeader ? { Cookie: cookieHeader } : {},
            cache: "no-store",
        })

        if (!res.ok) return null
        const data = await res.json()
        return data.data

    } catch (err) {
        console.error('fetchMe error', err);
        return null;
    }
}