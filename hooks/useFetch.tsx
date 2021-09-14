import { useState, useCallback } from 'react';
import fetch from 'isomorphic-unfetch';
import { FetchProps } from '../types';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};



export default function useFetch() {
  
  const [stateFetch, setStateFetch] = useState<FetchProps>({
    error: '',
    isSucces: false,
    isLoading: false,
    isFailed: false,
    data: null,
  });
  
  const resetState =()=>{
    setStateFetch({
      error: '',
      isSucces: false,
      isLoading: true,
      isFailed: false,
      data: null,
    });
  }
  
  const fetchData = useCallback(async ({ url, method, body }) => {
    try {
      setStateFetch({
        error: '',
        isSucces: false,
        isLoading: true,
        isFailed: false,
        data: null,
      });

      const response = await fetch(url, { method, headers, body: JSON.stringify(body) });
      const {success, data } = await response.json();

      if(success){
        setStateFetch({
          error: '',
          isSucces: true,
          isLoading: false,
          isFailed: false,
          data,
        });
      }else if(!success){
        setStateFetch({
          error: '',
          isSucces: true,
          isLoading: false,
          isFailed: true,
          data:[],
        });
      }

      
      
    } catch (error:unknown) {
      //console.log("error en useFetch", error.message)
      const {message} = error as Error;
      setStateFetch({
        error: message,
        isSucces: false,
        isLoading: false,
        isFailed: true,
        data: null,
      });
    }
  }, []);

  return { stateFetch, fetchData,resetState};
}
