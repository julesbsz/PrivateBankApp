import { View, Text, SafeAreaView, StyleSheet, TextInput, Pressable, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import global from "../../assets/style";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import { AuthContext } from "../context/AuthContext";
import ButtonComponent from "../components/Button";

const LoginPage = () => {
	const { handleLogin, user } = useContext(AuthContext);
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("j.bousrez@outlook.com");
	const [password, setPassword] = useState("12345678");

	const sanitizeFields = async () => {
		setLoading(true);
		setEmail(email.trim());
		setPassword(password.trim());

		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
			Alert.alert("Error", "Invalid email address");
			return;
		}

		const success = await handleLogin(email, password);
		console.log("isConnected:", isConnected);
		if (!success) {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user) {
			router.replace("(inside)/home");
		}
	}, []);

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<SafeAreaView style={styles.container}>
				<Text style={global.h1}>Login</Text>

				<View style={styles.columnContainer}>
					<TextInput style={global.textInput} value={email} onChangeText={(text) => setEmail(text)} placeholder="E-mail address" placeholderTextColor="#C9C8C9" inputMode="email" keyboardType="email-address" />
					<TextInput style={global.textInput} value={password} onChangeText={(text) => setPassword(text)} placeholder="Password" placeholderTextColor="#C9C8C9" secureTextEntry={true} />
				</View>

				<View style={styles.buttonsView}>
					<ButtonComponent content="Login" onPressAction={sanitizeFields} loading={loading} />

					<Pressable onPress={() => router.back()}>
						<Text style={global.secondaryButtonText}>Don’t have an account? Register</Text>
					</Pressable>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default LoginPage;

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
