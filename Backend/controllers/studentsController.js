const Students = require('../models/studentsModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getStudents = async (req, res) => {
    res.json({ msg: 'all students here' })
}
const createStudents = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(401)
        throw new Error('please fill all filds')
    }
    const studentExists = await Students.findOne({ email: email })

    if (studentExists) {
        res.status(400)
        throw new Error('This Student exist')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const students = await Students.create({
        name,
        email,
        password: hashedPassword
    })
    if (students) {
        res.status(200)
        res.json({
            name: students.name,
            email: students.email,
            _id: students._id,
            token: genrateToken(students._id)
        })
    }
    // res.json(students)
    res.sand('student register')
}
)

const loginStudent = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(401)
        throw new Error('please fill all filds')
    }
    const student = await Students.findOne({ email: email })
    if (!student) {
        res.status(400)
        throw new Error('This Student not exist')
    }

    if (student && await bcrypt.compare(password, student.password)) {
        res.status(201)
        res.json({
            name: student.name,
            email: student.email,
            _id: student._id
        })
    }
    else {
        res.status(400)
        throw new Error('This Student not exist')
    }

})

const genrateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = { getStudents, createStudents, loginStudent }