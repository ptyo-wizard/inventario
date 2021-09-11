import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  code:
  {
    type: String,
    required: [true, 'please add e code'],
    unique: true,
    trim: true,
  },
  description:
  {
    type: String,
    required: [true, 'please add e description'],
    trim: true,
    maxlenght: [200, 'Description cannot be more than 200 characters'],
  },
  input:
  {
    type: Number,
  },
  output:
  {
    type: Number,
  },
  price:
  {
    type: Number,
  },

},
{   timestamps:true}
);
// si no existe el modelo mongoose.models, evita error oeverwrite model
export default (mongoose.models.Inventory || mongoose.model('Inventory', inventorySchema));

/*
-codigo
descripcion
entrada
salida
saldo -> se calcula en el cliente al recibir input - output
precio

*/
