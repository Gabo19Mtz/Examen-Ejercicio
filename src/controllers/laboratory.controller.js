import { Laboratories } from "../models/Laboratories.js";
import { Computers } from "../models/Computers.js";

export const getLaboratories = async (req, res) => {
  try {
    const laboratories = await Laboratories.findAll();
    res.json(laboratories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getLaboratory = async (req, res) => {
  try {
    const { id } = req.params;
    const laboratories = await Laboratories.findOne({
      where: {
        id,
      },
    });

    if (!laboratories)
      return res.status(404).json({ message: "Project does not exist" });
    res.json(laboratories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createLaboratory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newLaboratory = await Laboratories.create({
      name,
      description,
    });
    res.json(newLaboratory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLaboratory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const laboratory = await Laboratories.findByPk(id);
    laboratory.name = name;
    laboratory.description = description;
    await laboratory.save();

    res.json(laboratory);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteLaboratory = async (req, res) => {
  try {
    const { id } = req.params;
    await Laboratories.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getComputerLaboratory = async (req, res) => {
  const { id } = req.params;
  const computers = await Computers.findAll({
    where: { laboratoriesId: id },
  });
  res.json(computers);
};
