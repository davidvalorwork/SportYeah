import { createSchema, Type, typedModel } from "ts-mongoose";

/**
 * Challenge Model
 *
 * @author David Valor  <davidvalorwork@gmail.com>
 * @copyright Retail Servicios Externos SL
 *
 * @link https://www.npmjs.com/package/ts-mongoose
 */

/**
 * Define el esquema del modelo
 */
const schema = createSchema({
  appName: Type.string({ required: true, enum: ["Kecuki", "SportYeah"] }),
  referenceId: Type.string({ required: true }),
  createAt: Type.date({ default: Date.now }),
  modifiedAt: Type.date({ default: Date.now }),
  deleted: Type.boolean({ default: false }),
});

const User = typedModel("User", schema, undefined, undefined, {
  /**
   * Create User
   * @param user
   */
  create(user) {
    return new User(user).save();
  },
  /**
   * Delete User
   * @param id  id User
   */
  delete(id) {
    return User.findByIdAndUpdate(id, { deleted: true });
  },
  /**
   * Edit User
   * @param id id User
   * @param aptitudes User with new data
   */
  update(id, user) {
    return User.findOneAndUpdate({ _id: id }, user);
  },
  /**
   * Get User
   * @param id `_id` User
   */
  getById(id) {
    return User.findById(id);
  },
  getByIdUser(referenceId:string) {
    return User.findOne({referenceId});
  },
});

/**
 * Exporta el modelo
 */
export default User;
