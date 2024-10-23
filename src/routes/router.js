const router = require('express').Router();
const {validateData, addArtical,getStudentArticles, updateStudentArticle, deleteStudentArticle } = require("../controllers/studentDetails.controllers.js")
const { protect } = require('../controllers/studentAuth.controllers.js')




router.route('/')
.post(protect, validateData, addArtical)



router.route('/:id?')
.get(protect, getStudentArticles)

router.route('/:id')
.patch(protect, updateStudentArticle)
.delete(protect, deleteStudentArticle)

module.exports = router;