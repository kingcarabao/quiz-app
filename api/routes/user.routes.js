const express = require('express');
const user = require('../controllers/user.controller');

module.exports = app => {
    const router = express.Router();
    
    router.get("/:id", user.findOne);

    router.post("/login", user.login);
    router.post("/", user.create);
  
    app.use('/api/users', router);
  };