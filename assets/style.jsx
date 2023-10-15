import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";

const Style = () => {
	const [fontsLoaded] = useFonts({
		PlusJakartaSans: require("./fonts/PlusJakartaSans.ttf"),
		SpaceGrotesk: require("./fonts/SpaceGrotesk.ttf"),
	});
};

const global = StyleSheet.create({
	text: {
		fontFamily: "PlusJakartaSans",
		fontWeight: "700",
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
		fontFamily: "SpaceGrotesk",
		fontWeight: "700",
		backgroundColor: "#13C782",
		borderRadius: 50,
		paddingTop: 13,
		paddingBottom: 15,
		paddingLeft: 86,
		paddingRight: 86,
	},
	buttonShadow: {
		shadowColor: "#13C782",
		shadowOffset: {
			width: 0,
			height: 16,
		},
		shadowOpacity: 0.35,
		shadowRadius: 31,
		elevation: 0,
	},
});

export default global;
