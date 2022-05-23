import { DataTypes } from "sequelize";

import { User } from "./users.js";
import { Perfil } from "./perfil.js";

//esto define relaciones
User.belongsTo(Perfil, {
  foreignKey: {
    name: "perfil_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Perfil.hasMany(User);

export { User, Perfil };
