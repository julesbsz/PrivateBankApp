import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { loadFonts } from "../../useFonts";

export const AuthContext = createContext({
	user: null,
	isFirstTime: false,
	initialized: false,
});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isFirstTime, setIsFirstTime] = useState(false);
	const [initialized, setInitialized] = useState(false);

	const router = useRouter();

	useEffect(() => {
		const init = async () => {
			await AsyncStorage.getItem("isFirstTime").then((value) => {
				if (value === "false") {
					setIsFirstTime(false);
				} else {
					setIsFirstTime(true);
					AsyncStorage.setItem("isFirstTime", "false");
				}
			});

			// connect user

			loadFonts().then(() => {
				setInitialized(true);
			});
		};

		init();
	}, []);

	return <AuthContext.Provider value={{ user, isFirstTime, initialized }}>{children}</AuthContext.Provider>;
};
