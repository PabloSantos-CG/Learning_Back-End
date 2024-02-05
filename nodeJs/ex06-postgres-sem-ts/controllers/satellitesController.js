const Planet = require("../models/Planet");
const Sattelites = require("../models/Satellites");

module.exports  = {
  async create_Satellite(req, res) {
    try {
      const { name, serialNumber, planetId } = req.body;
      const planet =  await Planet.findByPk(planetId);

      if(!planet) {
        throw new Error("Planeta inexistente!");
      }

      await Sattelites.create({ name, serialNumber, planetId });
      return res.status(201).json({ name, serialNumber, planetId });
      
    } catch (error) {
      res.status(422).json({ error: error.message });
      console.log("Ocorreu um erro :(\n", error);
    }
  },

  async read_One_Satellite(req, res) {
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

  async update_Satellite(req, res) {
    try {
      const { name, serialNumber } = req.body;
      
      await Sattelites.update({ name, serialNumber }, { where: { id: req.params.id } });
      res.status(200);
      
    } catch (error) {
      res.status(422).json({ error: error.message });
      console.log("Ocorreu um erro :(\n", error);
    }
  },

  async delete_Satellite(req, res) {
    try {
      await Sattelites.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Planeta deletado com sucesso!" });

    } catch (error) {
      res.status(422);
      console.log("Ocorreu um erro :(\n", error);
    }
  },
};