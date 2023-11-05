// Packages
import { View, StyleSheet, Text } from "react-native";
import React, { useRef, useMemo, useCallback } from "react";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";

// Components
import CardComponent from "../components/Card";
import AddTransactionComponent from "../components/AddTransaction";

// Styles
import global from "../../assets/style";

const HomePage = () => {
	const bottomSheetModalRef = useRef(null);
	const snapPoints = useMemo(() => ["75%", "75%"], []);

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const handleSheetChanges = useCallback((index) => {
		console.log("handleSheetChanges", index);
	}, []);

	return (
		<BottomSheetModalProvider>
			<View style={styles.container}>
				<CardComponent />

				<View style={styles.containerTransactionBtn}>
					<AddTransactionComponent bottomSheetModalRef={bottomSheetModalRef} />
				</View>
			</View>

			<BottomSheetModal ref={bottomSheetModalRef} index={1} snapPoints={snapPoints} onChange={handleSheetChanges}>
				<View style={styles.contentContainer}>
					<Text>Awesome 🎉</Text>
				</View>
			</BottomSheetModal>
		</BottomSheetModalProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 20,
		paddingBottom: 50,
		paddingLeft: 10,
		paddingRight: 10,
		height: "100%",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#141316",
	},
	innerContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: "auto",
		gap: "40px",
	},
	image: {
		width: "100%",
		height: "40%",
	},
	containerTransactionBtn: {
		position: "absolute",
		bottom: 40,
		width: "100%",
		display: "flex",
		alignItems: "center",
	},
});

export default HomePage;
