import mongoose, { connect } from 'mongoose';
import "dotenv/config";

const mongoConnect = async () => {
  try {
    console.log("Conectando ao MongoDB...");
    mongoose.Promise = global.Promise;
    await connect(process.env.MONGO_URL as string);
    console.log("Conexão estável");

  } catch (error) {
    console.log("Erro de conexão", error);
  }
}

export default mongoConnect();