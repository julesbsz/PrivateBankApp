import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./context/AuthContext";

const StackLayout = () => {
	return (
		<AuthProvider>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: false }} />
				<Stack.Screen name="onboarding" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: false }} />
			</Stack>
			<StatusBar style="light" />
		</AuthProvider>
	);
};

export default StackLayout;
