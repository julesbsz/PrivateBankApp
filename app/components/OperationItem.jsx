import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const OperationItemComponent = ({ title, date, amount, type }) => {
	return (
		<View style={styles.container}>
			<View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 15 }}>
				<Ionicons name="fast-food" size={34} color="white" />

				<View style={styles.infoContainer}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.time}>11.03 AM</Text>
				</View>
			</View>

			<Text style={styles.amount}>- $20.00</Text>
		</View>
	);
};

export default OperationItemComponent;

const styles = StyleSheet.create({
	container: {
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: "#262329",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		height: 75,
		width: "100%",
		borderRadius: 16,
	},
	infoContainer: {
		display: "flex",
		flexDirection: "column",
		gap: 5,
	},
	title: {
		color: "white",
		fontSize: 16,
		fontWeight: "semibold",
	},
	time: {
		color: "#AFAFAF",
		fontSize: 14,
		fontWeight: "normal",
	},
	amount: {
		color: "#FA4747",
		fontSize: 18,
		fontWeight: "semibold",
	},
});
