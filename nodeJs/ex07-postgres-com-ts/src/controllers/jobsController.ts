import { Request, Response } from "express";
import { Job } from "../models";

export const jobsController = {
  index: async (req: Request, res: Response) => {
    try {
      const jobs = await Job.findAll({
        include: [
          {
            association: "company",
            attributes: ["name", "website", "email"],
          },
          {
            association: "candidates",
            attributes: ["name", "email", "bio"],
          },
        ],
      });

      return res.json(jobs);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  },
  save: async (req: Request, res: Response) => {
    try {
      const { title, description, limitDate, companyId } = req.body;
      const job = await Job.create({
        title,
        description,
        limitDate,
        companyId,
      });

      return res.status(201).json(job);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  },
  show: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const job = await Job.findByPk(id, {
        include: [
          {
            association: "company",
            attributes: ["name", "website", "email"],
          },
          {
            association: "candidates",
            attributes: ["name", "email", "bio"],
          },
        ],
      });

      if (job === null) {
        return res.status(404).json({ message: "Candidato não encontrado" });
      }

      const candidateCount = await job.countCandidates();

      //isso vai retornar um objeto json com todas as colunas de job e uma prop countCandidates que vai ser a quantidade de candidatos inscritos
      return res.json({ ...job.get(), candidateCount });
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
      const { title, description, limitDate, companyId } = req.body;

      const [affectedRows, jobs] = await Job.update(
        { title, description, limitDate, companyId },
        { where: { id }, returning: true }
      );
      res.status(200).json(jobs[0]);
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

      await Job.destroy({ where: { id } });
      res.status(204).send();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(400).json({ err: error.message });
      }
    }
  },
  addCandidate: async (req: Request, res: Response) => {
    try {
      const jobId = req.params.id;
      const { candidateId } = req.body;

      const job = await Job.findByPk(jobId);

      if (job === null)
        return res.status(404).json({ message: "Vaga inexistente!" });

      await job.addCandidate(candidateId);
      return res.status(201).send();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(400).json({ err: error.message });
      }
    }
  },
  removeCandidate: async (req: Request, res: Response) => {
    try {
      const jobId = req.params.id;
      const { candidateId } = req.body;

      const job = await Job.findByPk(jobId);

      if (job === null)
        return res.status(404).json({ message: "Vaga inexistente!" });

      await job.removeCandidate(candidateId);
      return res.status(204).send();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(400).json({ err: error.message });
      }
    }
  },
};
