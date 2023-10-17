const express = require("express")

const router = express.Router()


const taskRouter = require("./tasks.router")
const userRouter = require("./users.router")
// const reportRouter = require("./reports.router")

router.use('/static/',express.static('docs'))

router.use("/tasks", taskRouter)
router.use("/users", userRouter)

module.exports = router