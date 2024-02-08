const Planet = require("../models/Planet");

module.exports = {
  async create_Planet(req, res) {
    try {
      const { name, position } = req.body;

      const planet = await Planet.create({ name, position });
      return res.status(201).json(planet);
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  async read_All_Planets(req, res) {
    try {
      const planets = await Planet.findAll({
        include: [{
          association: "satellites",
          attributes: ["name", "serialNumber"],
        }],
      });
      res.status(200).json(planets);
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  async read_One_Planet(req, res) {
    try {
      const planet = await Planet.findByPk(req.params.id, {
        include: [{
          association: "satellites",
          attributes: ["name", "serialNumber"],
        }],
      });

      if (planet === null)
        return res.json({ message: "Não foi possível encontrar o planeta." });

      return res.status(200).json({ planet });
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  async update_Planet(req, res) {
    try {
      const { id } = req.params;
      const { name, position } = req.body;

      const planet = await Planet.update(
        { name, position },
        { where: { id }, returning: true }
      );

      return res.json(planet[1]);

    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  async delete_Planet(req, res) {
    try {
      await Planet.destroy({ where: { id: req.params.id } });
      return res.status(204).send();
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
