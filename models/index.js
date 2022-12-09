import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

import { Destino } from "./destino.js"
import { ItemPedido } from "./item_pedido.js"
import { Local } from "./local.js"
import { MetodoPago } from "./metodo_pago.js"
import { Oferta } from "./oferta.js"
import { Pago } from "./pago.js"
import { Pedido } from "./pedido.js"
import { Producto } from "./producto.js"
import { TipoUsuario } from "./tipo_usuario.js"
import { Usuario } from "./usuario.js"
import { EstadoPedido } from "./estado_pedido.js"

Pago.belongsTo(MetodoPago)
MetodoPago.hasMany(Pago)

Pedido.hasOne(Pago)
Pago.belongsTo(Pedido)

Pedido.belongsTo(EstadoPedido, {
  foreignKey: {
    allowNull: false,
  }
})
EstadoPedido.hasMany(Pedido)

Pedido.hasMany(ItemPedido)
ItemPedido.belongsTo(Pedido)

Producto.hasMany(ItemPedido)
ItemPedido.belongsTo(Producto)

Producto.hasMany(Oferta)
Oferta.belongsTo(Producto)

Producto.belongsTo(Local)
Local.hasMany(Producto)

Usuario.hasMany(Pedido)
Pedido.belongsTo(Usuario)

Usuario.hasMany(Local)
Local.belongsTo(Usuario)

Usuario.belongsTo(TipoUsuario)
TipoUsuario.hasMany(Usuario)

Usuario.hasMany(Destino)
Destino.belongsTo(Usuario)

console.log("Creating Models")

//await sequelize.sync({ force: true });

export {
  Destino,
  Pago,
  MetodoPago,
  Pedido, 
  EstadoPedido,
  Usuario,
  ItemPedido,
  Producto,
  Oferta,
  Local,
  TipoUsuario,
};
