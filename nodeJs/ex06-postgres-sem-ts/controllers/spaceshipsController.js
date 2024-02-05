const Spaceships = require("../models/spaceship");
const Captain = require("../models/captain");

module.exports = {
  async create_Spaceship(req, res) {
    try {
      const { name, serialNumber } = req.body;
      const cap = await Captain.findByPk(req.params.id);

      if (!cap) {
        throw new Error("Este capitão não existe!");
      }

      const [spaceship]= await Spaceships.findOrCreate({
        where: {
          name,
          serialNumber
        }
      });
      await cap.addSpaceships(spaceship);
      return res.json(spaceship);

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
        throw new Error("Não foi possível encontrar a espaçonave ou ela não existe");
      }
    } catch (error) {
      res.json({ message: error.message });
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

      const spaceship = await Spaceships.update(
        { name, serialNumber },
        { where: { id: req.params.id } }
      );
      return res.status(200).json(spaceship);
      
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
