const express = require('express')
const router = express.Router()

const positions = require('../controllers/mobile')


router.get('./positions', positions)
