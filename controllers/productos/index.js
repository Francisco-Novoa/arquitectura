import express from "express";
import oracledb from 'oracledb';

export const productosRouter = express.Router();

productosRouter.get("/of/:id", async (req, res) => {
    const id = req.params.id
    const conn = await oracledb.getConnection();
    const productos = await conn.execute(`SELECT * FROM PRODUCTO p WHERE LOCAL_ID_LOCAL  = :id`, {id}, { outFormat: oracledb.OUT_FORMAT_OBJECT });
    await conn.close()

    res.status(200).json({
        productos: productos.rows,
    });
});
