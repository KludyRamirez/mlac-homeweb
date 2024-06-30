//auth

const { login } = require("../controllers/authentication/Login");
const { handleRefreshToken } = require("../controllers/authentication/Login");
const { handleLogout } = require("../controllers/authentication/Login");
const { forgot } = require("../controllers/authentication/Forgot");
const { reset } = require("../controllers/authentication/Reset");
const { register } = require("../controllers/authentication/Register");
const { changeEmail } = require("../controllers/authentication/CurrentUser");
const { changePassword } = require("../controllers/authentication/CurrentUser");

//permanent schedule

const { createSchedule } = require("../controllers/SchedulesController");
const { getSchedule } = require("../controllers/SchedulesController");
const { getOneSchedule } = require("../controllers/SchedulesController");
const { updateOneSchedule } = require("../controllers/SchedulesController");
const { updateScheduleReason } = require("../controllers/SchedulesController");
const { deleteOneSchedule } = require("../controllers/SchedulesController");
const { deleteManySchedule } = require("../controllers/SchedulesController");
const { createZoomLink } = require("../controllers/SchedulesController");
const {
  deleteExpiredZoomLinks,
} = require("../controllers/SchedulesController");

// temp schedule

const { createTempSchedule } = require("../controllers/SchedulesController");
const { getTempSchedule } = require("../controllers/SchedulesController");
const { deleteOneTempSchedule } = require("../controllers/SchedulesController");
const { deleteTempSchedules } = require("../controllers/SchedulesController");
const {
  deleteManyTempSchedule,
} = require("../controllers/SchedulesController");

// temp solo

const {
  createTempSoloSchedule,
} = require("../controllers/SchedulesController");
const { getTempSoloSchedule } = require("../controllers/SchedulesController");
const {
  deleteOneTempSoloSchedule,
} = require("../controllers/SchedulesController");
const {
  deleteTempSoloSchedules,
} = require("../controllers/SchedulesController");
const {
  deleteManyTempSoloSchedule,
} = require("../controllers/SchedulesController");

//students

const { createStudent } = require("../controllers/StudentsController");
const { getStudents } = require("../controllers/StudentsController");
const { getStudent } = require("../controllers/StudentsController");
const { editStudent } = require("../controllers/StudentsController");
const { deleteOneStudent } = require("../controllers/StudentsController");
const { deleteManyStudent } = require("../controllers/StudentsController");

//users

const { getUsers } = require("../controllers/UsersController");
const { editUser } = require("../controllers/UsersController");
const { deleteOneUser } = require("../controllers/UsersController");
const { deleteManyUser } = require("../controllers/UsersController");

//cases

const { createCase } = require("../controllers/CasesController");
const { getCases } = require("../controllers/CasesController");
const { editCase } = require("../controllers/CasesController");
const { patchCase } = require("../controllers/CasesController");
const { remarksCase } = require("../controllers/CasesController");
const { deleteOneCase } = require("../controllers/CasesController");
const { deleteManyCase } = require("../controllers/CasesController");

//history

const { getHistory } = require("../controllers/HistoryController");

//colleges and departments

const { createCad } = require("./CollegesAndDepartmentsController");
const { getCads } = require("./CollegesAndDepartmentsController");
const { deleteOneCad } = require("./CollegesAndDepartmentsController");
const { deleteManyCad } = require("./CollegesAndDepartmentsController");

// csrf
const { getCsrf } = require("../controllers/SecurityControllers");

// logs
const { createLogs } = require("./LogsControllers");
const { getLogs } = require("./LogsControllers");
const { getOneLog } = require("./LogsControllers");

// real-time notification

const { getUserNotifications } = require("./NotificationsController");

// video setters

const { setVideo } = require("./SchedulesController");
const { setTempVideo } = require("./SchedulesController");
const { setTempSoloVideo } = require("./SchedulesController");

exports.controllers = {
  login,
  handleRefreshToken,
  handleLogout,
  forgot,
  reset,
  register,
  changeEmail,
  changePassword,

  // permanent schedule
  createSchedule,
  getSchedule,
  getOneSchedule,
  updateOneSchedule,
  updateScheduleReason,
  deleteOneSchedule,
  deleteManySchedule,

  // temp schedule
  createTempSchedule,
  getTempSchedule,
  deleteOneTempSchedule,
  deleteTempSchedules,
  deleteManyTempSchedule,

  // temp solo

  createTempSoloSchedule,
  getTempSoloSchedule,
  deleteOneTempSoloSchedule,
  deleteTempSoloSchedules,
  deleteManyTempSoloSchedule,

  createStudent,
  getStudents,
  getStudent,
  editStudent,
  deleteOneStudent,
  deleteManyStudent,
  //
  getUsers,
  editUser,
  deleteOneUser,
  deleteManyUser,
  //
  createCase,
  getCases,
  editCase,
  patchCase,
  remarksCase,
  deleteOneCase,
  deleteManyCase,
  //
  getHistory,
  //
  createCad,
  getCads,
  deleteOneCad,
  deleteManyCad,
  //
  getCsrf,
  //
  createLogs,
  getLogs,
  getOneLog,
  //
  getUserNotifications,

  //
  setVideo,
  setTempVideo,
  setTempSoloVideo,

  //

  createZoomLink,
  deleteExpiredZoomLinks,
};
