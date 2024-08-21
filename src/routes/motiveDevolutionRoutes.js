const express = require("express");
const motiveDevolutionController = require('../controllers/motiveDevolutionController');


const router = express.Router();

router.get('/', motiveDevolutionController.getAllMotiveDevolutions);



module.exports = router;
