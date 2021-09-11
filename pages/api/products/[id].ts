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
    data?:ProductData | {}
  }
  

dbConnect();

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse <ResponseData>
    ){
        const {
            query: { id },
            method,
          } = req;
        
          switch (method) {
            case 'GET':
              try {
                const productList = await Inventory.findById(id);
                if (!productList) {
                  return res.status(400).json({
                    success: false,
                  });
                }
                res.status(200).json({
                  success: true,
                  data: productList,
                });
              } catch (error) {
                res.status(400).json({
                  success: false,
                });
              }
              break;
            case 'PUT':
              try {
                const updateProduct = await Inventory.findByIdAndUpdate(id, req.body, {
                  new: true,
                  runValidators: true,
                });
                if (!updateProduct) {
                  return res.status(400).json({
                    success: false,
                  });
                }
                res.status(200).json({
                  success: true,
                  data: updateProduct,
                });
              } catch (error) {
                res.status(400).json({
                  success: false,
                });
              }
              break;
            case 'DELETE':
              try {
                const delProduct = await Inventory.deleteOne({ _id: id });
                //console.log("********** ", delProduct)

                if (delProduct.deletedCount === 0) {
                  return res.status(400).json({
                    success: false,
                  });
                }

                res.status(200).json({
                  success: true,
                  data: {},
                });
              } catch (error) {
                res.status(401).json({
                  success: false,
                });
              }
              break;
            default:
              res.status(500).json({
                success: false,
              });
          }
};
