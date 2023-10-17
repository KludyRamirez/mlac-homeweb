const User = require("../../models/user");
const Container = require("../../models/container");
const Order = require("../../models/order");

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

// user Con

const userCon = async (req, res) => {
  try {
    const { container } = req.body;
    let schedules = [];

    const user = await User.findOne({ username: req.user.username }).exec();

    let conExistByThisUser = await Container.findOne({
      orderdBy: user._id,
    }).exec();

    if (conExistByThisUser) {
      conExistByThisUser.remove();
      console.log("Removed floating schedules");
    }

    for (let i = 0; i < container.length; i++) {
      let object = {};

      object.schedule = container[i]._id;
      object.absentReason = container[i].absentReason;

      schedules.push(object);
    }

    let containerTotal = 0;
    for (let i = 0; i < schedules.length; i++) {
      containerTotal = containerTotal + schedules[i].price * schedules[i].count;
    }

    console.log("containerTotal", containerTotal);

    let newContainer = await new Container({
      schedules,
      containerTotal,
      orderdBy: user._id,
    }).save();

    console.log("newContainer", newContainer);
    res.json({ ok: true });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const getUserCon = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();

    let con = await Container.findOne({ orderdBy: user._id })
      .populate(
        "schedules.schedule",
        "_id nameOfStudent price totalAfterDiscount"
      )
      .exec();

    if (!con) {
      throw new Error("Cart not found for this user.");
    }

    const { schedules } = con;
    res.json({ schedules, totalAfterDiscount });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const emptyCon = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();
    const container = await Container.findOneAndRemove({
      orderdBy: user._id,
    }).exec();

    if (!container) {
      throw new Error("Container not found for this user.");
    }

    res.json(container);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const userOrders = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.user.username }).exec();

    let userOrders = await Order.find({ orderdBy: user._id })
      .populate("schedules.schedule")
      .populate("orderdBy", "firstname lastname username")
      .exec();

    res.json(userOrders);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const createSchedOrder = async (req, res) => {
  try {
    const { COD } = req.body;

    if (!COD) throw new Error("Create cash order failed");

    const user = await User.findOne({ username: req.user.username }).exec();

    let userCon = await Container.findOne({ orderdBy: user._id }).exec();

    let newOrder = await new Order({
      products: userCon.schedules,
      paymentIntent: {
        id: uniqid(),
        currency: "PHP",
        status: "Stand By",
        created: Date.now(),
        payment_method_types: ["cash"],
      },
      orderdBy: user._id,
      orderStatus: "Stand By",
    }).save();

    console.log("NEW ORDER SAVED", newOrder);
    res.json({ ok: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUser,
  deleteUser,
  userCon,
  getUserCon,
  emptyCon,
  userOrders,
  createSchedOrder,
};
