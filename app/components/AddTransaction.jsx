import { View, StyleSheet, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

const AddTransactionComponent = () => {
	return (
		<Pressable style={[styles.pressable, styles.pressableShadow]}>
			<Entypo name="plus" size={38} color="black" />
		</Pressable>
	);
};

const styles = StyleSheet.create({
	pressable: {
		height: 70,
		width: 70,
		borderRadius: 50,
		backgroundColor: "#13C782",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	pressableShadow: {
		shadowColor: "#13C782",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.45,
		shadowRadius: 31,
		elevation: 0,
	},
});

export default AddTransactionComponent;
