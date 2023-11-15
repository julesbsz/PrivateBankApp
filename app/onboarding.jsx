import { View, Text, StyleSheet, Pressable } from "react-native";
import Cards from "../assets/svg/cards.jsx";
import global from "../assets/style.jsx";
import ButtonComponent from "./components/Button.jsx";
import { useRouter } from "expo-router";

const Onboarding = () => {
	const router = useRouter();

	const handleBeginNow = () => {
		router.push("(auth)/register");
	}

	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<Cards style={styles.image} />
				<Text style={global.text}>
					Private Bank is an <Text style={global.green}>open source</Text> & <Text style={global.green}>self hosted</Text> banking app that helps you keep track of your expenses.
				</Text>
			</View>

			<ButtonComponent content="Begin Now" onPressAction={handleBeginNow} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 50,
		paddingBottom: 50,
		paddingLeft: 20,
		paddingRight: 20,
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

export default Onboarding;
