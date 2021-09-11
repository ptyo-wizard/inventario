import dbConnect from '../../../utils/dbConnect';
import Inventory from '../../../models/inventory';
import { NextApiRequest, NextApiResponse } from 'next';

dbConnect();

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


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // console.log('routa de api', req.method);
  const { method } = req;
  switch (method) {
    case 'GET': {
      try {
        const inputList = await Inventory.find({ input: { $gte: 1 } });
        if (!inputList) {
          return res.status(402).json({
            success: false,
          });
        }
        res.status(200).json({
          success: true,
          data: inputList,
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
