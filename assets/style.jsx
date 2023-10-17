import { StyleSheet } from "react-native";

const global = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#141316",
	},
	h1: {
		fontFamily: "SpaceGrotesk",
		color: "#FFFFFF",
		fontSize: 64,
		lineHeight: 44,
		paddingTop: 100,
		paddingBottom: 50,
	},
	text: {
		fontFamily: "PlusJakartaSans",
		color: "#FFFFFF",
		fontSize: 20,
		textAlign: "center",
		lineHeight: 36.5,
	},
	green: {
		color: "#13C782",
	},
	black: {
		color: "#000000",
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
	secondaryButtonText: {
		fontSize: 14,
		color: "#C9C8C9",
	},
	textInput: {
		height: 60,
		width: "100%",
		borderColor: "#565358",
		borderWidth: 1,
		backgroundColor: "#262329",
		color: "#C9C8C9",
		fontSize: 16,
		borderRadius: 16,
		paddingLeft: 20,
	},
	textInputColor: {
		color: "#C9C8C9",
	},
});

export default global;
