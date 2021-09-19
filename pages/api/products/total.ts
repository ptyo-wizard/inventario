import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';
import Inventory from '../../../models/inventory';

dbConnect();

//Actividad.find({$and: [{fecha: {$gte: new Date(fechaInicial), $lt: new Date(fechaFinal)}}]}, (err, actividad) => {
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  // console.log('routa de api', req.method);
  const { method } = req;
  const {startDate, endDate} = req.body;  
  console.log("fechas", typeof startDate, endDate)
  const startDate2 = startDate.split('T')[0];
  const endDate2 = endDate.split('T')[0];
  switch (method) {
    case 'POST': {
      try {
        const dateRange = await Inventory.find(
            {createdAt: {
                $lte:endDate2,
                $gte: startDate2
             }
            }
        );
        if (!dateRange) {
          return res.status(400).json({
            success: false,
          });
        }
        //console.log("api total ",dateRange);
        res.status(200).json({
          success: true,
          data: dateRange,
        });
      } catch (error) {
        res.status(500).json({
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
