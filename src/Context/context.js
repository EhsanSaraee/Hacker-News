import { createContext, useContext } from 'react';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?';

const initialState = {};

const AppContext = createContext();

const AppProvider = ({ children }) => {
   return <AppContext.Provider value="hello">{children}</AppContext.Provider>;
};
// make sure use
export const useGlobalContext = () => {
   return useContext(AppContext);
};

export { AppProvider };
