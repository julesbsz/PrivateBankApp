import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";
import ButtonComponent from "./Button";
import { useOperation } from "../context/OperationContext";
import AlertComponent from "./Alert";

const AddTransactionSwiperComponent = ({ bottomSheetModalRef }) => {
	const { createIncome, createExpense } = useOperation();

	const activeTabIndex = useSharedValue(0);
	const [operation, setOperation] = useState("income");
	const [amout, setAmout] = useState(null);

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
		setAmout(number);
	};

	const handleDismissModalPress = useCallback(() => {
		bottomSheetModalRef.current?.dismiss();
	}, [bottomSheetModalRef]);

	const handleOperation = () => {
		if (operation === "income") {
			const success = createIncome(amout);

			if (!success) {
				AlertComponent("Error", "Unable to create your income operation, please try again later.", "OK");
			}
		}

		if (operation === "expense") {
			const success = createExpense(amout);

			if (!success) {
				AlertComponent("Error", "Unable to create your expense operation, please try again later.", "OK");
			}
		}

		handleDismissModalPress();
	};

	return (
		<View style={styles.mainContainer}>
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
					<TextInput style={styles.input} onChangeText={onChangeAmount} value={amout} placeholder="AMOUNT" keyboardType="numeric" autoCorrect={false} autoFocus={true} />
					{/* {amout && <Text style={styles.currency}>$</Text>} */}
				</View>

				{amout ? <ButtonComponent content={"Save"} onPressAction={handleOperation} /> : <ButtonComponent content={"Save"} disabled={true} />}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		marginTop: 20,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
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
