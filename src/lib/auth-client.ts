import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3201", // Make sure this matches your server port
    plugins: [
        adminClient()
    ]
})
