const express = require("express");
const appController = require("../controllers/app-controller");
const router = express.Router();

// Unauthenticated route
try {
  router.get("/getData", appController.getData);
  router.post("/submitData",appController.submitData);
  
} catch (err) {
  console.log("Error:", err);
}

module.exports = router;
