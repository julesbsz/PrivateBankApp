import { Stack } from "expo-router";
import { AuthProvider } from "./context/AuthContext";
import { OperationProvider } from "./context/OperationContext";
import { ModalProvider } from "./context/ModalContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

const StackLayout = () => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<AuthProvider>
				<ModalProvider>
					<OperationProvider>
						<Stack>
							<Stack.Screen name="index" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: false }} />
							<Stack.Screen name="onboarding" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: false }} />

							<Stack.Screen name="(auth)/register" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: false }} />
							<Stack.Screen name="(auth)/login" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: true }} />

							<Stack.Screen name="(inside)/home" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: false }} />
						</Stack>
					</OperationProvider>
				</ModalProvider>
			</AuthProvider>

			<Toast />
		</GestureHandlerRootView>
	);
};

export default StackLayout;
