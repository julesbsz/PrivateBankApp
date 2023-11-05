// React
import { View, StyleSheet } from "react-native";

// Components
import CardComponent from "../components/Card";
import AddTransactionComponent from "../components/AddTransaction";

// Styles
import global from "../../assets/style";

const HomePage = () => {
	return (
		<View style={styles.container}>
			<CardComponent />

			<View style={styles.containerTransactionBtn}>
				<AddTransactionComponent />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 20,
		paddingBottom: 50,
		paddingLeft: 10,
		paddingRight: 10,
		height: "100%",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#141316",
	},
	innerContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: "auto",
		gap: "40px",
	},
	image: {
		width: "100%",
		height: "40%",
	},
	containerTransactionBtn: {
		position: "absolute",
		bottom: 40,
		width: "100%",
		display: "flex",
		alignItems: "center",
	},
});

export default HomePage;
