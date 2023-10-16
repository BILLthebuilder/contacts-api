'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Error = require('../helpers/errorMessage');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSaltSync();
    user.password = await bcrypt.hashSync(user.password, salt);
  });
  User.checkCredentials = async function (email, password) {
    const user = await User.findOne({ where: { email } });
    let error;
    if (!user) {
      error = new Error('The user with that email does not exist, signup first');
      return error;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      error = new Error('Wrong email/password combination');
      return error;
    }
    return user;
  };
  User.generateToken = async function (email) {
    const user = await User.findOne({ where: { email } });
    //const tokenField = user.token;
    const gentoken = jwt.sign({ id: user.id.toString(), email: user.email }, process.env.SECRET, { expiresIn: '3h' });
    //user.update(gentoken, { where: { token: tokenField } });
    return gentoken;
  };
  return User;
};
