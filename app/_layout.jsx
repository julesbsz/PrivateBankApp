import { Stack } from "expo-router";
import { AuthProvider } from "./context/AuthContext";

const StackLayout = () => {
	return (
		<AuthProvider>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: false }} />
				<Stack.Screen name="onboarding" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: false }} />
				<Stack.Screen name="(auth)/register" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: false }} />
				<Stack.Screen name="(auth)/login" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: true }} />
			</Stack>
		</AuthProvider>
	);
};

export default StackLayout;
