import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import OperationItemComponent from "./OperationItem";

const TransactionsListComponent = () => {
	const { transactionsHistory } = useContext(AuthContext);
	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		if (transactionsHistory) {
			setInitialized(true);
		}
	}, [transactionsHistory]);

	return (
		<ScrollView style={styles.container}>
			<View style={styles.row}>
				<Text style={styles.title}>Transactions history</Text>
				<Pressable style={styles.link}>
					<Text style={styles.linkText}>View all</Text>
				</Pressable>
			</View>

			{initialized && transactionsHistory.items && transactionsHistory.items.length > 0 ? (
				<View style={styles.list}>
					{transactionsHistory.items.map((transaction, index) => (
						<OperationItemComponent key={index} description={transaction.description} date={transaction.created} amount={transaction.amount} type={transaction.type} />
					))}
				</View>
			) : (
				<View style={{ marginTop: 20 }}>
					<Text style={{ color: "white", fontSize: 16, fontWeight: "semibold" }}>Pas de transactions pour le moment</Text>
				</View>
			)}
		</ScrollView>
	);
};

export default TransactionsListComponent;

const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: "100%",
		paddingBottom: 100,
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
