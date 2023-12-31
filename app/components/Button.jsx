import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";

const ButtonComponent = ({ content, onPressAction, loading, disabled }) => {
	return (
		<>
			<Pressable style={[styles.button, styles.buttonShadow, disabled ? styles.buttonDisabled : {}]} onPress={!disabled && !loading ? onPressAction : null} disabled={disabled}>
				{loading ? <ActivityIndicator size="large" color="#141316" /> : <Text style={[styles.text, styles.buttonText]}>{content}</Text>}
			</Pressable>
		</>
	);
};

export default ButtonComponent;

const styles = StyleSheet.create({
	text: {
		fontFamily: "PlusJakartaSans",
		color: "#FFFFFF",
		fontSize: 20,
		textAlign: "center",
		lineHeight: 36.5,
	},
	button: {
		backgroundColor: "#13C782",
		borderRadius: 50,
		paddingTop: 13,
		paddingBottom: 13,
		paddingLeft: 86,
		paddingRight: 86,
	},
	buttonShadow: {
		shadowColor: "#13C782",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.35,
		shadowRadius: 31,
		elevation: 0,
	},
	buttonText: {
		fontFamily: "SpaceGrotesk",
		color: "#000000",
	},
	buttonDisabled: {
		backgroundColor: "#1D6348",
	},
});
