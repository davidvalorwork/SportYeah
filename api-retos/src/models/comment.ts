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
  comment: Type.string({ required: false }),
  image: Type.string({ required: false }),
  createdAt: Type.date({ default: Date.now }),
  modifiedAt: Type.date({ default: Date.now }),
  deleted: Type.boolean({ default: false }),
});

const Comments = typedModel("comment", schema, undefined, undefined, {
  /**
   * Create Comment
   * @param comment
   */
  async create(comment, referenceId) {
    try {
      console.log(comment, referenceId);
      comment.userReference = await CreateUser.UserCreate(
        comment.userReference
      );
      const reference = await Reference.getById(referenceId);
      const newComment = await new Comments(comment).save();
      reference.comments.push(newComment._id);
      reference.save();
      return newComment;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  /**
   * Delete Comment
   * @param id  id Comment
   */
  delete(id) {
    return Comments.findByIdAndUpdate(id, { deleted: true });
  },
  /**
   * Edit Comment
   * @param id id Comment
   * @param aptitudes Comment new
   */
  update(id, comment) {
    return Comments.findOneAndUpdate({ _id: id }, comment);
  },
  /**
   * Get Comment
   * @param id `_id` comment
   */
  getById(id) {
    return Comments.findById(id);
  },
});

/**
 * Export model
 */
export default Comments;
