const { postLogin } = require("./postLogin");
const { getRefreshToken } = require("./postLogin");
const { postRegister } = require("./postRegister");
const { postWaitList } = require("./postRegister");
exports.controllers = {
  postLogin,
  postRegister,
  postWaitList,
  getRefreshToken,
};
