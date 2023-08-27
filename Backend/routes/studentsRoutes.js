const express = require('express')
const { getStudents, createStudents , loginStudent } = require('../controllers/studentsController')
const router = express.Router()

router.get('/' , getStudents )
router.post('/' , createStudents )
router.post('/login' , loginStudent )

module.exports = router