import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

import { User } from "./users.js";
import { Perfil } from "./perfil.js";
import { Menu } from "./menu.js";
import { Salud } from "./salud.js";
import { Problema_Salud } from "./problema_salud.js";
import { Actividad } from "./actividad.js";
import { Inscripcion } from "./inscripcion.js";
import { Mensajeria } from "./mensajeria.js";
import { Ruta } from "./rutas.js";
import { Banco } from "./banco.js";
import { Cuenta_corriente } from "./cuenta_corriente.js";
import { MovCuentaCorriente } from "./mov_cuenta_corriente.js";
import { Noticia } from "./noticias.js";
import { Imagen } from "./imagenes.js";

//esto define relaciones
Perfil.belongsToMany(Menu, { through: "menu_perfil" });
Menu.belongsToMany(Perfil, { through: "menu_perfil" });

Perfil.hasMany(User);
User.belongsTo(Perfil);
User.hasOne(Salud);
Salud.belongsTo(User);
Salud.hasMany(Problema_Salud);
User.belongsToMany(Actividad, { through: Inscripcion });
Actividad.belongsToMany(User, { through: Inscripcion });
Ruta.belongsToMany(Actividad, { through: "ruta_actividad" });
Actividad.belongsToMany(Ruta, { through: "ruta_actividad" });
Ruta.belongsToMany(Imagen, { through: "ruta_imagen" });
Imagen.belongsToMany(Ruta, { through: "ruta_imagen" });

User.hasMany(Noticia);
Noticia.belongsTo(User);
Noticia.belongsToMany(Imagen, { through: "noticia_imagen" });
Imagen.belongsToMany(Noticia, { through: "noticia_imagen" });

User.hasMany(Cuenta_corriente);
Cuenta_corriente.belongsTo(User);
Banco.hasMany(Cuenta_corriente);
Cuenta_corriente.belongsTo(Banco);
MovCuentaCorriente.belongsTo(Cuenta_corriente);
Cuenta_corriente.hasMany(MovCuentaCorriente);

Mensajeria.belongsTo(User, {
  foreignKey: {
    name: "remitente",
  },
});
Mensajeria.belongsTo(User, {
  foreignKey: {
    name: "emisor",
  },
});

//await sequelize.sync({ force: true });

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
  MovCuentaCorriente,
  Noticia,
  Imagen,
};
