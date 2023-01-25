const User = require("../models/User");

class UsersController {
  async getUsers(req, res) {
    try {
      // const users = await User.find();
      // res.json(users);
    } catch (e) {
      console.log(e);
    }
  }

  // async updateUser(req, res) {
  //   try{
  //     const {id} = req.params
  //     const updateUser = await User.findOneAndUpdate(id, req.body, {new: true})
  //     res.json(updateUser)
  //   } catch(e) {
  //     console.log(e)
  //   }
  // }
}

module.exports = new UsersController();
