"use client";
import { createContext, useContext, useState } from "react";

interface MenuContextType {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuContext = createContext<MenuContextType>({
	isOpen: false,
	setIsOpen: () => {},
});

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<MenuContext.Provider value={{ isOpen, setIsOpen }}>
			{children}
		</MenuContext.Provider>
	);
};

export const useMenu = () => useContext(MenuContext);
