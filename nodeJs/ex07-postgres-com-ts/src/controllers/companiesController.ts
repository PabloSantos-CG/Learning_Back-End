import { Request, Response } from "express";
import { Company } from "../models/companies";

export const companiesController = {
  index: async (req: Request, res: Response) => {
    try {
      const companies = await Company.findAll();
      return res.json(companies);
    } catch (error) {
      res.status(400);
    }
  },
  save: async (req: Request, res: Response) => {
    try {
      const { name, email, bio, phone, openToWork } = req.body;
      const company = await Company.create({
        name,
        email,
        bio,
        phone,
        openToWork,
      });

      return res.status(201).json(company);
    } catch (error) {
      console.log(error);
      return res.status(400);
    }
  },
  show: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const company = await Company.findByPk(id);

      if (company === null) {
        return res.status(404).json({ message: "Candidato não encontrado" });
      }

      return res.json(company);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(400).json({ err: error.message });
      }
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, email, bio, phone, openToWork } = req.body;

      const [affectedRows, company] = await Company.update(
        { name, email, bio, phone, openToWork },
        { where: { id }, returning: true },
      );
      res.status(200).json(company[0]);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(400).json({ err: error.message });
      }
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await Company.destroy({ where: { id } });
      res.status(204).send();

    } catch (error) {
      console.log(error);
      res.status(400);
    }
  },
};
