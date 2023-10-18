// permanent schedule
const { createSchedule } = require("../outsidechat/schedule");
const { getSchedule } = require("../outsidechat/schedule");
const { getOneSchedule } = require("../outsidechat/schedule");
const { updateOneSchedule } = require("../outsidechat/schedule");
const { deleteTempSchedules } = require("../outsidechat/schedule");
const { deleteTempSoloSchedules } = require("../outsidechat/schedule");
const { deleteOneSchedule } = require("../outsidechat/schedule");
const { deleteOneTempSchedule } = require("../outsidechat/schedule");
const { createTempSchedule } = require("../outsidechat/schedule");
const { createTempSoloSchedule } = require("../outsidechat/schedule");
const { getTempSchedule } = require("../outsidechat/schedule");
const { setActive } = require("../outsidechat/schedule");
// user
const { getUser } = require("./user");
const { deleteUser } = require("./user");
// user update
const { editUser } = require("../outsidechat/userUpdate");
const { updateUserGet } = require("../outsidechat/userUpdate");
// user container
const { userCon } = require("./user");
const { getUserCon } = require("./user");
const { emptyCon } = require("./user");
//user order
const { userOrders } = require("./user");
const { createSchedOrder } = require("./user");

// holiday
const { postHoliday } = require("./holiday");
const { getHoliday } = require("./holiday");

exports.controllers = {
  createSchedule,
  getSchedule,
  getOneSchedule,
  updateOneSchedule,
  deleteTempSchedules,
  deleteTempSoloSchedules,
  deleteOneSchedule,
  deleteOneTempSchedule,
  createTempSchedule,
  createTempSoloSchedule,
  getTempSchedule,
  getUser,
  deleteUser,
  editUser,
  updateUserGet,
  setActive,
  userCon,
  getUserCon,
  emptyCon,
  userOrders,
  createSchedOrder,
  postHoliday,
  getHoliday,
};
