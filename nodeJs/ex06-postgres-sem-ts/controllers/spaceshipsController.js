const Captain = require("../models/captain");
const Spaceships = require("../models/spaceship");

module.exports = {
  async create_Spaceship(req, res) {
    try {
      const { name, serialNumber } = req.body;

      const [spaceship] = await Spaceships.findOrCreate({
        where: {
          name,
          serialNumber,
        },
      });

      console.log(spaceship);

      return res.json(spaceship);
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
  async read_One_Spaceship(req, res) {
    try {
      const { id } = req.params;
      const spaceship = await Spaceships.findByPk(id, {
        include: { association: "captains" },
      });

      if (spaceship === null) {
        return res
          .status(404)
          .json({
            message:
              "Não foi possível encontrar a espaçonave ou ela não existe",
          });
      }

      return res.status(200).json(spaceship);
    } catch (error) {
      res.json({ message: error.message });
      console.log("Ocorreu um erro :(\n", error);
    }
  },
  async read_All_Spaceships(req, res) {
    try {
      const spaceship = await Spaceships.findAll({
        include: [
          {
            association: "captains",
            attributes: ["name", "fromPlanet"],
          },
        ],
      });

      return res.status(200).json(spaceship);
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
  async update_Spaceship(req, res) {
    try {
      const { id } = req.params;
      const { name, serialNumber } = req.body;

      const spaceship = await Spaceships.update(
        { name, serialNumber },
        { where: { id }, returning: true }
      );

      return res.status(200).json(spaceship);
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
  async delete_Spaceship(req, res) {
    try {
      const { id } = req.params;
      const spaceship = await Spaceships.findByPk(id);

      if (spaceship === null) {
        return res.status(404).json({ message: "Espaçonave inexistente!" });
      }

      await Spaceships.destroy({ where: { id } });
      return res.status(204).send();
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
  async addCaptain(req, res) {
    try {
      const { spaceId } = req.params;
      const { capId } = req.body;
      const spaceship = await Spaceships.findByPk(spaceId);
      const captain = await Captain.findByPk(capId);

      if (spaceship === null || captain === null) {
        return res
          .status(404)
          .json({ message: "Captião ou espaçonave inexistente!" });
      }

      const captainAdded = await spaceship.addCaptain(captain);
      return res.status(201).json(captainAdded);

    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
      
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
  async removeCaptain(req, res) {
    try {
      const { spaceId } = req.params;
      const { capId } = req.body;
      const spaceship = await Spaceships.findByPk(spaceId);
      const captain = await Captain.findByPk(capId);

      if (spaceship === null || captain === null) {
        return res
          .status(404)
          .json({ message: "Captião ou espaçonave inexistente!" });
      }

      await spaceship.removeCaptain(captain);
      return res.status(204).send();

    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
      
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
