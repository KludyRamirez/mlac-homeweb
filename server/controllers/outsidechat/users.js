const User = require("../../models/user");

const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    return res.status(500).send("Error occured. Please try again");
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedItem = await User.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getUser, deleteUser };
