const Captain = require("../models/captain");

module.exports = {
  async create_Captain(req, res) {
    try {
      const { name, fromPlanet } = req.body;
      
      const cap = await Captain.create({ name, fromPlanet });
      return res.status(201).json(cap);
    
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
      if(error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
  async read_One_Captain(req, res) {
    try {
      const captain = await Captain.findByPk(req.params.id, {
        include: { association: "spaceships" },
      });

      if(captain === null) return res.status(404).json({ message: "Não foi possível encontrar o Capitão."});

      return res.status(200).json(captain);
      
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
      if(error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
  async read_All_Captains(req, res) {
    try {
      const cap = await Captain.findAll({
        include: [{ 
          association: "spaceships", 
          attributes: ["name", "serialNumber"] 
        }],
      });

      return res.status(200).json(cap);

    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
      if(error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
  async update_Captain(req, res) {
    try {
      const { id } = req.params;
      const { name, fromPlanet } = req.body;

      const [rowsAffected, captain] = await Captain.update(
        { name, fromPlanet },
        { where: { id }, returning: true }
      );

      return res.status(200).json(captain);

    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
      if(error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
  async delete_Captain(req, res) {
    try {
      const { id } = req.params;
      await Captain.destroy({ where: { id } });
      
      return res.status(204).send();

    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
      if(error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
