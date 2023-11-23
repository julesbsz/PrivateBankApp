import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { loadFonts } from "../../useFonts";
import PocketBase, { AsyncAuthStore } from "pocketbase";
import { Alert } from "react-native";
import "eventsource-polyfill";

export const AuthContext = createContext({
	pb: null,
	user: null,
	isFirstTime: false,
	initialized: false,
	authorizedSpending: 0,
	transactionsHistory: [],
	handleRegister: () => {},
	handleLogin: () => {},
	handleLogout: () => {},
});

const store = new AsyncAuthStore({
	save: async (serialized) => AsyncStorage.setItem("pb_auth", serialized),
	initial: AsyncStorage.getItem("pb_auth"),
});
const pb = new PocketBase(process.env.POCKETBASE_URL, store);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isFirstTime, setIsFirstTime] = useState(false);
	const [initialized, setInitialized] = useState(false);
	const [authorizedSpending, setAuthorizedSpending] = useState(0);
	const [transactionsHistory, setTransactionsHistory] = useState([]);

	const router = useRouter();

	const handleRegister = async (email, password, confirmedPassword) => {
		const username = email.split("@")[0];
		const data = {
			username,
			email,
			emailVisibility: true,
			password,
			passwordConfirm: confirmedPassword,
			balance: 0,
		};

		await pb
			.collection("users")
			.create(data)
			.then(async () => {
				const user = await pb
					.collection("users")
					.authWithPassword(email, password)
					.catch((err) => {
						console.error("[authContext.jsx]: Error while logging in user in handleRegister ->", err);
						showAlert("Error", "An error occured while logging in user.");
					});

				setUser(user);
				pb.authStore.save(user.token, user.record);
				router.replace("(inside)/home");
			})
			.catch((err) => {
				if (Object.keys(err.response.data).length > 1) {
					const error = err.response.data[Object.keys(err.response.data)[0]];
					const errorMessage = error[Object.keys(error)[1]];
					showAlert("Error", errorMessage);
				}
			});

		return false;
	};

	const handleLogin = async (email, password) => {
		console.log("connecting user...");
		await pb
			.collection("users")
			.authWithPassword(email, password)
			.then((user) => {
				setUser(user);
				pb.authStore.save(user.token, user.record);
				console.log("user connected:", user);
				router.replace("(inside)/home");
			})
			.catch(() => {
				showAlert("Error", "Invalid credentials, please try again.");
			});

		return false;
	};

	const handleLogout = async () => {
		pb.authStore.clear();
		setUser(null);
		router.replace("(auth)/register");
	};

	const refreshUserState = async () => {
		if (pb.authStore.isValid) {
			const user = await pb.collection("users").authRefresh();
			setUser(user);
			router.replace("(inside)/home");
		} else {
			pb.authStore.clear();

			await AsyncStorage.getItem("isFirstTime")
				.then((value) => {
					if (value === "false") {
						setIsFirstTime(false);
						router.replace("(auth)/register");
					} else {
						setIsFirstTime(true);
						AsyncStorage.setItem("isFirstTime", "false");
						router.replace("onboarding");
					}
				})
				.catch((err) => {
					console.error("[authContext.jsx]: Error while getting isFirstTime from AsyncStorage ->", err);
					showAlert("Error", "An error occured while getting isFirstTime from AsyncStorage.");
				});
		}
	};

	const getTransactionsHistory = async () => {
		const transactions = await pb.collection("transactionsHistory").getList(1, 10, { userId: user.record.id });
		setTransactionsHistory(transactions);
	};

	const showAlert = (title, message) => Alert.alert(title, message, [{ text: "OK" }]);

	useEffect(() => {
		const init = async () => {
			await loadFonts();
			await refreshUserState();
			setInitialized(true);
		};

		init();
	}, []);

	useEffect(() => {
		if (!user) return;

		setAuthorizedSpending(parseInt(user.record.balance) - parseInt(user.record.savingAmount));
		getTransactionsHistory();

		pb.collection("users")
			.subscribe(user.record.id, function (e) {
				if (e.action === "update") setUser(e);
			})
			.catch((err) => {
				console.error("[authContext.jsx]: Error while subscribing to user collection ->", err);
				showAlert("Error", "An error occured while subscribing to user collection.");
			});

		return () => {
			pb.collection("users").unsubscribe(user.record.id);
		};
	}, [user]);

	return <AuthContext.Provider value={{ pb, user, isFirstTime, initialized, authorizedSpending, transactionsHistory, handleRegister, handleLogin, handleLogout }}>{children}</AuthContext.Provider>;
};
