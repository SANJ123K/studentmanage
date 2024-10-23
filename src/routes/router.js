const router = require('express').Router();
const { addArtical, getStudentArticles, updateStudentArticle, deleteStudentArticle } = require("../controllers/studentDetails.controllers.js")
const { checkOwnerShip } = require("../middlewares/checkArticalOwnership.middlewares.js")
const validateData = require("../middlewares/validate.middlewares.js")
const protect = require("../middlewares/protectRoute.middlewares.js")

router.route('/')
.post(protect, validateData, addArtical)



router.route('/:id?')
.get(protect, getStudentArticles)

router.route('/:id')
.patch(protect, checkOwnerShip, updateStudentArticle)
.delete(protect, checkOwnerShip, deleteStudentArticle)

module.exports = router;