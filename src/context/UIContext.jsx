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

    const [lenis, setLenis] = useState(null);

    return (
        <UIContext.Provider value={{ isLoading, setIsLoading, isPopupOpen, setIsPopupOpen, lenis, setLenis }}>
            {children}
        </UIContext.Provider>
    );
};

export const useUI = () => useContext(UIContext);
