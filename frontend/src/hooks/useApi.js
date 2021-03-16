import { useContext } from 'react';
import { ApiContext } from '../contexts/ApiContext.js';

export default function useApi() {
  return useContext(ApiContext);
}
