import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const InitialLayout = () => {
	const [loading, setLoading] = useState(true);
	const [isFirstLaunch, setIsFirstLaunch] = useState(false);

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
					// setLoading(false);
				}
			});
		};

		handleFirstLaunch();
	}, []);

	if (loading) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color="#13C782" />
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

const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#141316",
	},
});

export default InitialLayout;
