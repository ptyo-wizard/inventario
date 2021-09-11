import mongoose from 'mongoose';
console.log("intentando db")

type Connection ={
    isConnected?:number
}

const connection:Connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  //console.log("db conection ********* ", process.env.MONGO_URI)

  const db = await mongoose.connect(
    process.env.MONGO_URI!,
    
    {      
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });

  // conexion mediante prototypes,

  connection.isConnected = db.connections[0].readyState;
  console.log('CONEXION A DB ', connection.isConnected);
  // 0 = disconnected
  // 1 = connected
  // 2 = connecting
  // 3 = disconnecting
}

export default dbConnect;
