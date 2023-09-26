// permanent schedule
const { createSchedule } = require("../outsidechat/schedule");
const { getSchedule } = require("../outsidechat/schedule");
const { getOneSchedule } = require("../outsidechat/schedule");
const { updateOneSchedule } = require("../outsidechat/schedule");
const { deleteOneSchedule } = require("../outsidechat/schedule");
const { createTempSchedule } = require("../outsidechat/schedule");
const { getTempSchedule } = require("../outsidechat/schedule");

exports.controllers = {
  createSchedule,
  getSchedule,
  getOneSchedule,
  updateOneSchedule,
  deleteOneSchedule,
  createTempSchedule,
  getTempSchedule,
};
