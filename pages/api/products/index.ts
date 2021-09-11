// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/dbConnect'
import Inventory from '../../../models/inventory'

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

  const { method } = req;
  switch (method) {
    case 'GET': {
      try {
        const productList = await Inventory.find();
        if (!productList) {
          return res.status(402).json({
            success: false          
          });
        }
        res.status(200).json({
          success: true,
          data: productList,
        });
      } catch (error) {
        res.status(400).json({
          success: false       
        });
      }
      break;
    }
    case 'POST':
    {
      try {
        //console.log(req.body);
        // como pueden ser uno o varios docs, se usa create
        const saveProduct = await Inventory.create(req.body); // newProduct.save();
        if (!saveProduct) {
          return res.status(400).json({
            success: false                
          });
        }
        res.status(200).json({
          success: true,
          data: saveProduct,
        });
      } catch (error) {
        res.status(400).json({
          success: false        
        });
      }
      break;
    }
    default: {
      res.status(403).json({
        success: false        
      });
    }
  }

  
}
