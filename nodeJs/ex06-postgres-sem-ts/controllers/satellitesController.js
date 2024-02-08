const Planet = require("../models/Planet");
const Sattelites = require("../models/Satellites");

module.exports = {
  async create_Satellite(req, res) {
    try {
      const { name, serialNumber, planetId } = req.body;
      const planet = await Planet.findByPk(planetId);

      if (planet === null)
        return res.status(404).json({ message: "Planeta inexistente!" });

      const satellite = await Sattelites.create({
        name,
        serialNumber,
        planetId,
      });
      return res.status(201).json(satellite);
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  async read_One_Satellite(req, res) {
    try {
      const { id } = req.params;

      const satellite = await Sattelites.findByPk(id);

      if (satellite === null) {
        return res
          .status(404)
          .json({ message: "Não foi possível encontrar o Satélite." });
      }

      return res.status(200).json(satellite);
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  async read_All_Satellites(req, res) {
    try {
      const satellites = await Sattelites.findAll();

      return res.status(200).json(satellites);
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  async update_Satellite(req, res) {
    try {
      const { name, serialNumber } = req.body;

      const [rowsAffected, satellit] = await Sattelites.update(
        { name, serialNumber },
        { where: { id: req.params.id }, returning: true }
      );

      return res.status(200).json(satellit);
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  async delete_Satellite(req, res) {
    try {
      await Sattelites.destroy({ where: { id: req.params.id } });

      return res.status(204).send();
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
