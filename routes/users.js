const router = require("express").Router();
const { getUsers } = require("../controllers/users");

router.get("/users", getUsers);
router.get("users/:id", (req, res) => {
  res.send(`User ${req.params.id}`);
});

module.exports = router;
