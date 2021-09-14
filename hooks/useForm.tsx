import React, { useState } from 'react';
import { ProductData } from '../types';

const backStateCode = { code: '' };

type FormProps = {
    data:ProductData,
    submit:(body:ProductData)=>void
}

type FormError = {
  [k:string] : string  
}

export default function useForm({data, submit}:FormProps) {
  const [stateForm, setStateForm] = useState<ProductData>(data);    
  const [error, setError] = useState<FormError>({});

  const isChangeData = () => {    
    if (stateForm.code !== backStateCode.code) {
      //console.log('son diferentes true');
      backStateCode.code = stateForm.code;
      return true;
    }

    return false;
  };

  const validation = () => {
    const tempError:{[k:string] : string } = {};
    // state debe contener datos
    Object.entries(stateForm).forEach(([key, value]) => {
      if (value === '') {        
        tempError[key] = (`${key} no puede estar vacio`);
      } else if (key === 'price' || key === 'input' || key === 'output') {        
        //console.log("valor enviado a price", value)
        if (isNaN(parseFloat(value)) ) {                            
            tempError[key] = (`${key} debe ser un valor numerico`);          
        }
      }
    });
    return tempError;
  };

  const handleSubmit =  (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validation();
    setError(validationErrors);
    // console.log(validationErrors);
    if (Object.entries(validationErrors).length === 0) {
      if (isChangeData()) {
        submit(stateForm);
      }
    }
  };

  const handleChange = (event:React.FormEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    //event.persist();    
    setStateForm({ ...stateForm, [event.currentTarget.name]: event.currentTarget.value });
  };

  return { stateForm, handleChange, handleSubmit, error};
}
