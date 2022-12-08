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

// productosRouter.post("/", async (req, res) => {
//     const {total, usuario_correo, usuario_telefono, propina, producto_id} = req.body
//     const conn = await oracledb.getConnection();
//     const productos = await conn.execute(`
//     INSERT INTO 
//         PEDIDO (ID_PEDIDO, TOTAL, ESTADO_PEDIDO_NOMBRE_E_P, PRECIO_ENVIO, USUARIO_CORREO, USUARIO_TELEFONO, FECHA, COMISION, PROPINA)
//         VALUES ( (SELECT max(ID_PEDIDO)+ 1 FROM PEDIDO), 2150, 'preparacion', 500, 'test_email2@gmail.com', 222222222, sysdate, 150, 0);
//     `, {id}, { outFormat: oracledb.OUT_FORMAT_OBJECT });
//     await conn.close()

//     res.status(200).json({
//         productos: productos.rows,
//     });
// });


// INSERT INTO ITEM_PEDIDO (PEDIDO_ID_PEDIDO, PRODUCTO_ID_PRODUCTO, MONTO_AHORRADO) VALUES(1,1,0);

