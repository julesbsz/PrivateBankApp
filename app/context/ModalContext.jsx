import React, { createContext, useRef, useCallback, useContext } from "react";

export const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
	const bottomSheetModalRef = useRef(null);

	const handlePresentModal = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const handleDismissModal = useCallback(() => {
		console.log("dismiss");
		bottomSheetModalRef.current?.dismiss();
	}, []);

	return <ModalContext.Provider value={{ handlePresentModal, handleDismissModal, bottomSheetModalRef }}>{children}</ModalContext.Provider>;
};
