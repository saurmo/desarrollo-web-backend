//Servicio de Postgres
const PostgresService = require("../../services/postgres.service");
const _pg = new PostgresService();

/**
 * Método de consultar todos los productos
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getProducts = async (req, res) => {
  try {
    let sql = "select * from products WHERE system_state='NORMAL'";
    let result = await _pg.executeSql(sql);
    let rows = result.rows;
    return res.send({
      ok: true,
      message: "Productos consultados",
      content: rows,
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Ha ocurrido un error consultando los productos",
      content: error,
    });
  }
};

/**
 * Método para consultar un producto
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let sql = "select * from products WHERE id='" + id + "' and system_state='NORMAL'";
    let result = await _pg.executeSql(sql);
    let rows = result.rows;
    return res.send({
      ok: true,
      message: "Producto consultado",
      content: rows[0],
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Ha ocurrido un error consultando el producto",
      content: error,
    });
  }
};

/**
 * Método para crear un producto
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const createProduct = async (req, res) => {
  try {
    let product = req.body;
    let sql = `INSERT INTO public.products ("name", price, brand, "size", colors, description, category, system_state) 
    VALUES($1, $2, $3, $4, $5, $6, $7, 'NORMAL')`;
    let data = [];
    data[0] = product.name;
    data[1] = product.price;
    data[2] = product.brand;
    data[3] = product.size;
    data[4] = product.colors;
    data[5] = product.description;
    data[6] = product.category;

    let result = await _pg.executeSqlData(sql, data);
    let status = result.rowCount == 1 ? 201 : 400;
    return res.status(status).send({
      ok: result.rowCount == 1,
      message: result.rowCount == 1 ? "Producto creado" : "El producto no fue creado",
      content: product,
    });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      message: "Ha ocurrido un error creando el producto",
      content: error,
    });
  }
};

/**
 * Método para actualizar un producto
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const updateProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let product = req.body;
    let sql = `UPDATE public.products SET "name"=$1, price=$2, brand=$3, 
    "size"=$4, colors=$5, description=$6, category=$7 WHERE id=$8`;
    let data = [];
    data[0] = product.name;
    data[1] = product.price;
    data[2] = product.brand;
    data[3] = product.size;
    data[4] = product.colors;
    data[5] = product.description;
    data[6] = product.category;
    data[7] = id;

    let result = await _pg.executeSqlData(sql, data);
    return res.send({
      ok: result.rowCount == 1,
      message:
        result.rowCount == 1 ? "Producto modificado" : "El producto no fue modificado",
      content: product,
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Ha ocurrido un error modificando el producto",
      content: error,
    });
  }
};

/**
 * Método para eliminar producto
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let sql = `UPDATE public.products SET system_state='ELIMINADO' WHERE id=$1;  `;
    let result = await _pg.executeSqlData(sql, [id]);
    return res.send({
      ok: result.rowCount == 1,
      message:
        result.rowCount == 1 ? "Producto eliminado" : "El producto no fue eliminado",
      content: id,
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Ha ocurrido un error eliminando el producto",
      content: error,
    });
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct, getProduct };
