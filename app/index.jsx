import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useEffect, useContext } from "react";
import { useRouter } from "expo-router";
import { AuthContext } from "./context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InitialLayout = () => {
	const { user, isFirstTime, initialized } = useContext(AuthContext);

	const router = useRouter();

	useEffect(() => {
		if (!initialized) return;

		if (user) {
			router.replace("(inside)/home");
		} else {
			if (isFirstTime) {
				router.replace("onboarding");
			} else {
				router.replace("(auth)/register");
			}
		}
	}, [initialized, user]);

	if (!initialized) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color="#13C782" />
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
