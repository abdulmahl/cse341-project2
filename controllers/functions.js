const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const teamMember = require("../model/team");

const getAll = async (req, res) => {
  try {
    const members = await teamMember.find();
    res.status(200).json(members)
  } catch (err) {}
  res.status(200).json();
};

const createMember = async (req, res) => {
  const member = new teamMember({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    height: req.body.height,
    jerseyNo: req.body.jerseyNo,
    position: req.body.position,
    shoeSize: req.body.shoeSize,
    isCaptain: req.body.isCaptain,
  });
  try {
    const savedMember = await member.save();
    res.status(201).json(savedMember);
  } catch (err) {
    res.status(422).json({ message: err });
  }
};

const getByid = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(422).json({ message: "Error: id must be valid" });
  }
  try {
    const memberById = await teamMember.findById(req.params.id);
    res.status(200).json(memberById);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

module.exports = { getAll, getByid, createMember };
