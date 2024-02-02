const Spaceships = require("../models/spaceship");

module.exports = {
  async create_Spaceship(req, res) {
    try {
      const { name, serialNumber } = req.body;

      if (name && serialNumber) {
        const spaceship = await Spaceships.create({ name, serialNumber });
        res.status(201).json(spaceship);
      } else {
        throw new Error(
          "Você possivelmente não informou o name e serialNumber, então não foi possível criar um novo captão"
        );
      }
    } catch (error) {
      res.status(422).json({ error: error.message });
      console.log("Ocorreu um erro :(\n", error);
    }
  },
  async read_One_Spaceship(req, res) {
    try {
      const spaceship = await Spaceships.findByPk(req.params.id, {
        include: { association: "captains" },
      });

      if (spaceship) {
        res.status(200).json(spaceship);
      } else {
        throw new Error("Não foi possível encontrar a espaçonave.");
      }
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
    }
  },
  async read_All_Spaceships(req, res) {
    try {
      const spaceship = await Spaceships.findAll();
      res.status(200).json(spaceship);
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
    }
  },
  async update_Spaceship(req, res) {
    try {
      const { name, serialNumber } = req.body;

      if (name && serialNumber) {
        const spaceship = await Spaceships.update(
          { name, serialNumber },
          { where: { id: req.params.id } }
        );
        res.status(200).json(spaceship);
      } else {
        throw new Error("Você deve informar 'name' e 'serialNumber'");
      }
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
    }
  },
  async delete_Spaceship(req, res) {
    try {
      await Spaceships.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Espaçonave deletada com sucesso!" });
    } catch (error) {
      res.status(422);
      console.log("Ocorreu um erro :(\n", error);
    }
  },
};
