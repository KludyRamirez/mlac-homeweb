// schedule
const { createSchedule } = require("../outsidechat/schedule");
const { getSchedule } = require("../outsidechat/schedule");
const { getOneSchedule } = require("../outsidechat/schedule");
const { updateOneSchedule } = require("../outsidechat/schedule");
const { deleteOneSchedule } = require("../outsidechat/schedule");
const { isVideoOffHandler } = require("../outsidechat/schedule");
const { isActiveDefHandler } = require("../outsidechat/schedule");

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

// absentCounter setter
const { setPlusAbsentCounter } = require("../outsidechat/schedule");

// presentCounter Setter
const { setMinusAbsentCounter } = require("../outsidechat/schedule");

// user
const { getUser } = require("./user");
const { deleteUser } = require("./user");

// user update
const { editUser } = require("../outsidechat/userUpdate");
const { updateUserGet } = require("../outsidechat/userUpdate");

// user absent logs
const { userCon } = require("./user");
const { getUserCon } = require("./user");
const { emptyCon } = require("./user");
const { userOrders } = require("./user");
const { createSchedOrder } = require("./user");

// user present logs
const { userConPresent } = require("./user");
const { getUserConPresent } = require("./user");
const { emptyConPresent } = require("./user");
const { userOrdersPresent } = require("./user");
const { createSchedOrderPresent } = require("./user");

// current user

const { forgotPassword } = require("./user");
const { changePassword } = require("./user");
const { changeEmail } = require("./user");

// holiday
const { createHoliday } = require("./holiday");
const { getHoliday } = require("./holiday");

//
const { getLogs } = require("./logs");
const { getLogsPresent } = require("./logs");
const { getTempLogs } = require("./logs");
const { getTempSoloLogs } = require("./logs");
//
const { setActive } = require("../outsidechat/schedule");
const { setActiveTemp } = require("../outsidechat/schedule");
const { setActiveTempSolo } = require("../outsidechat/schedule");
const { setVideo } = require("../outsidechat/schedule");
const { setVideoTempSolo } = require("../outsidechat/schedule");

//
const { postProgRep } = require("../outsidechat/progressReport");
const { getProgRep } = require("../outsidechat/progressReport");
// const { getProgRepId } = require("../outsidechat/progressReport");
const { deleteProgRep } = require("../outsidechat/progressReport");
const { setStatusProgRepCompleted } = require("../outsidechat/progressReport");
const { updateStatusProgRep } = require("../outsidechat/progressReport");

// set waitlist
const { hashWaitlistUserPassword } = require("./user");
const { setWaitlistStatus } = require("../outsidechat/schedule");

exports.controllers = {
  createSchedule,
  getSchedule,
  getOneSchedule,
  updateOneSchedule,
  deleteOneSchedule,

  isVideoOffHandler,
  isActiveDefHandler,

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

  // patches setters

  setActive,
  setActiveTemp,
  setActiveTempSolo,
  setVideo,
  setVideoTempSolo,

  // absent logs

  userCon,
  getUserCon,
  emptyCon,
  userOrders,
  createSchedOrder,

  // present logs

  userConPresent,
  getUserConPresent,
  emptyConPresent,
  userOrdersPresent,
  createSchedOrderPresent,

  // holidays

  createHoliday,
  getHoliday,

  //Logs

  getLogs,
  getLogsPresent,
  getTempLogs,
  getTempSoloLogs,

  // absentCounter setters
  setPlusAbsentCounter,
  setMinusAbsentCounter,

  // progress reports

  postProgRep,
  getProgRep,
  setStatusProgRepCompleted,

  // getProgRepId,
  deleteProgRep,
  updateStatusProgRep,

  // set isWaitlist - hashed Waitlist account

  setWaitlistStatus,
  hashWaitlistUserPassword,

  //current user
  changePassword,
  changeEmail,
  forgotPassword,
};
