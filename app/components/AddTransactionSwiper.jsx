import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, KeyboardAvoidingView } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";
import PagerView from "react-native-pager-view";
import { useOperation } from "../context/OperationContext";

import { Ionicons, FontAwesome } from "@expo/vector-icons";

import ButtonComponent from "./Button";
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

	const [combinedGlyphMap, setcombinedGlyphMap] = useState([]);

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
		const success = createOperation(operation, amountParsed, description, iconName);

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

	const combineGlyphMaps = () => {
		const iconsGylphMap = [...Object.keys(Ionicons.glyphMap).map((name) => `ion-${name}`), ...Object.keys(FontAwesome.glyphMap).map((name) => `fa-${name}`)];
		return iconsGylphMap;
	};

	const getIconName = (input) => {
		const sanitizedInput = input.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
		const matchingIcons = combinedGlyphMap.filter((name) => name.split("-").slice(1).join("-").includes(sanitizedInput));

		return matchingIcons.length > 0 && input.length > 0 ? matchingIcons[0] : "fa-question";
	};

	const renderIcon = (iconWithPrefix) => {
		const [prefix, ...iconParts] = iconWithPrefix.split("-");
		const iconName = iconParts.join("-");

		switch (prefix) {
			case "fa":
				return <FontAwesome name={iconName} size={32} color="white" />;
			case "ion":
				return <Ionicons name={iconName} size={32} color="white" />;
			default:
				return <FontAwesome name={iconName} size={32} color="white" />;
		}
	};

	useEffect(() => {
		if (amount) {
			setAmount(validateAndFormatAmount(amount));
		}
	}, [amount]);

	useEffect(() => {
		// Combine glyph maps of imported icons libraries
		setcombinedGlyphMap(combineGlyphMaps());

		// Set default icon
		setIconElement(renderIcon("fa-question"));
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

export default AddTransactionSwiperComponent;
