import { DataTypes } from "sequelize";

import { User } from "./users.js";
import { Perfil } from "./perfil.js";
import { Menu } from "./menu.js";
import sequelize from "../database/database.js";

//esto define relaciones
User.belongsTo(Perfil, {
  foreignKey: {
    name: "perfil_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Perfil.hasMany(User);
Perfil.belongsToMany(Menu, { through: "menu_perfil" });
Menu.belongsToMany(Perfil, { through: "menu_perfil" });

await sequelize.sync({ force: true });

export { User, Perfil, Menu };
