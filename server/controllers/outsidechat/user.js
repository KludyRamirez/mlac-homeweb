const User = require("../../models/user");
const Container = require("../../models/container");
const Order = require("../../models/order");
const PresentLogs = require("../../models/logsPresent");
const Schedule = require("../../models/scheds");
const uniqid = require("uniqid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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
    const { con } = req.body;

    let schedules = [];

    const user = await User.findOne({ username: req.user.username }).exec();

    let conExistByThisUser = await Container.findOne({
      orderdBy: user._id,
    }).exec();

    if (conExistByThisUser) {
      conExistByThisUser.remove();
      console.log("Removed floating schedules");
    }

    for (let i = 0; i < con.length; i++) {
      let object = {};

      object.schedule = con[i]._id;
      object.absentReason = con[i].absentReason;

      schedules.push(object);
    }

    let conTotal = 0;
    for (let i = 0; i < schedules.length; i++) {
      conTotal = conTotal + schedules[i].price * schedules[i].count;
    }

    console.log("containerTotal", conTotal);

    let newCon = await new Container({
      schedules,
      conTotal,
      orderdBy: user._id,
    }).save();

    console.log("newContainer", newCon);
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
    let container = await Container.deleteMany({});
    res.json({ deletedCount: container.deletedCount });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
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
    const { audit } = req.body;

    if (!audit) return res.status(400).send("Create cash order failed");

    const user = await User.findOne({ username: req.user.username }).exec();

    let userCon = await Container.findOne({ orderdBy: user._id }).exec();

    let newOrder = await new Order({
      schedules: userCon.schedules,
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

// user con present --------------------------------------------------------------------------------->

const userConPresent = async (req, res) => {
  try {
    const { con } = req.body;

    let schedules = [];

    const user = await User.findOne({ username: req.user.username }).exec();

    let conExistByThisUser = await Container.findOne({
      orderdBy: user._id,
    }).exec();

    if (conExistByThisUser) {
      conExistByThisUser.remove();
      console.log("Removed floating schedules");
    }

    for (let i = 0; i < con.length; i++) {
      let object = {};

      object.schedule = con[i]._id;
      object.absentReason = con[i].absentReason;

      schedules.push(object);
    }

    let conTotal = 0;
    for (let i = 0; i < schedules.length; i++) {
      conTotal = conTotal + schedules[i].price * schedules[i].count;
    }

    console.log("containerTotal", conTotal);

    let newCon = await new Container({
      schedules,
      conTotal,
      orderdBy: user._id,
    }).save();

    console.log("newContainer", newCon);
    res.json({ ok: true });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const getUserConPresent = async (req, res) => {
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

const emptyConPresent = async (req, res) => {
  try {
    let container = await Container.deleteMany({});
    res.json({ deletedCount: container.deletedCount });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const userOrdersPresent = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.user.username }).exec();

    let userOrders = await PresentLogs.find({ orderdBy: user._id })
      .populate("schedules.schedule")
      .populate("orderdBy", "firstname lastname username")
      .exec();

    res.json(userOrders);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const createSchedOrderPresent = async (req, res) => {
  try {
    const { audit } = req.body;

    if (!audit) return res.status(400).send("Create cash order failed");

    const user = await User.findOne({ username: req.user.username }).exec();

    let userCon = await Container.findOne({ orderdBy: user._id }).exec();

    let presentLogs = await new PresentLogs({
      schedules: userCon.schedules,
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

    console.log("Present Logs Saved!", presentLogs);
    res.json({ ok: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ error: error.message });
  }
};

//----------------->
const hashPassword = async (plainPassword) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
};

//accessing two different collection schedule to user

const hashWaitlistUserPassword = async (req, res) => {
  try {
    const { parent } = req.body;

    if (!parent) {
      return res
        .status(400)
        .send("Parent value is missing in the request body.");
    }

    const schedule = await Schedule.findOne({ parent: parent });

    if (schedule) {
      // Assuming 'schedule' is an object with a 'schedule' property that contains a string
      const slicedSchedule = schedule.parent.split(" ").pop();

      console.log("----------------------->", slicedSchedule);

      const user = await User.findOne({
        username: slicedSchedule,
      });

      if (user) {
        const hashedPassword = await hashPassword(user.password);

        await User.updateOne(
          { username: slicedSchedule },
          { $set: { password: hashedPassword } }
        );

        return res.send("Password hashed and updated successfully.");
      } else {
        return res.send("No user found with the extracted schedule username.");
      }
    } else {
      return res.send("No schedule found matching the provided parent value.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).send("Internal Server Error");
  }
};

// current user ------------------> //

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ username: req.user.username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error updating password", error });
  }
};

const changeEmail = async (req, res) => {
  const { mail } = req.body;

  try {
    const user = await User.findOne({ username: req.user.username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.email = mail; // Assuming 'mail' holds the new email address
    await user.save();

    return res
      .status(200)
      .json({ message: "Email updated successfully", email: user.email });
  } catch (error) {
    return res.status(500).json({ message: "Error updating email", error });
  }
};

module.exports = {
  getUser,
  deleteUser,

  // user absent logs

  userCon,
  getUserCon,
  emptyCon,
  userOrders,
  createSchedOrder,

  // user present logs

  userConPresent,
  getUserConPresent,
  emptyConPresent,
  userOrdersPresent,
  createSchedOrderPresent,

  // set isWaitlist

  hashWaitlistUserPassword,

  // current user

  changePassword,
  changeEmail,
};
