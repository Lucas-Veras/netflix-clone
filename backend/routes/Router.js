const express = require("express");
const router = express();

router.use("/api/auth", require("./AuthRouter"));
router.use("/api/users", require("./UserRouter"));
router.use("/api/movies", require("./MovieRouter"));
router.use("/api/lists", require("./ListRouter"));

module.exports = router;