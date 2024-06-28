const Student = require("../models/Students");
const History = require("../models/History");
const Notification = require("../models/Notifications");

const createStudent = async (req, res) => {
  const { firstName, surName, studentNo, selectedUser } = req.body;
  const userData = req.user;

  try {
    if (!firstName || !surName || !studentNo) {
      return res.status(400).send("Missing required fields.");
    }

    if (!req.user) {
      return res.status(401).send("User authentication required.");
    }

    const studentNoExists = await Student.exists({ studentNo });

    if (studentNoExists) {
      return res
        .status(409)
        .send("Student number already exists. Please try again.");
    }

    let newStudent;

    if (selectedUser && selectedUser._id) {
      newStudent = await Student.create({
        ...req.body,
        parent: selectedUser._id,
      });
    } else {
      newStudent = await Student.create(req.body);
    }

    const notification = await Notification.create({
      sender: userData._id,
      type: "Schedules",
      message: `${firstName} ${surName} has been added as your child.`,
      createdAt: new Date(),
    });

    const student = await Student.findById(newStudent._id).populate("parent");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await User.findByIdAndUpdate(student.parent._id, {
      $push: { notifications: notification._id },
    });

    await History.create({
      userId: userData._id,
      typeOfNotif: "Students",
      actionOfNotif: "Add",
      message: `Added ${firstName} ${surName} as a student successfully.`,
      createdAt: new Date(),
    });

    res.status(201).json({
      message: `Added ${firstName} ${surName} as a student successfully.`,
      data: newStudent,
    });
  } catch (error) {
    console.error("Failed to add student.", error);
    res
      .status(500)
      .send("An error occurred while adding the student, please try again!");
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("parent", "firstName surName contactNo")
      .exec();
    const currentDate = new Date();

    for (const student of students) {
      if (currentDate.getMonth() === 11 && currentDate.getDate() === 31) {
        student.year += 1;
      }

      await student.save();
    }

    res.json(students);
  } catch (error) {
    return res.status(500).send("An error occurred, please try again!");
  }
};

const getStudent = async (req, res) => {
  try {
    const schedule = await Student.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const editStudent = async (req, res) => {
  try {
    const userData = req.user;

    const { studentNo, firstName, surName } = req.body;

    const { id } = req.params;

    const student = await Student.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    ).populate("parent");

    const notification = await Notification.create({
      sender: userData._id,
      type: "Students",
      message: `Your child ${firstName} ${surName} has been successfully edited.`,
      createdAt: new Date(),
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await User.findByIdAndUpdate(student.parent._id, {
      $push: { notifications: notification._id },
    });

    await History.create({
      userId: userData._id,
      typeOfNotif: "Students",
      actionOfNotif: "Update",
      message: `Student No. ${studentNo} has been successfully updated.`,
      createdAt: new Date(),
    });

    res.status(200).json({
      data: student,
      message: `Student No. ${studentNo} has been successfully updated.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to edit student values!" });
  }
};

const deleteOneStudent = async (req, res) => {
  try {
    const userData = req.user;

    const deletedStudent = await Student.findByIdAndDelete(
      req.params.id
    ).populate("parent");

    if (!deletedStudent) {
      return res.status(404).json({ error: "Cannot find selected student." });
    }

    const notification = await Notification.create({
      sender: userData._id,
      type: "Students",
      message: `${deletedStudent.firstName} ${deletedStudent.surName}'s schedule has been deleted successfully.`,
      createdAt: new Date(),
    });

    await User.findByIdAndUpdate(deletedStudent.parent._id, {
      $push: { notifications: notification._id },
    });

    await History.create({
      userId: userData._id,
      typeOfNotif: "Students",
      actionOfNotif: "Delete",
      message: `Student No. ${deletedStudent.studentNo} has been deleted successfully.`,
      createdAt: new Date(),
    });

    res.status(200).json({
      message: `Student No. ${deletedStudent.studentNo} has been deleted successfully.`,
    });
  } catch (err) {
    res.status(400).json({
      message: `Selected student was not deleted.`,
    });
  }
};

const deleteManyStudent = async (req, res) => {
  try {
    const { students } = req.body;
    const userData = req.user;

    await Student.deleteMany({ _id: { $in: students } });

    for (const studentId of students) {
      const deletedStudent = await Student.findById(studentId).populate(
        "parent"
      );

      if (!deletedStudent) {
        console.error(`Schedule with ID ${studentId} not found`);
        continue;
      }

      const notification = await Notification.create({
        sender: userData._id,
        type: "Students",
        message: `${deletedStudent?.firstName} ${deletedStudent?.surName} schedule has been deleted successfully.`,
        createdAt: new Date(),
      });

      await User.findByIdAndUpdate(deletedStudent.parent._id, {
        $push: { notifications: notification._id },
      });
    }

    await History.create({
      userId: userData._id,
      typeOfNotif: "Students",
      actionOfNotif: "Delete",
      message: `Selected students has been deleted successfully.`,
      createdAt: new Date(),
    });

    res
      .status(200)
      .json({ message: "Selected students has been deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudent,
  editStudent,
  deleteOneStudent,
  deleteManyStudent,
};
