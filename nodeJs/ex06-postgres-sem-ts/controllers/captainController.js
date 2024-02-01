const Captain =  require("../models/captain");

module.exports = {
  async create_Captain(req, res) {
    try {
      const { name, fromPlanet } = req.body;

      if (name && fromPlanet) {
        const cap = await Captain.create({ name, position });
        res.status(201).json(cap);
      } else {
        throw new Error(
          "Você possivelmente não informou o name e fromPlanet, então não foi possível criar um novo captão"
        );
      }
    } catch (error) {
      res.status(422).json({ error: error.message });
      console.log("Ocorreu um erro :(\n", error);
    }
  },
  async read_All_Captain(req, res) {
    try {
      const cap = await Captain.findAll();
      res.status(200).json(cap);
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
    }
  },
}