import { createSchema, Type, typedModel } from "ts-mongoose";

/**
 * Award Model
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
  media: Type.string(),
  place: Type.number({ required: true }),
  title: Type.string({ required: true }),
  condition: Type.string({
    required: true,
    enum: [
      "Likes",
      "Likes1",
      "Likes2",
      "Likes3",
      "Likes4",
      "Likes5",
      "Comments",
      "Challenges",
      "Shared",
      "f5",
      "f10",
      "f20",
    ],
  }),
  description: Type.string({ required: true }),
  date: Type.string({ required: true }),
  createAt: Type.date({ default: Date.now }),
  modifiedAt: Type.date({ default: Date.now }),
  deleted: Type.boolean({ default: false }),
});

const Award = typedModel("Award", schema, undefined, undefined, {
  /**
   * Create Award
   * @param award
   */
  async create(award) {
    console.log("CREATE AWARD", award);
    if (award._id) {
      return award;
    } else {
      return await new Award(award).save();
    }
  },
  /**
   * Delete Award
   * @param id  id A
   */
  delete(id) {
    return Award.findByIdAndUpdate(id, { deleted: true });
  },
  /**
   * Edit Award
   * @param id id del Award
   * @param award Award new data
   */
  update(id, award) {
    return Award.findOneAndUpdate({ _id: id }, award);
  },
  /**
   * Get Award
   * @param id `_id` del Award
   */
  getById(id) {
    return Award.findById(id).populate("user post");
  },
});

/**
 * Exporta el modelo
 */
export default Award;
