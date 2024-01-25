const { ObjectId } = require("mongodb");
const Player = require("../model/player");

const getAll = async (req, res) => {
  //#swagger.tags=["Get all team players"]
  try {
    const players = await Player.find();
    res.status(200).json({ message: "All team players", players });
  } catch (err) {
    return res.status(422).json({ message: err });
  }
};

const getByid = async (req, res) => {
  //#swagger.tags=["Get team player by _id"]
  if (!ObjectId.isValid(req.params.id)) {
    res.status(422).json({ message: "Error: id must be valid" });
  }
  try {
    const playerById = await Player.findById(req.params.id);
    res.status(200).json({ message: "Player by _id", playerById });
  } catch (err) {
    return res.status(422).json({ message: err });
  }
};

const createPlayer = async (req, res) => {
  //#swagger.tags=["Create a new team player"]
  const player = new Player({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    height: req.body.height,
    jerseyNo: req.body.jerseyNo,
    position: req.body.position,
    shoeSize: req.body.shoeSize,
    isCaptain: req.body.isCaptain,
    timestamp: new Date(),
  });
  try {
    const savedPlayer = await player.save();
    res
      .status(201)
      .json({ message: "Player inserted successfully", savedPlayer });
  } catch (err) {
    return res.status(422).json({ message: err });
  }
};

const updatePlayer = async (req, res) => {
  //#swagger.tags=["Update a team player by _id"]
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
          timestamp: new Date(),
        },
      },
      { new: true }
    );
    // console.log("Player ID:", req.params.id);
    // console.log("Player:", req.body);
    if (updatedPlayer.acknowledged > 0) {
      return res
        .status(200)
        .json({ message: "Player updated successfully", updatedPlayer });
    } else {
      return res.status(404).json({ message: "Player not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", err });
  }
};

const deletePlayer = async (req, res) => {
  //#swagger.tags=["Delete team player by _id"]
  if (!ObjectId.isValid(req.params.id)) {
    res.status(422).json({ message: "Error: id must be valid" });
  }
  try {
    const deletedPlayer = await Player.deleteOne({ _id: req.params.id });
    console.log(deletedPlayer);
    if (deletedPlayer.deletedCount > 0)
      return res
        .status(200)
        .json({ message: "Player deleted successfully", deletedPlayer });
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
