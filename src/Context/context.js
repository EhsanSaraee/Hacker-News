import axios from 'axios';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { REMOVE_STORY, SET_LOADING, SET_STORIES } from '../Redux/actions';
import reducer from '../Redux/reducer';

const API_ENDPOINT = 'http://hn.algolia.com/api/v1/search?';

const initialState = {
   isLoading: true,
   hits: [],
   query: 'react',
   page: 0,
   nbPages: 0,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, initialState);

   const fetchStories = async (url) => {
      dispatch({ type: SET_LOADING });
      try {
         const { data } = await axios.get(url);
         dispatch({
            type: SET_STORIES,
            payload: { hits: data.hits, nbPages: data.nbPages },
         });
      } catch (error) {
         console.log(error);
      }
   };
   const { page, query } = state;

   const removeStory = (id) => {
      dispatch({ type: REMOVE_STORY, payload: id });
   };

   useEffect(() => {
      fetchStories(`${API_ENDPOINT}query=${query}&page=${page}`);
   }, [query, page]);

   return (
      <AppContext.Provider value={{ ...state, removeStory }}>
         {children}
      </AppContext.Provider>
   );
};
// make sure use
export const useGlobalContext = () => useContext(AppContext);

export { AppProvider };
