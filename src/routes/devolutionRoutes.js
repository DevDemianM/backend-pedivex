const express = require("express");
const devolutionController = require('../controllers/devolutionController');


const router = express.Router();

router.get('/', devolutionController.getAllDevolutions);
router.get('/:id', devolutionController.getDevolutionById);
router.post('/', devolutionController.createDevolution);


module.exports = router;
