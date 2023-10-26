// schedule
const { createSchedule } = require("../outsidechat/schedule");
const { getSchedule } = require("../outsidechat/schedule");
const { getOneSchedule } = require("../outsidechat/schedule");
const { updateOneSchedule } = require("../outsidechat/schedule");
const { deleteOneSchedule } = require("../outsidechat/schedule");
// temporary schedule
const { createTempSchedule } = require("../outsidechat/schedule");
const { getTempSchedule } = require("../outsidechat/schedule");
const { deleteOneTempSchedule } = require("../outsidechat/schedule");
const { deleteTempSchedules } = require("../outsidechat/schedule");
// temporary solo schedule
const { createTempSoloSchedule } = require("../outsidechat/schedule");
const { getTempSoloSchedule } = require("../outsidechat/schedule");
const { deleteOneTempSoloSchedule } = require("../outsidechat/schedule");
const { deleteTempSoloSchedules } = require("../outsidechat/schedule");

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
const { createHoliday } = require("./holiday");
const { getHoliday } = require("./holiday");

const { setActive } = require("../outsidechat/schedule");

exports.controllers = {
  createSchedule,
  getSchedule,
  getOneSchedule,
  updateOneSchedule,
  deleteOneSchedule,

  createTempSchedule,
  getTempSchedule,
  deleteOneTempSchedule,
  deleteTempSchedules,

  createTempSoloSchedule,
  getTempSoloSchedule,
  deleteOneTempSoloSchedule,
  deleteTempSoloSchedules,

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
  createHoliday,
  getHoliday,
};
