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
import { Ruta } from "./rutas.js";
import { Banco } from "./banco.js";
import { Cuenta_corriente } from "./cuenta_corriente.js";
import { Mov_cuenta_corriente } from "./mov_cuenta_corriente.js";
import { Noticia } from "./noticias.js";
import { Imagen } from "./imagenes.js";

//esto define relaciones
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
User.belongsTo(Perfil);
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
User.hasMany(Inscripcion);
Inscripcion.belongsTo(User);
Actividad.hasMany(Inscripcion);
Inscripcion.belongsTo(Actividad);
Actividad.belongsToMany(Ruta, {through: "ruta_actividad"});
Ruta.belongsToMany(Actividad, {through: "ruta_actividad"});
User.hasMany(Noticia);
Noticia.belongsTo(User);
Noticia.belongsToMany(Imagen, {through: "noticia_imagen"})
Imagen.belongsToMany(Noticia, {through: "noticia_imagen"})
Ruta.belongsToMany(Imagen, {through: "ruta_imagen"})
Imagen.belongsToMany(Ruta, {through: "ruta_imagen"})



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
  Noticia,
  Imagen,
};
