const adminController = require('./../Controllers/adminController.js')
const express = require('express')
const router = express.Router()

router.get('/getainfo/:id',adminController.adminInfo)
router.post('/login',adminController.login)
router.post('/signup',adminController.signup)
router.post('/sendotp',adminController.sendotp)


module.exports = router