const express = require('express');
const MotiveDevolutionsController = require('../controllers/motiveDevolutionsController');


const router = express.Router();

router.get('/', MotiveDevolutionsController.getAllMotiveDevolutions);
router.post('/', MotiveDevolutionsController.createMotiveDevolutions);


module.exports = router;