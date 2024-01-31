const { DataTypes, Model } = require("sequelize");
const instanceSequelize = require("../config/sequelize");

// Criamos a estrutura de nossa tabela de duas maneiras, ambas geram o mesmo resultado


// Primeira maneira
const Planet = instanceSequelize.define("planets", {
  name: DataTypes.STRING,
  position: DataTypes.INTEGER,
});


/*
// Segunda maneira
class Planet extends Model {}

Planet.init(
  {
    name: DataTypes.STRING,
    position: DataTypes.INTEGER,
  },
  {
    // Instância da conexão
    sequelize: instanceSequelize,
    
    // Nome do modelo, que se for igual ao da tabela, vai referenciar a tabela
    // se for diferente, será necessário dizer a qual tabela este modelo pertence
    modelName: "planets",
  }
);
*/

module.exports = Planet;
