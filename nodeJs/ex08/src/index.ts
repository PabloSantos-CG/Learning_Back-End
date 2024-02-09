import { sequelize } from "./database";

const test = async (req?: any, res?: any) => {
  await sequelize
    .authenticate()
    .then(() => {
      console.log('Conexão bem-sucedida!');
    })
    .catch((error) => {
      console.error('Erro na conexão:', error);
    });
  
}

test();