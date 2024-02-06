import { Request, Response } from "express";
import { Candidate } from "../models/candidates";

export const candidatesController = {
  index: async (req: Request, res: Response) => {
    try {
      const candidates = await Candidate.findAll();
      return res.json(candidates);
    } catch (error) {
      res.status(400);
    }
  },
  save: async (req: Request, res: Response) => {
    try {
      const { name, email, bio, phone, openToWork } = req.body;
      const candidate = await Candidate.create({
        name,
        email,
        bio,
        phone,
        openToWork,
      });

      return res.status(201).json(candidate);
    } catch (error) {
      console.log(error);
      return res.status(400);
    }
  },
  show: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const candidate = await Candidate.findByPk(id);

      if (candidate === null) {
        return res.status(404).json({ message: "Candidato não encontrado" });
      }

      return res.json(candidate);
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

      const candidate = await Candidate.findByPk(id);

      if (candidate === null) {
        return res.status(404).json({ message: "Candidato não encontrado" });
      }

      await Candidate.update(
        { name, email, bio, phone, openToWork },
        { where: { id } }
      );
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

      await Candidate.destroy({ where: { id } });
      res.status(204);

    } catch (error) {
      console.log(error);
      res.status(400);
    }
  },
};
