import { useGlobalContext } from '../Context/context';

const Stories = () => {
   const { isLoading } = useGlobalContext();

   if (isLoading) {
      return <div className="loading"></div>;
   }
   return <h2>stories component</h2>;
};

export default Stories;
