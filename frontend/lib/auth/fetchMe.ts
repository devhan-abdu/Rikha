"use server";

import { cookies } from "next/headers"

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL!;

async function tryRefresh() {
    const cookieStore = cookies();
    const res = await fetch(`${BACKEND_URL}/auth/refresh`, {
        method: "POST",
        headers: {
            Cookie: (await cookieStore).toString(),
        },
        cache: "no-store"
    })
    return res.ok
}

export async function fetchMe() {
    const cookieStore = cookies();

    const meRes = await fetch(`${BACKEND_URL}/user/me`, {
        method: "GET",
        headers: {
            Cookie: cookieStore.toString(),
        },
        cache: "no-store",
    })

    if (meRes.ok) {
        const data = await meRes.json();
        return data.user;
    }

    if (meRes.status === 401) {
        const refreshed = await tryRefresh();
        if (!refreshed) return null;

        const meRes2 = await fetch(`${BACKEND_URL}/user/me`, {
            method: "GET",
            headers: {
                Cookie: cookieStore.toString(),
            },
            cache: "no-store",
        })
        if (meRes2.ok) {
            const data2 = await meRes2.json();
            return data2.user;
        }
    }

    return null;
}