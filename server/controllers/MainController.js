//auth

const { login } = require("../controllers/authentication/Login");
const { handleRefreshToken } = require("../controllers/authentication/Login");
const { handleLogout } = require("../controllers/authentication/Login");
const { forgot } = require("../controllers/authentication/Forgot");
const { reset } = require("../controllers/authentication/Reset");
const { register } = require("../controllers/authentication/Register");
const { changeEmail } = require("../controllers/authentication/CurrentUser");
const { changePassword } = require("../controllers/authentication/CurrentUser");

//schedule

const { createSchedule } = require("../controllers/SchedulesController");
const { getSchedule } = require("../controllers/SchedulesController");
const { getOneSchedule } = require("../controllers/SchedulesController");
const { updateOneSchedule } = require("../controllers/SchedulesController");
const { deleteOneSchedule } = require("../controllers/SchedulesController");
const { deleteManySchedule } = require("../controllers/SchedulesController");
const { isVideoOffHandler } = require("../controllers/SchedulesController");
const { isActiveDefHandler } = require("../controllers/SchedulesController");

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

//notification

const { getNotifications } = require("../controllers/NotificationsController");

//colleges and departments

const { createCad } = require("./CollegesAndDepartmentsController");
const { getCads } = require("./CollegesAndDepartmentsController");
const { deleteOneCad } = require("./CollegesAndDepartmentsController");
const { deleteManyCad } = require("./CollegesAndDepartmentsController");

// csrf

const { getCsrf } = require("../controllers/SecurityControllers");

exports.controllers = {
  login,
  handleRefreshToken,
  handleLogout,
  forgot,
  reset,
  register,
  changeEmail,
  changePassword,
  //
  createSchedule,
  getSchedule,
  getOneSchedule,
  updateOneSchedule,
  deleteOneSchedule,
  deleteManySchedule,
  //
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
  getNotifications,
  //
  createCad,
  getCads,
  deleteOneCad,
  deleteManyCad,
  //
  getCsrf,
};
