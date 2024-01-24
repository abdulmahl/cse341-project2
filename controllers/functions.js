const { ObjectId } = require("mongodb");
const Player = require("../model/player");

const getAll = async (req, res) => {
  //#swagger.tags=["Ball Players"]
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (err) {
    return res.status(422).json({ message: err });
  }
};

const getByid = async (req, res) => {
  //#swagger.tags=["Ball Player"]
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
  //#swagger.tags=["Ball Player"]
  const player = new Player({
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
    const savedPlayer = await player.save();
    res.status(201).json(savedPlayer);
  } catch (err) {
    return res.status(422).json({ message: err });
  }
};

const updatePlayer = async (req, res) => {
  //#swagger.tags=["Ball Player"]
  if (!ObjectId.isValid(req.params.id)) {
    res.status(422).json({ message: "Error: id must be valid" });
  }
  try {
    const updatedPlayer = await Player.updateOne(
      { _id: req.params.id },
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          age: req.body.age,
          height: req.body.height,
          jerseyNo: req.body.jerseyNo,
          position: req.body.position,
          shoeSize: req.body.shoeSize,
          isCaptain: req.body.isCaptain,
        },
      }
    );
    // console.log("Player ID:", req.params.id);
    // console.log("Player:", req.body);
    if (updatedPlayer.acknowledged > 0) {
      return res.status(200).json({ message: "Player updated successfully" });
    } else {
      return res.status(404).json({ message: "Player not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", err });
  }
};

const deletePlayer = async (req, res) => {
  //#swagger.tags=["Ball Player"]
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
