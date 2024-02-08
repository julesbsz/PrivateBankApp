import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, KeyboardAvoidingView } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";
import PagerView from "react-native-pager-view";

import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import IonIconsGlyphMap from "../../assets/icons/Ionicons.json";
import FontAwesomeGlyphMap from "../../assets/icons/FontAwesome5.json";

import ButtonComponent from "./Button";
import { useOperation } from "../context/OperationContext";
import AlertComponent from "./Alert";
import ToastComponent from "./Toast";

const AddTransactionSwiperComponent = ({ bottomSheetModalRef, updateSnapPoints }) => {
	const { createOperation } = useOperation();
	const scrollRef = React.useRef(null);

	const activeTabIndex = useSharedValue(0);
	const [operation, setOperation] = useState("income");
	const [description, setDescription] = useState(null);

	const [amount, setAmount] = useState(null);
	const [amountParsed, setAmountParsed] = useState(null);

	const [iconName, setIconName] = useState("question");
	const [iconElement, setIconElement] = useState(null);

	const handleTabPress = (tabIndex) => {
		activeTabIndex.value = tabIndex;

		if (tabIndex === 0) {
			setOperation("income");
		} else {
			setOperation("expense");
		}
	};

	const animatedIndicatorStyle = useAnimatedStyle(() => {
		const tabWidth = (230 - 10) / 2;
		return {
			transform: [
				{
					translateX: withTiming(activeTabIndex.value * tabWidth + 5, {
						duration: 300,
						easing: Easing.out(Easing.cubic),
					}),
				},
			],
		};
	});

	const animatedIncomeTextStyle = useAnimatedStyle(() => {
		return {
			color: activeTabIndex.value === 0 ? "#262329" : "#C9C8C9",
		};
	});

	const animatedExpenseTextStyle = useAnimatedStyle(() => {
		return {
			color: activeTabIndex.value === 1 ? "#262329" : "#C9C8C9",
		};
	});

	const onChangeAmount = (number) => {
		setAmount(number);
	};

	const onChangeDescription = (text) => {
		setDescription(text);

		const iconName = getIconName(text);
		const iconElement = renderIcon(iconName);

		setIconName(iconName);
		setIconElement(iconElement);
	};

	const handleDismissModalPress = useCallback(() => {
		bottomSheetModalRef.current?.dismiss();
	}, [bottomSheetModalRef]);

	const handleOperation = async () => {
		const success = createOperation(operation, amountParsed, description);

		if (!success) {
			AlertComponent("Error", `Unable to create your ${operation} operation, please try again later.`, "OK");
		} else {
			await ToastComponent("success", `Operation created successfully`);
		}

		handleDismissModalPress();
	};

	const handleNextPress = () => {
		if (!amount) return;

		let processedAmount = amount;

		if (processedAmount.startsWith(".")) {
			processedAmount = "0" + processedAmount;
		}

		processedAmount = Number(processedAmount);

		if (isNaN(processedAmount)) {
			AlertComponent("Error", "Please enter a valid amount.", "OK");
			return;
		}

		setAmountParsed(processedAmount);

		scrollRef.current?.setPage(1);
		setTimeout(() => {
			updateSnapPoints(["90%", "90%"]);
		}, 500);
	};

	function validateAndFormatAmount(amount) {
		amount = amount.replace(/,/g, ".");

		const parts = amount.split(".");
		amount = parts.length > 1 ? `${parts[0]}.${parts.slice(1).join("")}` : amount;

		amount = amount.replace(/[^0-9.]/g, "");

		if (amount.includes(".")) {
			const [interger, decimal] = amount.split(".");
			amount = `${interger}.${decimal.substring(0, 2)}`;
		}

		return amount;
	}

	const combineGlyphMaps = (glyphMaps) => {
		const combinedMap = {};
		Object.entries(glyphMaps).forEach(([prefix, map]) => {
			Object.keys(map).forEach((iconName) => {
				combinedMap[`${prefix}-${iconName}`] = map[iconName];
			});
		});
		return combinedMap;
	};

	const combinedGlyphMap = combineGlyphMaps({
		fa5: FontAwesomeGlyphMap,
		ion: IonIconsGlyphMap,
	});

	const getIconName = (input) => {
		const sanitizedInput = input.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
		const matchingIcons = Object.keys(combinedGlyphMap).filter((name) => name.toLowerCase().includes(sanitizedInput));

		const exactMatch = matchingIcons.find((name) => name.split("-").slice(1).join("-") === sanitizedInput);
		if (exactMatch) {
			return exactMatch;
		}

		return matchingIcons.length > 0 ? matchingIcons[0] : "fa5-question";
	};

	const renderIcon = (iconWithPrefix) => {
		const [prefix, ...iconParts] = iconWithPrefix.split("-");
		const iconName = iconParts.join("-");

		switch (prefix) {
			case "fa5":
				return <FontAwesome5 name={iconName} size={28} color="white" />;
			case "ion":
				return <Ionicons name={iconName} size={28} color="white" />;
			default:
				return <FontAwesome5 name={iconName} size={28} color="white" />;
		}
	};

	useEffect(() => {
		if (amount) {
			setAmount(validateAndFormatAmount(amount));
		}
	}, [amount]);

	useEffect(() => {
		const iconName = getIconName("question");
		const iconElement = renderIcon(iconName);

		setIconName(iconName);
		setIconElement(iconElement);
	}, []);

	return (
		<PagerView style={{ flex: 1 }} initialPage={0} scrollEnabled={false} ref={scrollRef}>
			<View style={styles.mainContainer} key="1">
				<View style={styles.tabsSwitcher}>
					<Animated.View style={[styles.tabIndicator, animatedIndicatorStyle]} />

					<Pressable style={styles.tabItem} onPress={() => handleTabPress(0)}>
						<Animated.Text style={[styles.tabItemText, animatedIncomeTextStyle]}>Income</Animated.Text>
					</Pressable>

					<Pressable style={styles.tabItem} onPress={() => handleTabPress(1)}>
						<Animated.Text style={[styles.tabItemText, animatedExpenseTextStyle]}>Expense</Animated.Text>
					</Pressable>
				</View>

				<View style={styles.pagerView}>
					<View style={styles.inputRow}>
						{operation === "income" ? <Text style={styles.text}>+</Text> : <Text style={styles.text}>-</Text>}
						<TextInput style={styles.input} onChangeText={onChangeAmount} value={amount} placeholder="AMOUNT" keyboardType="numeric" autoCorrect={false} autoFocus={true} />
						{/* {amount && <Text style={styles.currency}>$</Text>} */}
					</View>

					{amount ? <ButtonComponent content={"Next"} onPressAction={handleNextPress} /> : <ButtonComponent content={"Next"} disabled={true} />}
				</View>
			</View>

			<KeyboardAvoidingView {...(Platform.OS === "ios" ? { behavior: "padding" } : {})} style={styles.container}>
				<View key="2" style={[styles.mainContainer, { gap: 20 }]}>
					<View style={styles.iconPickerContainer}>
						<Pressable style={styles.iconPicker}>{iconElement}</Pressable>
					</View>

					<View style={styles.inputRow}>
						<TextInput style={styles.input} onChangeText={onChangeDescription} value={description} placeholder="DESCRIPTION" autoCorrect={false} autoFocus={true} />
					</View>

					{description ? <ButtonComponent content={"Save"} onPressAction={handleOperation} /> : <ButtonComponent content={"Save"} disabled={true} />}
				</View>
			</KeyboardAvoidingView>
		</PagerView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	mainContainer: {
		marginTop: 20,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		// justifyContent: "center",
	},
	tabsSwitcher: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: 230,
		height: 50,
		backgroundColor: "#141316",
		borderRadius: 50,
		padding: 5,
	},
	tabItem: {
		width: "50%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "80%",
	},
	tabIndicator: {
		position: "absolute",
		width: "50%",
		height: "100%",
		backgroundColor: "white",
		borderRadius: 50,
		left: 0,
	},
	pagerView: {
		padding: 20,
		// backgroundColor: "white",
		width: "100%",
		height: "auto",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	inputRow: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		marginBottom: 20,
	},
	text: {
		fontFamily: "SpaceGrotesk",
		fontSize: 75,
		color: "white",
	},
	currency: {
		fontFamily: "SpaceGrotesk",
		fontSize: 50,
		color: "white",
	},
	input: {
		fontFamily: "SpaceGrotesk",
		fontSize: 50,
		color: "white",
	},
	iconPickerContainer: {
		width: "100%",
		height: "auto",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	iconPicker: {
		backgroundColor: "#141316",
		width: 100,
		height: 100,
		borderRadius: 100,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
});

const buttonStyle = StyleSheet.create({
	text: {
		fontFamily: "PlusJakartaSans",
		color: "#FFFFFF",
		fontSize: 20,
		textAlign: "center",
		lineHeight: 36.5,
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
});

export default AddTransactionSwiperComponent;
