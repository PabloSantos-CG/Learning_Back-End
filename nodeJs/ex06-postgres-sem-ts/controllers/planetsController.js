const Planet = require("../models/Planet");
const Satellites =  require("../models/Satellites");

module.exports = {
  async create_Planet(req, res) {
    try {
      const { name, position } = req.body;

      if (name && position) {
        await Planet.create({ name, position });
        res.status(201).json({ name, position });
      } else {
        throw new Error(
          "Você possivelmente não informou o name e position, então não foi possível criar o planeta"
        );
      }
    } catch (error) {
      res.status(422).json({ error: error.message });
      console.log("Ocorreu um erro :(\n", error);
    }
  },

  async read_One_Planet(req, res) {
    try {
      const planet = await Planet.findByPk(req.params.id, {
        include: Satellites
      });
      if (planet) {
        res.status(200).json(planet);
      } else {
        throw new Error("Não foi possível encontrar o planeta.");
      }
    } catch (error) {
      res.status(422).json({ error: error.message });
      console.log("Ocorreu um erro :(\n", error);
    }
  },

  async read_All_Planet(req, res) {
    try {
      const planets = await Planet.findAll();
      res.status(200).json(planets);
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
    }
  },

  async update_Planet(req, res) {
    try {
      const { name, position } = req.body;
      await Planet.update({ name, position }, { where: { id: req.params.id } });
      res.json({ message: "Planeta atualizado com sucesso!" });
      
    } catch (error) {
      res.status(422);
      console.log("Ocorreu um erro :(\n", error);
    }
  },

  async delete_Planet(req, res) {
    try {
      await Planet.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Planeta deletado com sucesso!" });

    } catch (error) {
      res.status(422);
      console.log("Ocorreu um erro :(\n", error);
    }
  },
};
