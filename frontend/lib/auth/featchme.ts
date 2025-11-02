"use server";

import { cookies } from "next/headers"

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL!;

async function tryRefresh() {
    try {
        const cookieStore = await cookies();
        const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join("; ");

        const res = await fetch(`${BACKEND_URL}/auth/refresh`, {
            method: "POST",
            headers: cookieHeader ? { Cookie: cookieHeader } : {},
            cache: "no-store",
        });

        if (!res.ok) {
            return false;
        }

        const setCookieHeader = res.headers.get("set-cookie");
        if (setCookieHeader) {
            const firstPair = setCookieHeader.split(";")[0];
            const [name, ...rest] = firstPair.split("=");
            const value = rest.join("=");
            if (name && value !== undefined) {
                try {
                    cookieStore.set({ name: name.trim(), value: value.trim(), path: '/' });
                } catch (err) {
                    console.error('cookieStore.set failed', err);
                }
            }
        }

        return true;
    } catch (err) {
        return false;
    }

}

export async function fetchMe() {
    try {
        const cookieStore = await cookies();
        const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join("; ");

        const meRes = await fetch(`${BACKEND_URL}/user/me`, {
            method: "GET",
            headers: cookieHeader ? { Cookie: cookieHeader } : {},
            cache: "no-store",
        })

        if (meRes.ok) {
            const data = await meRes.json();
            return data.data;
        }

        if (meRes.status === 401) {
            const refreshed = await tryRefresh();
            if (!refreshed) return null;

            const cookieHeader2 = (await cookies()).getAll().map(c => `${c.name}=${c.value}`).join("; ");

            const meRes2 = await fetch(`${BACKEND_URL}/user/me`, {
                method: "GET",
                headers: cookieHeader2 ? { Cookie: cookieHeader2 } : {},
                cache: "no-store",
            })
            if (meRes2.ok) {
                const data2 = await meRes2.json();
                return data2.data;
            } else {
                console.log("unable to get new access after refresh", meRes2.status);
                return null;
            }
        }

        return null;
    } catch (err) {
        console.error('fetchMe error', err);
        return null;
    }
}