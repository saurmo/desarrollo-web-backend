require("express");
const Task = require("../models/Tasks");
const { saveData, getData } = require("./filesystem.controller");

const PATH_DB = "./src/db/_tasks.json";

class TasksController {
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  createTask(req, res) {
    try {
      const payload = req.body;
      const task = new Task(payload?.id, payload?.name, payload?.description);
      task.valid();
      saveData(PATH_DB, task.toJson());
      res.status(201).json({
        ok: true,
        message: "",
        info: payload,
      });
    } catch (error) {
      console.error(error);
      res.status(error?.status || 500).json({
        ok: false,
        message: error?.message || error,
      });
    }
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
      info: "",
    });
  }
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  getTask(req, res) {
    try {
      const id = req.params.id;
      const tasks = getData(PATH_DB);
      const task = tasks.find((x) => x.id === id);
      if (!task) {
        throw { status: 404, message: "La tarea no se encontro." };
      }
      res.status(200).json({
        ok: true,
        message: "Tarea consultada",
        info: task,
      });
    } catch (error) {
      console.error(error);
      res.status(error?.status || 500).json({
        ok: false,
        message: error?.message || error,
      });
    }
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  getTasks(req, res) {
    try {
      const tasks = getData(PATH_DB);
      res.status(200).json({
        ok: true,
        message: "Tareas consultadas",
        info: tasks,
      });
    } catch (error) {
      res.status(error?.status || 500).json({
        ok: false,
        message: error?.message || error,
      });
    }
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
      info: "",
    });
  }
}

module.exports = TasksController;
