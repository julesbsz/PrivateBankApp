import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const StackLayout = () => {
	return (
		<>
			<StatusBar style="light" />
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="onboarding" options={{ headerShown: false }} />
			</Stack>
		</>
	);
};

export default StackLayout;
