import express from "express";
import oracledb from 'oracledb';

export const pedidosRouter = express.Router();

pedidosRouter.get("/:id", async (req, res) => {
    const id = req.params.id
    const conn = await oracledb.getConnection();
    const pedidoHeader = await conn.execute(`SELECT * FROM PEDIDO p  WHERE ID_PEDIDO  = :id`,{id},{ outFormat: oracledb.OUT_FORMAT_OBJECT });
    const pedidoDetalle = await conn.execute(`
        SELECT * 
        FROM ITEM_PEDIDO ip 
	        JOIN PRODUCTO p ON  p.ID_PRODUCTO  = ip.PRODUCTO_ID_PRODUCTO
        WHERE PEDIDO_ID_PEDIDO = :id`, {id},{ outFormat: oracledb.OUT_FORMAT_OBJECT });
    await conn.close()
    res.status(200).json({
        header: pedidoHeader.rows,
        detalle: pedidoDetalle.rows
    });
});
