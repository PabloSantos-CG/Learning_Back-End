const Teacher = require("../models/teachers");

module.exports = {
  async getAllTeachers(req, res) {
    try {
      const teachers = await Teacher.findAll();
      return res.status(200).json(teachers);
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
  async createTeacher(req, res) {
    try {
      const requiredProperties = [
        "name",
        "cpf",
        "dateOfBirth",
        "street",
        "district",
        "city",
        "state",
        "cep",
        "email",
      ];

      const allPropertiesExist = requiredProperties.every((prop) =>
        req.body.hasOwnProperty(prop)
      );

      if (!allPropertiesExist)
        return res.json({ message: "Propriedades incompletas." });

      const {
        name,
        cpf,
        dateOfBirth,
        street,
        district,
        city,
        state,
        cep,
        email,
      } = req.body;

      const existingTeacher = await Teacher.findOne({ where: { name, cpf } });

      if (existingTeacher) {
        return res.status(400).json({ message: "Professor com esse CPF já existe." });
      }

      const teacher = await Teacher.create({
        name,
        cpf,
        dateOfBirth,
        street,
        district,
        city,
        state,
        cep,
        email,
      });

      return res.status(201).json(teacher);
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
  async getTeacherById(req, res) {
    try {
      const teacher = await Teacher.findByPk(req.params.id);

      if (teacher === null)
        return res.json({ message: "Não foi possível encontrar o professor." });

      return res.status(200).json({ teacher });
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
  async updateTeacher(req, res) {
    try {
      const teacherValidation = await Teacher.findByPk(req.params.id);

      if (teacherValidation === null)
        return res.json({ message: "Professor inexistente!" });

      const { id } = req.params;
      const {
        name,
        cpf,
        dateOfBirth,
        street,
        district,
        city,
        state,
        cep,
        email,
      } = req.body;

      const teacher = await Teacher.update(
        { name, cpf, dateOfBirth, street, district, city, state, cep, email },
        { where: { id }, returning: true }
      );

      return res.json(teacher[1]);
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
  async deleteTeacher(req, res) {
    try {
      await Teacher.destroy({ where: { id: req.params.id } });
      return res.status(204).send();
    } catch (error) {
      console.log("Ocorreu um erro :(\n", error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
