import { DataTypes } from "sequelize";
import { sequelize } from "../db";
import { UserInstance, UserModelStatic } from "../typing/UserTypes";
const User = <UserModelStatic>sequelize.define<UserInstance>(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    profilePicture: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    tableName: "user",
  }
);

export default User;
