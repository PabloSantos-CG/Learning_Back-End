import mongoose, { connect } from 'mongoose';
import "dotenv/config";

const mongoConnect = async () => {
  try {
    console.log("Conectando ao mongoDB...");
    mongoose.Promise = global.Promise;
    await connect(process.env.MONGO_URL as string);
    console.log("Conexão concluída com sucesso! \n;)");

  } catch (error) {
    console.log("Erro de conexão", error);
  }
}

export default mongoConnect();