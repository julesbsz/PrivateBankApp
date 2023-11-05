import { View, Text, StyleSheet } from "react-native";
import React from "react";
import global from "../../assets/style";
import CardComponent from "../components/Card";

const HomePage = () => {
	return (
		<View style={styles.container}>
			<CardComponent />
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
});

export default HomePage;
