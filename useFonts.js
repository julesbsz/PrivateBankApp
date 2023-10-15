import * as Font from "expo-font";

export const loadFonts = async () => {
	await Font.loadAsync({
		PlusJakartaSans: require("./assets/fonts/PlusJakartaSans-Bold.ttf"),
		SpaceGrotesk: require("./assets/fonts/SpaceGrotesk-Bold.ttf"),
	});
};
