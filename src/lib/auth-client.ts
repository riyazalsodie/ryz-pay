import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    baseURL: "http://localhost:3001", // Make sure this matches your server port
    plugins: [
        adminClient()
    ]
})
