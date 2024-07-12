import { createContext, useContext, useState } from 'react';

const searchContext = createContext();

const SearchProvider = ({ children }) => {
    const [values, setValues] = useState({
        keyword: '',
        results: []
    });
    return (
        <searchContext.Provider value={[values, setValues]}>
            {children}
        </searchContext.Provider>
    )

}

//custom context provider like an hook
const useSearchProvider = () => useContext(searchContext);
export { useSearchProvider, SearchProvider }