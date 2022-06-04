import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

import { User } from "./users.js";
import { Perfil } from "./perfil.js";
import { Menu } from "./menu.js";
import { Salud } from "./salud.js";
import { Problema_Salud } from "./problema_salud.js";
import { Inscripcion } from "./inscripcion.js";
import { Actividad } from "./actividad.js";
import { Mensajeria } from "./mensajeria.js";
import { Ruta } from "./ruta.js";
import { Banco } from "./banco.js";
import { Cuenta_corriente } from "./cuenta_corriente.js";
import { Mov_cuenta_corriente } from "./mov_cuenta_corriente.js";

//esto define relaciones
User.belongsTo(Perfil, {
  foreignKey: {
    name: "perfil_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Mensajeria.belongsTo(User, {
  foreignKey: {
    name: "remitente"
  }
})
Mensajeria.belongsTo(User, {
  foreignKey: {
    name: "emisor"
  }
})
Salud.belongsTo(User);
Perfil.hasMany(User);
Perfil.belongsToMany(Menu, { through: "menu_perfil" });
Menu.belongsToMany(Perfil, { through: "menu_perfil" });
Salud.belongsTo(User);
User.hasOne(Salud);
Salud.hasMany(Problema_Salud);
Cuenta_corriente.belongsTo(Banco);
Banco.hasMany(Cuenta_corriente);
User.hasOne(Cuenta_corriente);
Cuenta_corriente.belongsTo(User);
Mov_cuenta_corriente.belongsTo(Cuenta_corriente);
Cuenta_corriente.hasMany(Mov_cuenta_corriente);


await sequelize.sync({ force: true });

export {
  User,
  Perfil,
  Menu,
  Salud,
  Problema_Salud,
  Actividad,
  Inscripcion,
  Mensajeria,
  Ruta,
  Banco,
  Cuenta_corriente,
  Mov_cuenta_corriente,
};
