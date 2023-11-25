import { View, Text, StyleSheet, Pressable } from "react-native";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import OperationItemComponent from "./OperationItem";

const TransactionsListComponent = () => {
	const { transactionsHistory } = useContext(AuthContext);

	useEffect(() => {
		console.log(transactionsHistory.items);
	});

	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<Text style={styles.title}>Transactions history</Text>
				<Pressable style={styles.link}>
					<Text style={styles.linkText}>View all</Text>
				</Pressable>
			</View>

			<View style={styles.list}>{transactionsHistory.items && transactionsHistory.items.map((transaction, index) => <OperationItemComponent key={index} title={transaction.title} date={transaction.date} amount={transaction.amount} type={transaction.type} />)}</View>
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
	list: {
		display: "flex",
		flexDirection: "column",
		gap: 10,
		marginTop: 20,
	},
});
