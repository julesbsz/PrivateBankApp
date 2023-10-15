import { View, Text } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const InitialLayout = () => {
	const [loading, setLoading] = React.useState(true);
	const [isFirstLaunch, setIsFirstLaunch] = React.useState(false);

	const router = useRouter();

	useEffect(() => {
		const handleFirstLaunch = async () => {
			await AsyncStorage.getItem("alreadyLaunched").then(async (value) => {
				if (!value) {
					await AsyncStorage.setItem("alreadyLaunched", "true");
					setIsFirstLaunch(true);
					setLoading(false);
					router.push("onboarding");
				} else {
					setIsFirstLaunch(false);
					setLoading(false);
				}
			});
		};

		handleFirstLaunch();
	}, []);

	if (loading) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}

	if (!loading && !isFirstLaunch) {
		return (
			<View>
				<Text>InitialLayout</Text>
			</View>
		);
	}
};

export default InitialLayout;
