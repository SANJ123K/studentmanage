const router = require('express').Router();
const { addArtical, getStudentArticles, updateStudentArticle, deleteStudentArticle } = require("../controllers/studentDetails.controllers.js")
const { checkOwnerShip } = require("../middlewares/checkArticalOwnership.middlewares.js")
const validateData = require("../middlewares/validate.middlewares.js")
const protect = require("../middlewares/protectRoute.middlewares.js")
const {addCourse, getEnrollment }= require("../controllers/studentEnroll.controllers.js")

router.route('/')
.post(protect, validateData, addArtical)



router.route('/:id?')
.get(protect, getStudentArticles)

router.route('/:id')
.patch(protect, checkOwnerShip, updateStudentArticle)
.delete(protect, checkOwnerShip, deleteStudentArticle)


router.route('/enroll')
.post(protect, addCourse)
.get(protect, getEnrollment)

module.exports = router;