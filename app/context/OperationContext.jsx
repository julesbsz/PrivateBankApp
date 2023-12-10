import { View, Text } from "react-native";
import React, { createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const OperationContext = createContext();

export const useOperation = () => useContext(OperationContext);

export const OperationProvider = ({ children }) => {
	const { pb, user } = useContext(AuthContext);

	const createOperation = async (type, amount, description) => {
		try {
			console.log("creating op for:", type, amount, description);

			// register transaction in db
			const transactionData = {
				user_id: user.record.id,
				type,
				amount,
				description,
			};
			await pb.collection("transactionsHistory").create(transactionData);

			// update balance
			if (type === "income") {
				const newBalance = Number(user.record.balance) + Number(amount);
				await pb.collection("users").update(user.record.id, { balance: Number(newBalance) });
			}
			if (type === "expense") {
				const newBalance = Number(user.record.balance) - Number(amount);
				await pb.collection("users").update(user.record.id, { balance: Number(newBalance) });
			}

			return true;
		} catch (error) {
			return [false, console.log(error)];
		}
	};

	const getBalance = () => {};

	const setBalance = () => {};

	return <OperationContext.Provider value={{ createOperation }}>{children}</OperationContext.Provider>;
};
