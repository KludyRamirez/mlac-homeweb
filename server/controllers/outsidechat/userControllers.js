const { getUser } = require("../outsidechat/users");

const { deleteUser } = require("../outsidechat/users");

exports.controllers = {
  getUser,
  deleteUser,
};
