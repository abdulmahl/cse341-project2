const { ObjectId } = require("mongodb");
const JoiPlayer = require("../model/validate");
const Player = require("../model/player");

const getAll = async (req, res) => {
  //#swagger.tags=["Get all team players"]
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (err) {
    return res.status(422).json({ message: err });
  }
};

const getByid = async (req, res) => {
  //#swagger.tags=["Get team player by id"]
  if (!ObjectId.isValid(req.params.id)) {
    res.status(422).json({ message: "Error: id must be valid" });
  }
  try {
    const playerById = await Player.findById(req.params.id);
    res.status(200).json(playerById);
  } catch (err) {
    return res.status(422).json({ message: err });
  }
};

const createPlayer = async (req, res) => {
  //#swagger.tags=["Create a new team player"]
  const playerData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    height: req.body.height,
    jerseyNo: req.body.jerseyNo,
    position: req.body.position,
    shoeSize: req.body.shoeSize,
    isCaptain: req.body.isCaptain,
  };

  const { error } = JoiPlayer.validate(playerData);
  if (error) {
    return res
      .status(422)
      .json({ error: error.details.map((detail) => detail.message) });
  }

  const player = new Player(playerData);
  try {
    const savedPlayer = await player.save();
    res.status(201).json(savedPlayer);
  } catch (err) {
    return res.status(422).json({ message: err });
  }
};

const updatePlayer = async (req, res) => {
  //#swagger.tags=["Update a team player by _id"]
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(422).json({ message: "Error: id must be valid" });
  }
  const playerId = new Object(req.params.id);
  const updatedPlayer = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    height: req.body.height,
    jerseyNo: req.body.jerseyNo,
    position: req.body.position,
    shoeSize: req.body.shoeSize,
    isCaptain: req.body.isCaptain,
  }; // This option ensures that the updated document is returned

  // Validate the updated player using Joi
  const { error } = JoiPlayer.validate(updatedPlayer);
  if (error) {
    return res
      .status(422)
      .json({ error: error.details.map((detail) => detail.message) });
  }

  try {
    const response = await Player.updateOne(
      { _id: playerId },
      { $set: updatedPlayer }
    );
    if (response.modifiedCount > 0) {
      return res.status(204).json({ message: "Player updated successfully" });
    } else {
      res.status(404).json({ message: "Player not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", err });
  }
};

const deletePlayer = async (req, res) => {
  //#swagger.tags=["Delete team player by id"]
  if (!ObjectId.isValid(req.params.id)) {
    res.status(422).json({ message: "Error: id must be valid" });
  }
  try {
    const deletedPlayer = await Player.deleteOne({ _id: req.params.id });
    console.log(deletedPlayer);
    if (deletedPlayer.deletedCount > 0)
      return res.status(200).json({ message: "Player deleted successfully" });
  } catch (err) {
    return res.status(404).json({ message: err });
  }
};

module.exports = {
  getAll,
  getByid,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
