import { View, Text } from "react-native";
import React, { createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const OperationContext = createContext();

export const useOperation = () => useContext(OperationContext);

export const OperationProvider = ({ children }) => {
	const { pb, user } = useContext(AuthContext);

	const createIncome = async (amount) => {
		try {
			// register transaction in db
			const transactionData = {
				user_id: user.record.id,
				type: "income",
				amount: amount,
				date: new Date(),
				description: null,
			};
			await pb.collection("transactionsHistory").create(transactionData);

			// update balance
			const newBalance = parseInt(user.record.balance) + parseInt(amount);
			await pb.collection("users").update(user.record.id, { balance: newBalance });

			return true;
		} catch (error) {
			return [false, console.log(error)];
		}
	};

	const createExpense = (amount) => {};

	const getBalance = () => {};

	const setBalance = () => {};

	return <OperationContext.Provider value={{ createIncome }}>{children}</OperationContext.Provider>;
};
