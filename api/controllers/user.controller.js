const bcrypt = require('bcrypt');
const db = require('../models');
const { generateToken } = require('../utils/jwt');
const { extract } = require('../utils/user');
const { sendErrorResponse } = require('../utils/output');

const { Sequelize: { Op }, user: User} = db;
const _controller = {};


/**
 * Login
 * @param {object} req; username: string, password: string
 * @param {object} res
 */
_controller.login = async (req, res) => {
  let user = null;

  // Check User Exists
  try{
    user = await User.findOne({
      where: {
        [Op.or]: [
          { userName: req.body.username ? req.body.username : null },
          { userEmail: req.body.email ? req.body.email : null }
        ]
      },
    });
  } catch(err){
    sendErrorResponse(req, res, {
      statusCode: 500,
      message: `Error retrieving account ${err}`,
      error: new Error(`Error retrieving account`, err)
    })
    return;
  }

  // If user does not exist
  if (!user) {
    sendErrorResponse(req, res, {
      statusCode: 404,
      message: `Cannot find user.`,
      error: new Error('No user found')
    })
    return;
  }

  // Check Password
  const compareHash = await bcrypt.compare(req.body.password, user.userPassword);
  if (!compareHash){
    sendErrorResponse(req, res, {
      statusCode: 400,
      message: `Invalid password`,
      error: new Error(`Password doesn't match.`)
    })
    return;
  }

  // All good. Send the output
  delete user.dataValues.userPassword;
  delete user.dataValues.createdAt;
  delete user.dataValues.updatedAt;

  const userPayload = {
    ...user.dataValues,
    userInfo: {}
  }

  const responseOutput = {
    user: userPayload,
    token: await generateToken(user.dataValues),
    error: null,
    success: true
  }
  res.send(responseOutput);
};



/**
 * User Registration
 * @param {*} req 
 * @param {*} res 
 */
_controller.create = async (req, res) => {
  let userAdded = null;

  // Checks if email and username exist
  try{
    user = await User.findAll({
      where: {
        [Op.and]: [
          { userName: req.body.username },
          { userEmail: req.body.email }
        ]
      },
    });
  } catch(err){
    sendErrorResponse(req, res, {
      statusCode: 500,
      message: `Error retrieving User with. ${err}`,
      error: err
    })
  }
  
  const userPayload = {
    userName: req.body.username,
    userEmail: req.body.email,
    userPassword: await bcrypt.hash(req.body.password, Number(process.env.SALT_ROUNDS)),
    userType: 'client'
  };

  try {
    userAdded = await User.create(userPayload);
  } catch (err) {
    sendErrorResponse(req, res, {
      statusCode: 500,
      message: `Failed to create user. ${err}`,
      error: err
    })
  }

  if (userAdded) {
    res.send(userAdded);
  } else {
    sendErrorResponse(req, res, {
      statusCode: 404,
      message: `User cannot be created.`,
      error: new Error(`User Cannot be created`)
    })
  }
};



/**
 * Select one user
 * @param {*} req 
 * @param {*} res 
 */
_controller.findOne = async (req, res) => {
  let user = null;
  let extractedDetails = extract(req);

  try{
    user = await User.findByPk(extractedDetails.userId);
  } catch(err){
    sendErrorResponse(req, res, {
      statusCode: 500,
      message: `Error retrieving User with id=${id}. ${err}`,
      error: err
    })
  }

  if (user) {
    // All good. Send the output
    delete user.dataValues.userPassword;
    delete user.dataValues.createdAt;
    delete user.dataValues.updatedAt;

    const userPayload = {
      ...user.dataValues,
      userInfo: {}
    }

    const responseOutput = {
      user: userPayload,
      error: null,
      success: true
    }
    res.send(responseOutput);
  } else {
    sendErrorResponse(req, res, {
      statusCode: 404,
      message: `Cannot find User with id=${id}.`,
      error: new Error(`Cannot find User with id=${id}.`)
    })
  }
};

module.exports = _controller;