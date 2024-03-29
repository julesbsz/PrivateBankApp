// Packages
import { View, StyleSheet, Text } from "react-native";
import { useRef, useCallback, useState } from "react";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop } from "@gorhom/bottom-sheet";

// Components
import CardComponent from "../components/Card";
import AddTransactionComponent from "../components/AddTransactionButton";
import AddTransactionSwiperComponent from "../components/AddTransactionSwiper";
import TransactionsListComponent from "../components/TransactionsList";

const HomePage = () => {
	const bottomSheetModalRef = useRef(null);
	const [snapPoints, setSnapPoints] = useState(["75%", "75%"]);

	const updateSnapPoints = (newSnapPoints) => {
		setSnapPoints(newSnapPoints);
	};

	const renderBackdrop = useCallback((props) => {
		return <BottomSheetBackdrop {...props} opacity={0.6} appearsOnIndex={0} disappearsOnIndex={-1} />;
	}, []);

	return (
		<BottomSheetModalProvider>
			<View style={styles.container}>
				<CardComponent />

				<TransactionsListComponent />

				<View style={styles.containerTransactionBtn}>
					<AddTransactionComponent bottomSheetModalRef={bottomSheetModalRef} updateSnapPoints={updateSnapPoints} />
				</View>
			</View>

			<BottomSheetModal backdropComponent={renderBackdrop} handleIndicatorStyle={{ backgroundColor: "#C9C8C9", width: 60, height: 7 }} backgroundStyle={{ backgroundColor: "#262329" }} ref={bottomSheetModalRef} index={1} snapPoints={snapPoints}>
				<AddTransactionSwiperComponent updateSnapPoints={updateSnapPoints} bottomSheetModalRef={bottomSheetModalRef} />
			</BottomSheetModal>
		</BottomSheetModalProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 20,
		paddingBottom: 50,
		paddingLeft: 20,
		paddingRight: 20,
		height: "100%",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
		backgroundColor: "#141316",
		gap: 40,
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
	modalContainer: {
		backgroundColor: "#262329",
	},
	pagerView: {
		flex: 1,
	},
});

export default HomePage;
