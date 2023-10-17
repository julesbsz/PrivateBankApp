import { View, Text, SafeAreaView, StyleSheet, TextInput, Pressable, TouchableWithoutFeedback, Keyboard } from "react-native";
import global from "../../assets/style";
import React from "react";
import { useRouter } from "expo-router";

const RegisterPage = () => {
	const router = useRouter();

	const DismissKeyboard = ({ children }) => (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View>{children}</View>
		</TouchableWithoutFeedback>
	);

	return (
		<DismissKeyboard>
			<SafeAreaView style={styles.container}>
				<Text style={global.h1}>Register</Text>

				<View style={styles.columnContainer}>
					<TextInput style={global.textInput} onChangeText={() => console.log("changed")} placeholder="E-mail address" placeholderTextColor="#C9C8C9" inputMode="email" keyboardType="email-address" />
					<TextInput style={global.textInput} onChangeText={() => console.log("changed")} placeholder="Password" placeholderTextColor="#C9C8C9" secureTextEntry={true} />
					<TextInput style={global.textInput} onChangeText={() => console.log("changed")} placeholder="Confirm password" placeholderTextColor="#C9C8C9" secureTextEntry={true} />
				</View>

				<View style={styles.buttonsView}>
					<Pressable style={[global.button, global.buttonShadow]}>
						<Text style={[global.text, global.buttonText]}>Register</Text>
					</Pressable>

					<Pressable onPress={() => router.push("(auth)/login")}>
						<Text style={global.secondaryButtonText}>Already have an account? Login</Text>
					</Pressable>
				</View>
			</SafeAreaView>
		</DismissKeyboard>
	);
};

export default RegisterPage;

const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
		backgroundColor: "#141316",
	},
	columnContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "90%",
		height: "auto",
		gap: "15px",
	},
	buttonsView: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "90%",
		height: "auto",
		gap: "20px",
		position: "absolute",
		bottom: 50,
	},
});
