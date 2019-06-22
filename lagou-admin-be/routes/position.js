var express = require('express');
var router = express.Router();

const PositionController = require('../controllers/position')
const {isContinue} = require('../middlewares/oAuth')
const fileUpload = require('../middlewares/upload-file')
/* GET users listing. */
router.route('/')
    .all(isContinue)
    .get(PositionController.findAll)
    .post(fileUpload.uploadFile,PositionController.save)

module.exports = router;