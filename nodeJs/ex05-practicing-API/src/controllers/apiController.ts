import { Request, Response } from "express";
import Phrases from "../models/Phrases";

export const ping = (req: Request, res: Response) => {
  res.status(200).json({ ping: "pong" });
};

export const rand = (req: Request, res: Response) => {
  let randNumber: number = Math.floor(Math.random() * 12);
  res.status(200).json({ randomico: randNumber });
};

export const createPhrase = async (req: Request, res: Response) => {
  const { author, txt }: { author: string; txt: string } = req.body;
  try {
    await Phrases.create({ author, txt });
    res.status(201).json({ author, txt });
    console.log(`Author: ${author} \nContent: ${txt}`);
  } catch (error) {
    console.log(error);
  }
};
