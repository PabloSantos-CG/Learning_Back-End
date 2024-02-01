const Planet = require("../models/Planet");
const Sattelites = require("../models/Satellites");

module.exports  = {
  async create_Satellites(req, res) {
    try {
      const { name, serialNumber } = req.body;
      const planet =  await Planet.findByPk(req.params.id);

      if(!planet) {
        throw new Error("Planeta inexistente!");
      }

      if (name && serialNumber) {
        await Sattelites.create({ name, serialNumber, planetId: req.params.id });
        res.status(201).json({ name, serialNumber });
      } else {
        throw new Error(
          "Você deve informar o name e serialNumber!"
        );
      }

    } catch (error) {
      res.status(422).json({ error: error.message });
      console.log("Ocorreu um erro :(\n", error);
    }
  },

  async read_One_Satellites(req, res) {
    try {
      const satellite = await Sattelites.findByPk(req.params.id);

      if (satellite) {
        res.status(200).json(satellite);
      } else {
        throw new Error("Não foi possível encontrar o Satélite.");
      }

    } catch (error) {
      res.status(422).json({ error: error.message });
      console.log("Ocorreu um erro :(\n", error);
    }
  },

  async read_All_Satellites(req, res) {
    try {
      const satellites = await Sattelites.findAll();
      res.status(200).json(satellites);

    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
    }
  },

  async update_Satellites(req, res) {
    try {
      const { name, serialNumber } = req.body;

      if(name && serialNumber) {
        await Sattelites.update({ name, serialNumber }, { where: { id: req.params.id } });
        res.json({ message: "Planeta atualizado com sucesso!" });
      } else {
        throw new Error("Você deve informar o name e o serialNumber!");
      }
      
    } catch (error) {
      res.status(422).json({ error: error.message });
      console.log("Ocorreu um erro :(\n", error);
    }
  },

  async delete_Satellites(req, res) {
    try {
      await Sattelites.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Planeta deletado com sucesso!" });

    } catch (error) {
      res.status(422);
      console.log("Ocorreu um erro :(\n", error);
    }
  },
};