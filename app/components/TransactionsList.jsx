import { View, Text, StyleSheet, Pressable } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const TransactionsListComponent = () => {
	const { transactionsHistory } = useContext(AuthContext);

	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<Text style={styles.title}>Transactions history</Text>
				<Pressable style={styles.link}>
					<Text style={styles.linkText}>View all</Text>
				</Pressable>
			</View>

			<View style={styles.list}></View>
		</View>
	);
};

export default TransactionsListComponent;

const styles = StyleSheet.create({
	container: {
		height: 300,
		width: "100%",
	},
	row: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
	},
	title: {
		color: "white",
		fontSize: 18,
		fontWeight: "semibold",
	},
	linkText: {
		color: "#07C57D",
		fontSize: 14,
		fontWeight: "semibold",
	},
});
