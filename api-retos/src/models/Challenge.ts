import { createSchema, Type, typedModel } from "ts-mongoose";

// INTERFACES & MODELS
import Award from "./award";
import Reference from "./Reference";
import User from "./user"

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
  challenging: Type.objectId({ required: true, ref: "Reference" }),
  challenged: Type.objectId({ required: true, ref: "Reference" }),
  public: Type.boolean({ required: true }),
  intentos: [Type.string({ required: false })],
  views: [Type.mixed()],
  solidary: [Type.mixed()],
  awards: [Type.objectId({ required: true, ref: "Award" })],
  title: Type.string({ required: true }),
  description: Type.string({ required: true }),
  challenges: [Type.objectId({ required: true, ref: "Challenge" })],
  createAt: Type.date({ default: Date.now }),
  modifiedAt: Type.date({ default: Date.now }),
  deleted: Type.boolean({ default: false }),
});

const Challenge = typedModel("Challenge", schema, undefined, undefined, {
  /**
   * Get New Challenges
   * @param id `_id` challenge
   */
  getNew() {
    return Challenge.find({deleted:false})
      .populate({ path: "challenging", populate: "userId" })
      .populate({ path: "challenged", populate: "userId" })
      .populate("awards");
  },
  /**
   * Create Challenge
   * @param aptitudes
   */
  async create(challenge: any) {
    try {
      // create challenging / challenged
      let challenging = null;
      let challenged = null;
      let haveFather = false;
      if (challenge.challenging.media === challenge.challenged.media) {
        // PADRE ABSOLUTO
        challenging = await Reference.create(challenge.challenging);
        challenged = challenging;
      } else {
        // HIJO DEL CHALLENGING
        console.log("PADREEEEE");
        console.log(challenge.challenged);
        haveFather = true;
        challenging = await Reference.findById(challenge.challenging);
        challenged = await Reference.create(challenge.challenged);
      }
      challenge.challenging = challenging._id;
      challenge.challenged = challenged._id;
      // create awards
      const awards = [];
      for (const i in challenge.awards) {
        const newAward = await Award.create(challenge.awards[i]);
        awards.push(newAward._id);
      }
      challenge.awards = awards;
      console.log(challenge);
      // create challenge
      if (haveFather) {
        const newChallenge = await new Challenge(challenge).save();
        const fatherChallenge = await Challenge.findOne({
          challenged: newChallenge.challenging,
        });
        fatherChallenge.challenges.push(newChallenge._id);
        console.log(fatherChallenge);
        await fatherChallenge.save();
        return newChallenge;
      } else {
        return await new Challenge(challenge).save();
      }
    } catch (e) {
      console.log(e);
    }
  },
  /**
   * Edit a Challenge
   * @param id id challenge
   * @param aptitudes Challenge new data
   */
  update(id, aptitude) {
    return Challenge.findOneAndUpdate({ _id: id }, aptitude);
  },
  /**
   * Get a Challenge
   * @param id `_id` challenges
   */
  getById(id) {
    try {
      return Challenge.findById(id)
        .populate({
          path: "challenging",
          populate: [
            "userId comments",
            { path: "comments", populate: "userReference" },
            { path: "reactions", populate: "userReference" },
          ],
        })
        .populate({
          path: "challenged",
          populate: [
            "userId comments",
            { path: "comments", populate: "userReference" },
            { path: "reactions", populate: "userReference" },
          ],
        });
    } catch (e) {
      console.log(e);
    }
  },
  /**
   * Get Parent
   * @param id `_id` challenges
   */
  async getParent(id:string) {
    const challenge = await Challenge.findById(id);
    return Challenge.findOne({ challenged: challenge.challenging })
      .populate({
        path: "challenging",
        populate: [
          "userId comments",
          { path: "comments", populate: "userReference" },
          { path: "reactions", populate: "userReference" },
        ],
      })
      .populate({
        path: "challenged",
        populate: [
          "userId comments",
          { path: "comments", populate: "userReference" },
          { path: "reactions", populate: "userReference" },
        ],
      });
  },

  /**
   * Update Views
   * @param idC `_id` challenges
   * @param views `views` array de views nuevo.
   */
  async updateViews(idC: string, views: any[]) {
    const challenge = await Challenge.findById(idC);
    challenge.views = views;
    return await challenge.save();
  },

  /**
   * DELETE CHALLENGE
   * @param idC `_id` challenges
   */
  async deleteChallenge(idC:string){
    return await Challenge.findOneAndUpdate({ _id: idC }, {deleted:true});
  },

  async getUserChallenges(idUser: string){
    const idUserRef = await User.getByIdUser(idUser)
    const userReferences = await Reference.getByIdUser(idUserRef._id)
    const challenges = []
    for(let i in userReferences){
      const reference = userReferences[i]
      const search = await Challenge.find({deleted:false,challenging:reference._id})
        .populate({
          path: "challenging",
          populate: [
            "userId comments",
            { path: "comments", populate: "userReference" },
            { path: "reactions", populate: "userReference" },
          ],
        })
        .populate({
          path: "challenged",
          populate: [
            "userId comments",
            { path: "comments", populate: "userReference" },
            { path: "reactions", populate: "userReference" },
          ],
        });
      console.log("length reference",search.length)
      search.map((challenge)=>{
        console.log("desafio")
        challenges.push(challenge)
      })
    }
    console.log("length",challenges.length)
    return challenges
  }
});

/**
 * Exporta el modelo
 */
export default Challenge;
