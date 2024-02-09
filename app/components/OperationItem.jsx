import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

const OperationItemComponent = ({ description, date, amount, type, icon }) => {
	const [formattedDate, setFormattedDate] = React.useState(null);
	const [iconElement, setIconElement] = React.useState(null);

	const formatDateTime = (dateStr) => {
		const date = new Date(dateStr);
		const now = new Date();

		const yyyyMMdd = date.toISOString().split("T")[0];
		const hhMM = date.toISOString().split("T")[1].substring(0, 5);

		const today = now.toISOString().split("T")[0];
		const yesterday = new Date(now.setDate(now.getDate() - 1)).toISOString().split("T")[0];

		if (yyyyMMdd === today) {
			return hhMM;
		} else if (yyyyMMdd === yesterday) {
			return `Yesterday at ${hhMM}`;
		} else {
			return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} - ${hhMM}`;
		}
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
		setFormattedDate(formatDateTime(date));
		setIconElement(renderIcon(icon));
		console.log("icon", icon);
	}, []);

	return (
		<View style={styles.container}>
			<View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 15 }}>
				{iconElement && iconElement}

				<View style={styles.infoContainer}>
					<Text style={styles.title}>{description}</Text>
					<Text style={styles.time}>{formattedDate}</Text>
				</View>
			</View>

			<Text style={[styles.amount, type === "income" ? styles.green : styles.red]}>
				{type === "income" ? "+" : "-"} ${amount}
			</Text>
		</View>
	);
};

export default OperationItemComponent;

const styles = StyleSheet.create({
	container: {
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: "#262329",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		height: 75,
		width: "100%",
		borderRadius: 16,
	},
	infoContainer: {
		display: "flex",
		flexDirection: "column",
		gap: 5,
	},
	title: {
		color: "white",
		fontSize: 16,
		fontWeight: "semibold",
	},
	time: {
		color: "#AFAFAF",
		fontSize: 14,
		fontWeight: "normal",
	},
	amount: {
		color: "#FA4747",
		fontSize: 18,
		fontWeight: "semibold",
	},
	green: {
		color: "#07C57D",
	},
	red: {
		color: "#FA4747",
	},
});
