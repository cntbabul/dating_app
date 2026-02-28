import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ClerkProvider } from "./ClerkProvider";
import { ConvexProvider } from "./ConvexProvider";
import { ThemeProvider } from "./ThemeProvider";

interface AppProvidersProps {
    children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ClerkProvider>
                <ConvexProvider>
                    <ThemeProvider>
                        {children}
                    </ThemeProvider>
                </ConvexProvider>
            </ClerkProvider>
        </GestureHandlerRootView>
    );
}
