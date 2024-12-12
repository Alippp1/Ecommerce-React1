import { createContext, useState } from 'react';

const DarkModeContext = createContext();

// eslint-disable-next-line react/prop-types
const DarkModeContextProvider = ({children}) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    return(
        <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    )
}

export const DarkMode = DarkModeContext;
export default DarkModeContextProvider;