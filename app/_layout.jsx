import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const StackLayout = () => {
	return (
		<>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: false }} />
				<Stack.Screen name="onboarding" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: false }} />
			</Stack>
			<StatusBar style="light" />
		</>
	);
};

export default StackLayout;
