import Toast from "react-native-toast-message";

const ToastComponent = (type, title) => {
	console.log(`ToastComponent-> ${type} ${title}`);

	Toast.show({
		type,
		text1: title,
		text2: "",
	});
};

export default ToastComponent;
