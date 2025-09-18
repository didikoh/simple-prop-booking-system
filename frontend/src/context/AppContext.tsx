import { createContext, useContext, useState } from 'react';

interface AppContextProps {
    loadingSpinner: boolean;
    setLoadingSpinner: (value: boolean) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [loadingSpinner, setLoadingSpinner] = useState(false);

    return (
        <AppContext.Provider value={{ loadingSpinner, setLoadingSpinner }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useAppContext must be used within AppProvider');
    return context;
};