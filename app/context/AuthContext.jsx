import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { loadFonts } from "../../useFonts";
import PocketBase from "pocketbase";
import { Alert } from "react-native";

export const AuthContext = createContext({
	user: null,
	isFirstTime: false,
	initialized: false,
	handleRegister: () => {},
	handleLogin: () => {},
});

const pb = new PocketBase(process.env.POCKETBASE_URL);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isFirstTime, setIsFirstTime] = useState(false);
	const [initialized, setInitialized] = useState(false);

	const router = useRouter();

	const handleRegister = async (email, password, confirmedPassword) => {
		const username = email.split("@")[0];
		const data = {
			username,
			email,
			emailVisibility: true,
			password,
			passwordConfirm: confirmedPassword,
		};

		await pb
			.collection("users")
			.create(data)
			.then((user) => {
				setUser(user);
				AsyncStorage.setItem("user", JSON.stringify(user));
				router.replace("(inside)/home");
			})
			.catch((err) => {
				if (Object.keys(err.response.data).length > 1) {
					const error = err.response.data[Object.keys(err.response.data)[0]];
					const errorMessage = error[Object.keys(error)[1]];
					showAlert("Error", errorMessage);
				}
			});
	};

	const handleLogin = async (email, password) => {
		console.log("connecting user...");
		await pb
			.collection("users")
			.authWithPassword(email, password)
			.then((user) => {
				setUser(user);
				AsyncStorage.setItem("user", JSON.stringify(user));
				console.log("user connected:", user);
				router.replace("(inside)/home");
			})
			.catch(() => {
				showAlert("Error", "Invalid credentials, please try again.");
			});
	};

	const handleLogout = async () => {
		await AsyncStorage.removeItem("user");
		setUser(null);
		router.replace("(auth)/register");
	};

	const showAlert = (title, message) => Alert.alert(title, message, [{ text: "OK" }]);

	useEffect(() => {
		const init = async () => {
			const user = await AsyncStorage.getItem("user");
			console.log("getting user from localstorage:", user);
			if (user) {
				setUser(JSON.parse(user));
			} else {
				await AsyncStorage.getItem("isFirstTime").then((value) => {
					if (value === "false") {
						setIsFirstTime(false);
					} else {
						setIsFirstTime(true);
						AsyncStorage.setItem("isFirstTime", "false");
					}
				});
			}

			// connect user
			loadFonts().then(() => {
				setInitialized(true);
			});
		};

		init();
	}, []);

	return <AuthContext.Provider value={{ user, isFirstTime, initialized, handleRegister, handleLogin }}>{children}</AuthContext.Provider>;
};
