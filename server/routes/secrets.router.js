const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  // what is the value of req.user????
  console.log('req.user:', req.user);
  const query = `SELECT * FROM "secret" JOIN "user"
  ON "user".clearance_level >= "secret".secrecy_level
  WHERE "user".clearance_level = $1;`

  pool
    .query(query, [req.user.clearance_level])
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    });
  
});

module.exports = router;
