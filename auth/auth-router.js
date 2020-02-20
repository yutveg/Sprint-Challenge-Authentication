const router = require("express").Router();
const Users = require("./user-model.js");
const bc = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../database/token-config.js/secret.js");

router.post("/register", validatePost, (req, res) => {
  let user = req.body;

  const hash = bc.hashSync(user.password, 8);
  user.password = hash;

  Users.register(req.body)
    .then(result => {
      res.status(201).json({ success: `Welcome, ${username}` });
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.post("/login", validatePost, (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bc.compareSync(password, user.password)) {
        const token = signToken(user);
        res
          .status(200)
          .json({ Welcome: `Login successful ${user.username}`, token });
      } else {
        res.status(400).json({ error: "Invalid login" });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

function validatePost(req, res, next) {
  if (req.body && req.body.username && req.body.password) {
    next();
  } else {
    res.status(400).json({ error: "Missing information." });
  }
}

function signToken(user) {
  const payload = {
    user
  };
  const options = {
    expiresIn: "8h"
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
