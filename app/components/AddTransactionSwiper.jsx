import React, { useRef } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import PagerView from "react-native-pager-view";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";

const AddTransactionSwiperComponent = () => {
	const pagerRef = useRef(null);
	const activeTabIndex = useSharedValue(0);

	const handleTabPress = (tabIndex) => {
		pagerRef.current.setPage(tabIndex);
		activeTabIndex.value = tabIndex;
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

			<PagerView style={styles.pagerView} initialPage={0} ref={pagerRef}>
				<View key="1" style={styles.page}>
					<Text>First page</Text>
				</View>
				<View key="2" style={styles.page}>
					<Text>Second page</Text>
				</View>
			</PagerView>
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
		backgroundColor: "white",
		width: "100%",
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	// page: {
	// 	flex: 1,
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// 	height: "100%",
	// 	width: "100%",
	// },
});

export default AddTransactionSwiperComponent;
