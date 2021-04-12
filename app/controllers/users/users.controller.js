const PostgresService = require("../../services/postgres.service");
const _pg = new PostgresService();

const getUsers = async (req, res) => {
  let sql = "select * from users";
  let result = await _pg.executeSql(sql);
  let rows = result.rows;
  return res.send(rows);
};

const createUser = (req, res) => {
  return res.send("Create user");
};

const updateUser = (req, res) => {
  return res.send("Update user");
};

const deleteUser = (req, res) => {
  return res.send("Delete user");
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
