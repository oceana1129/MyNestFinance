import { auth } from "../firebase";

export const API_URL = import.meta.env.VITE_API_URL;

export async function authHeaders(contentType = false) {
    if (!auth.currentUser) {
        throw new Error("No user is currently signed in.");
    }

    const token = await auth.currentUser.getIdToken();

    return {
        ...(contentType && { "Content-Type": "application/json" }),
        Authorization: `Bearer ${token}`,
    };
}