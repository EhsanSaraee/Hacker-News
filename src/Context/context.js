import { createContext, useContext, useEffect, useReducer } from 'react';
import { SET_LOADING } from '../Redux/actions';
import reducer from '../Redux/reducer';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?';

const initialState = {
   isLoading: true,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, initialState);

   const fetchStories = async (url) => {
      dispatch({ type: SET_LOADING });
   };

   useEffect(() => {
      fetchStories();
   }, []);

   return (
      <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
   );
};
// make sure use
export const useGlobalContext = () => {
   return useContext(AppContext);
};

export { AppProvider };
