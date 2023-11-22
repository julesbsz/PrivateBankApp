import { View, Text, SafeAreaView, StyleSheet, TextInput, Pressable, TouchableWithoutFeedback, Keyboard, Alert, ActivityIndicator } from "react-native";
import global from "../../assets/style";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { AuthContext } from "../context/AuthContext";
import ButtonComponent from "../components/Button";

const RegisterPage = () => {
	const { handleRegister, user } = useContext(AuthContext);
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("j.bousrez@outlook.com");
	const [password, setPassword] = useState("12345678");
	const [confirmedPassword, setConfirmedPassword] = useState("12345678");

	useEffect(() => {
		// user already connected -> redirect to home
		if (user) {
			router.replace("(inside)/home");
		}
	}, []);

	const sanitizeFields = async () => {
		setLoading(true);

		setEmail(email.trim());
		setPassword(password.trim());
		setConfirmedPassword(confirmedPassword.trim());

		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
			Alert.alert("Error", "Invalid email address");
			return setLoading(false);
		}

		if (password.trim() !== confirmedPassword.trim()) {
			setPassword("");
			setConfirmedPassword("");
			Alert.alert("Error", "Passwords do not match");
			return setLoading(false);
		}

		if (password.length < 8) {
			setPassword("");
			setConfirmedPassword("");
			Alert.alert("Error", "Password must be at least 8 characters long");
			return setLoading(false);
		}

		const success = await handleRegister(email, password, confirmedPassword);
		if (!success) {
			setLoading(false);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<SafeAreaView style={styles.container}>
				<Text style={global.h1}>Register</Text>

				<View style={styles.columnContainer}>
					<TextInput style={global.textInput} onChangeText={(text) => setEmail(text)} value={email} placeholder="E-mail address" placeholderTextColor="#C9C8C9" inputMode="email" keyboardType="email-address" />
					<TextInput style={global.textInput} onChangeText={(password) => setPassword(password)} value={password} placeholder="Password" placeholderTextColor="#C9C8C9" secureTextEntry={true} />
					<TextInput style={global.textInput} onChangeText={(confirmedPassword) => setConfirmedPassword(confirmedPassword)} value={confirmedPassword} placeholder="Confirm password" placeholderTextColor="#C9C8C9" secureTextEntry={true} />
				</View>

				<View style={styles.buttonsView}>
					<ButtonComponent content="Register" onPressAction={sanitizeFields} loading={loading} />

					<Pressable onPress={() => router.push("(auth)/login")}>
						<Text style={global.secondaryButtonText}>Already have an account? Login</Text>
					</Pressable>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
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
