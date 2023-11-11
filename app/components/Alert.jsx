import { Alert } from "react-native";
import React from "react";

const AlertComponent = (title, message, buttonText) => {
	const displayAlert = () => {
		Alert.alert(
			title,
			message,
			[
				{
					text: buttonText,
				},
			],
			{ cancelable: false }
		);
	};

	return displayAlert();
};

export default AlertComponent;
