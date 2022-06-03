import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

import { User } from "./users.js";
import { Perfil } from "./perfil.js";
import { Menu } from "./menu.js";
import { Salud } from "./salud.js";
import { Problema_Salud } from "./problema_salud.js";
import { Inscritos } from "./inscritos.js";
import { Actividad } from "./actividad.js";
import { Mensajeria } from "./mensajeria.js";
import { Ruta } from "./ruta.js";

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
User.hasOne(Salud)
Perfil.hasMany(User);
Perfil.belongsToMany(Menu, { through: "menu_perfil" });
Menu.belongsToMany(Perfil, { through: "menu_perfil" });
Salud.belongsTo(User);
User.hasOne(Salud);
Salud.hasMany(Problema_Salud);

await sequelize.sync({ force: true });

export {
  User,
  Perfil,
  Menu,
  Salud,
  Problema_Salud,
  Actividad,
  Inscritos,
  Mensajeria,
  Ruta,
};
