import { createContext, useContext, useState } from "react";

const UIContext = createContext({
    isLoading: false,
    setIsLoading: () => { },
    isPopupOpen: false,
    setIsPopupOpen: () => { },
});

export const UIProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <UIContext.Provider value={{ isLoading, setIsLoading, isPopupOpen, setIsPopupOpen }}>
            {children}
        </UIContext.Provider>
    );
};

export const useUI = () => useContext(UIContext);
