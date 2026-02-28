import { tokenCache } from "@/lib/auth";
import { ClerkLoaded, ClerkProvider as ClerkProviderBase } from "@clerk/clerk-expo";

const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
if (!clerkPublishableKey || clerkPublishableKey === "yourkeygoeshere") {
    console.warn("⚠️ Missing or invalid EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in .env");
}

interface ClerkProviderProps {
    children: React.ReactNode;
}

export function ClerkProvider({ children }: ClerkProviderProps) {
    return (
        <ClerkProviderBase publishableKey={clerkPublishableKey} tokenCache={tokenCache}>
            <ClerkLoaded>
                {children}
            </ClerkLoaded>
        </ClerkProviderBase>
    )
}
