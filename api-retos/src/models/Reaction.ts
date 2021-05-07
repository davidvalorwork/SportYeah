import { CreateUser } from "./../helpers/createUserReference";
import { createSchema, Type, typedModel } from "ts-mongoose";
import Reference from "./Reference";

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
  userReference: Type.objectId({ required: true, ref: "User" }),
  reaction: Type.string(),
  createAt: Type.date({ default: Date.now }),
  modifiedAt: Type.date({ default: Date.now }),
  deleted: Type.boolean({ default: false }),
});

const Reaction = typedModel("reaction", schema, undefined, undefined, {
  /**
   * Create Reaction
   * @param reaction
   */
  async create(reaction, referenceId) {
    try {
      console.log(reaction);
      reaction.userReference = await CreateUser.UserCreate(
        reaction.userReference
      );
      const newReaction = await new Reaction(reaction).save();
      let referenceBD = await Reference.findOne({
        _id: referenceId,
      }).populate("reactions");
      console.log(referenceBD.reactions);
      let reactionsIDS = [];
      referenceBD.reactions
        .filter((reaction:any) => reaction.userReference !== reaction.userReference)
        .map((reaction:any) => reactionsIDS.push(reaction._id));
      const reference = await Reference.findById(referenceId);
      reactionsIDS.push(newReaction._id);
      console.log(reactionsIDS);
      reference.reactions = reactionsIDS;
      await reference.save();
      return newReaction;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  /**
   * Delete Reaction
   * @param id  id  Reaction
   */
  delete(id) {
    return Reaction.findByIdAndUpdate(id, { deleted: true });
  },
  /**
   * Edit Reaction
   * @param id id del Experiencia
   * @param reaction Experiencia con los nuevos datos
   */
  update(id, reaction) {
    return Reaction.findOneAndUpdate({ _id: id }, reaction);
  },
  /**
   * Get Reaction
   * @param id `_id` reaction
   */
  getById(id) {
    return Reaction.findById(id).populate("user post");
  },
});

/**
 * Export Model
 */
export default Reaction;
