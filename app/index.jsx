import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const InitialLayout = () => {
	const { initialized } = useContext(AuthContext);

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
