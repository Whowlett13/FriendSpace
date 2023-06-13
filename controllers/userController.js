const { User, Thought } = require("../models");

const userController = {
  //Get All Users
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: "friends",
        select: "-_v",
      })
      .select("-_v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  //Get User By id

  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-_v",
      })
      .populate({
        path: "friends",
        select: "-_v",
      })
      .select("-_v")
      .then((dbUserData) => {
        if (dbUserData) {
          return res
            .status(404)
            .json({ message: "No User Found With This Id!!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },

  //creating a user

  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  //Updating A User By Id
};
