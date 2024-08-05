import { BuildOptions, Model } from "sequelize";
import { z } from "zod";
import { UserSchema } from "../Schemas";

export type UserAttributes = z.infer<typeof UserSchema>;

export type CreateUserType = Omit<UserAttributes, "id">;

export interface UserInstance extends Model<UserAttributes>, UserAttributes {}

export type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserInstance;
};
