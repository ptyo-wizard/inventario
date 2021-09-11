import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';
import Inventory from '../../../models/inventory';



interface ProductData {
  _id?:number | string,      
  code:string,
  description: string,    
  input: number,    
  output: number,    
  price: number    
}

type ResponseData = {
  success:boolean,
  data?:ProductData[]
}


dbConnect();


export default async function handler (
  req:NextApiRequest, 
  res:NextApiResponse<ResponseData>
  ){
  // console.log('routa de api', req.method);
  const { method } = req;
  switch (method) {
    case 'GET': {
      try {
        const outputList = await Inventory.find({ output: { $gte: 1 } });
        if (!outputList) {
          return res.status(400).json({
            success: false,
          });
        }
        res.status(200).json({
          success: true,
          data: outputList,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
        });
      }
      break;
    }
    default: {
      res.status(400).json({
        success: false,
      });
    }
  }
  
};
