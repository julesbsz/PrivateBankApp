import { View, Text, StyleSheet, Pressable } from "react-native";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const CardComponent = () => {
	const { user, authorizedSpending, handleLogout } = useContext(AuthContext);

	const [balance, setBalance] = useState(0);

	useEffect(() => {
		if (!user) return;

		setBalance(user.record.balance);
	}, [user]);

	return (
		<View style={styles.container}>
			<View style={styles.mainCard}>
				<Text style={styles.mainCardText}>Total balance</Text>
				<Text style={styles.mainCardAmount}>${balance}</Text>
			</View>

			<View style={styles.secondaryCard}>
				<Text style={styles.secondaryCardText}>Authorized spending</Text>
				<Text style={styles.secondaryCardAmount}>${authorizedSpending}</Text>
			</View>

			<Pressable onPress={handleLogout}>
				<Text>Logout</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#262329",
		marginTop: 40,
		paddingTop: 7,
		width: "100%",
		height: 250,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		borderRadius: 43,
	},
	mainCard: {
		backgroundColor: "#0DF69E",
		width: "97%",
		height: "50%",
		borderRadius: 40,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: 5,
	},
	mainCardText: {
		color: "#565358",
		fontSize: 16,
	},
	mainCardAmount: {
		fontFamily: "SpaceGrotesk",
		color: "#262329",
		fontSize: 38,
	},
	secondaryCard: {
		backgroundColor: "#262329",
		width: "95%",
		height: "50%",
		borderBottomLeftRadius: 40,
		borderBottomRightRadius: 40,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: 5,
	},
	secondaryCardText: {
		color: "#C9C8C9",
		fontSize: 16,
	},
	secondaryCardAmount: {
		fontFamily: "SpaceGrotesk",
		color: "#C9C8C9",
		fontSize: 36,
	},
});

export default CardComponent;
