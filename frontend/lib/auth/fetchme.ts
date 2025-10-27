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
            console.error("refresh failed", res.status, await res.text().catch(() => ""));
            return false;
        }

        // Read Set-Cookie and set it on the response cookies
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
        console.error('tryRefresh error', err);
        return false;
    }

}

export async function fetchMe() {
    try {
        const cookieStore = await cookies();
        const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join("; ");
        console.log("trying to get user if access valid")

        const meRes = await fetch(`${BACKEND_URL}/user/me`, {
            method: "GET",
            headers: cookieHeader ? { Cookie: cookieHeader } : {},
            cache: "no-store",
        })
        console.log("access valid?", meRes.ok)

        if (meRes.ok) {
            const data = await meRes.json();
            return data.user;
        }

        console.log("not valid access what about status", meRes.status)
        if (meRes.status === 401) {
            const refreshed = await tryRefresh();
            console.log("trying to refresh", refreshed)
            if (!refreshed) return null;

            // Recompute cookies after refresh
            const cookieHeader2 = (await cookies()).getAll().map(c => `${c.name}=${c.value}`).join("; ");

            console.log("the refresh success then now i have access so try user fetch again ", cookieHeader2)
            const meRes2 = await fetch(`${BACKEND_URL}/user/me`, {
                method: "GET",
                headers: cookieHeader2 ? { Cookie: cookieHeader2 } : {},
                cache: "no-store",
            })
            console.log("is access token valid and got the user info", meRes2.ok)
            if (meRes2.ok) {
                const data2 = await meRes2.json();
                return data2.user;
            } else {
                console.log("unable to get new access after refresh", meRes2.status);
                return null;
            }
        }

        console.log("the status is not 401")
        return null;
    } catch (err) {
        console.error('fetchMe error', err);
        return null;
    }
}