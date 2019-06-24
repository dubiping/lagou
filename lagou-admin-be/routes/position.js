var express = require('express');
var router = express.Router();

const PositionController = require('../controllers/position')
const {isContinue} = require('../middlewares/oAuth')
const fileUpload = require('../middlewares/upload-file')
/* GET users listing. */
router.route('/')
    .all(isContinue)
    .get(PositionController.find)
    .post(fileUpload.uploadFile,PositionController.save)
    .delete(PositionController.delete)

router.post('/update',fileUpload.uploadFile,PositionController.update)
router.get('/find',PositionController.findMany)

module.exports = router;