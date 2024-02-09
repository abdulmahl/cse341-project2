const User = require("../model/user-model");

const getUsers = async (req, res) => {
  //#swagger.tags=["Get all users"]
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    return res.json({ message: err });
  }
};



module.exports = { getUsers };
