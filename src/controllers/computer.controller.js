import { Computers } from "../models/Computers.js";
import fs from "fs";
import multer from "multer";
import { clearScreenDown } from "readline";

export const getComputers = async (res) => {
  try {
    const computers = await Computers.findAll();
    res.json(computers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createComputer = async (req, res) => {
  try {
    const { name, photo, projectId } = req.body;

    const newComputer = await Computers.create({
      name,
      photo,
      projectId,
    });
    res.json(newComputer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getComputer = async (req, res) => {
  const { id } = req.params;
  try {
    const computer = await Computers.findOne({
      where: {
        id,
      },
    });
    res.json(computer);
  } catch (error) {
    return send.status(500).json({ message: error.message });
  }
};
export const updateComputers = async (req, res) => {
  try {
    const { id } = req.params;
    const computer = await Computers.findOne({
      where: { id },
    });
    computer.set(req.body);
    await computer.save();
    return res.json(computer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteComputer = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Computers.destroy({
      where: {
        id,
      },
    });
    console.log(result);
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
