import { Stack } from "expo-router";
import { AuthProvider } from "./context/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const StackLayout = () => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<AuthProvider>
				<Stack>
					<Stack.Screen name="index" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: false }} />
					<Stack.Screen name="onboarding" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: false }} />

					<Stack.Screen name="(auth)/register" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: false }} />
					<Stack.Screen name="(auth)/login" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: true }} />

					<Stack.Screen name="(inside)/home" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: false }} />
				</Stack>
			</AuthProvider>
		</GestureHandlerRootView>
	);
};

export default StackLayout;
