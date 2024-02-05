const Captain = require("../models/captain");

module.exports = {
  async create_Captain(req, res) {
    try {
      const { name, fromPlanet } = req.body;
      
      const cap = await Captain.create({ name, fromPlanet });
      return res.status(200).json(cap);
    
    } catch (error) {
      res.status(422).json({ error: error.message });
      console.log("Ocorreu um erro :(\n", error);
    }
  },
  async read_One_Captain(req, res) {
    try {
      const captain = await Captain.findByPk(req.params.id, {
        include: { association: "spaceships" },
      });

      if (captain) {
        return res.status(200).json(captain);
      } else {
        throw new Error("Não foi possível encontrar o Capitão.");
      }
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
    }
  },
  async read_All_Captains(req, res) {
    try {
      const cap = await Captain.findAll();
      return res.status(200).json(cap);
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
    }
  },
  async update_Captain(req, res) {
    try {
      const { name, fromPlanet } = req.body;

      const captain = await Captain.update(
        { name, fromPlanet },
        { where: { id: req.params.id } }
      );
      return res.status(200).json(captain);

    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
    }
  },
  async delete_Captain(req, res) {
    try {
      await Captain.destroy({ where: { id: req.params.id } });
      res.json({ message: "Planeta deletado com sucesso!" });
    } catch (error) {
      res.status(422);
      console.log("Ocorreu um erro :(\n", error);
    }
  },
};
