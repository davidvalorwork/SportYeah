import { createSchema, Type, typedModel } from "ts-mongoose";

// MODELS
import User from "./user";

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
  userId: Type.objectId({ required: true, ref: "User" }),
  media: Type.string({ required: true }),
  reactions: [Type.objectId({ required: true, ref: "reaction" })],
  comments: [Type.objectId({ required: true, ref: "comment" })],
  display: Type.number({ required: true }),
  createAt: Type.date({ default: Date.now }),
  modifiedAt: Type.date({ default: Date.now }),
  deleted: Type.boolean({ default: false }),
});

const Reference = typedModel("Reference", schema, undefined, undefined, {
  /**
   * Create Reference
   * @param reference
   */
  async create(reference) {
    if (reference.userId?.appName !== undefined) {
      const userBD = await User.find({
        referenceId: reference.userId.referenceId,
      });
      let user = null;
      userBD.length === 0
        ? (user = await User.create(reference.userId))
        : (user = userBD[0]);
      reference.userId = user.id;
      return new Reference(reference).save();
    }else{
      return Reference.findById(reference)
    }
    
  },
  /**
   * Delete Reference
   * @param id  id Reference
   */
  delete(id) {
    return Reference.findByIdAndUpdate(id, { deleted: true });
  },
  /**
   * Edit Reference
   * @param id id Reference
   * @param aptitudes Reference new date
   */
  update(id, reference) {
    return Reference.findOneAndUpdate({ _id: id }, reference);
  },
  /**
   * Get Reference
   * @param id `_id` reference
   */
  getById(id) {
    return Reference.findById(id);
  },
  getByIdUser(id:string) {
    return Reference.find({userId:id});
  },
});

/**
 * Exporta el modelo
 */
export default Reference;
