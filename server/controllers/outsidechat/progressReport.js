const ProgRep = require("../../models/progressreport");
const uniqid = require("uniqid");

const postProgRep = async (req, res) => {
  try {
    const progRep = await new ProgRep({
      ...req.body,
      cardId: uniqid(),
    }).save();
    res.json(progRep);
  } catch (error) {
    return res.status(400).send("Create Schedule Error!");
  }
};

const getProgRep = async (req, res) => {
  try {
    const progRep = await ProgRep.find()
      .sort({ updatedAt: -1 })
      .populate(
        "nameOfStudent",
        "parent nameOfStudent timing studentType schedType"
      )
      .exec();
    res.json(progRep);
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send("An error occurred. Please try again");
  }
};

const updateStatusProgRep = async (req, res) => {
  try {
    const currentDate = new Date();
    const formattedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const progRep = await ProgRep.updateMany(
      {
        $and: [{ dateTime: { $lt: formattedDate } }, { status: "Pending" }],
      },
      { $set: { status: "Overdue" } }
    );

    res.json(progRep);
  } catch (error) {
    return res.status(500).send("Error occured. Please try again");
  }
};

const setStatusProgRepCompleted = async (req, res) => {
  try {
    const { status } = req.body;
    await ProgRep.findByIdAndUpdate(req.params.id, { status });
    res.status(200).json({ message: "Active status changed." });
  } catch (error) {
    return res.status(500).send("Error occured. Please try again");
  }
};

const deleteProgRep = async (req, res) => {
  try {
    const deletedItem = await ProgRep.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  postProgRep,
  getProgRep,
  updateStatusProgRep,
  setStatusProgRepCompleted,
  deleteProgRep,
};
