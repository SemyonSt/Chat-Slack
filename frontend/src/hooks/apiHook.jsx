import { useContext } from 'react';
import ApiContext from '../context/ApiContext';

const useApi = () => useContext(ApiContext);

export default useApi;
