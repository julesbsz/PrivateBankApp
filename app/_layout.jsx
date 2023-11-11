import { Stack } from "expo-router";
import { AuthProvider } from "./context/AuthContext";
import { OperationProvider } from "./context/OperationContext";
import { ModalProvider } from "./context/ModalContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const StackLayout = () => {
	const toastConfig = {
		success: (props) => (
			<BaseToast
				{...props}
				style={{ borderLeftColor: "#262329", backgroundColor: "#262329" }}
				contentContainerStyle={{ paddingHorizontal: 15 }}
				text1Style={{
					fontSize: 16,
					fontWeight: "400",
					color: "white",
					textAlign: "center",
				}}
			/>
		),
	};

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

			<Toast config={toastConfig} />
		</GestureHandlerRootView>
	);
};

export default StackLayout;
