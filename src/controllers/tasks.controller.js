require('express')

class TasksController {

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    createTask(req, res) {
        res.status(201).json({
            ok: true,
            message: "",
            info: ""
        })
    }

    /**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
    updateTask(req, res) {
        res.status(200).json({
            ok: true,
            message: "",
            info: ""
        })
    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    getTask(req, res) {
        res.status(200).json({
            ok: true,
            message: "",
            info: ""
        })
    }

    /**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
    getTasks(req, res) {
        res.status(200).json({
            ok: true,
            message: "",
            info: ""
        })
    }

    /**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
    deleteTask(req, res) {
        res.status(204).json({
            ok: true,
            message: "",
            info: ""
        })
    }
}

module.exports = TasksController