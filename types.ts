export interface ProductData {
    _id?:number | string,      
    code:string,
    description: string,    
    input: number,    
    output: number,    
    price: number    
  }


  export interface SendData {    
    code:string,
    description: string,    
    input: number,    
    output: number,    
    price: number    
  }
  

  export type FormProps = {
    data: ProductData,
    submit: (body: ProductData) => void
  }
  
  
  export type InputOrOutput ={
    process:'input' | 'output'
  }

  export type FormProductsProps = {
    title?: string,
    dataForm: FormProps,
    
    process: InputOrOutput
    count?:React.ReactNode,
    labelButton?:string,
    children: React.ReactNode
  }

  export type FetchProps ={
    error: string,
    isSucces: boolean,
    isLoading: boolean,
    isFailed: boolean,
    data: ProductData[] | null,//Products | null,
  }