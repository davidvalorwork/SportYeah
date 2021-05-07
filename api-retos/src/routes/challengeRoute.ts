// import { UserController } from "../controllers/userController";
import { ChallengeController } from "../controllers/challengeController";

/**
 * Middleware de autenticación JWT requerido
 */
// import { Authentication } from "./middleware/authentication";

/**
 * UserRoute
 *
 * @author David V <davidvalorwork@gmail.com>
 * @copyright Retail Servicios Externos SL
 */

/**
 * Carga el controlador
 */
// const userController = new UserController();
const challengeController = new ChallengeController();

/**
 * Habilita el Router
 */
const ChallengeRouter: any = challengeController.router();

/**
 * Get Challenge
 *
 * @route /v001/challenge/all
 * @method post
 */
ChallengeRouter.get(
  "/all",
  // Authentication.jwt,
  challengeController.getNew
);

/**
 * Get One Challenge
 *
 * @route /v001/challenge/all
 * @method post
 */
ChallengeRouter.get(
  "/:id",
  // Authentication.jwt,
  challengeController.getById
);

/**
 * Get Parent
 *
 * @route /v001/challenge/all
 * @method post
 */
ChallengeRouter.get(
  "/parent/:id",
  // Authentication.jwt,
  challengeController.getParent
);

/**
 * Create Challenge
 *
 * @route /v001/challenge/create
 * @method post
 */
ChallengeRouter.post(
  "/create",
  // Authentication.jwt,
  challengeController.create
);

/**
 * Create Comment
 *
 * @route /v001/challenge/comment
 * @method post
 */
ChallengeRouter.post("/comment", challengeController.createComment);

/**
 * Create Reaction
 *
 * @route /v001/challenge/reaction
 * @method post
 */
ChallengeRouter.post("/reaction", challengeController.createReaction);

/**
 * Update Views
 *
 * @route /v001/challenge/updateviews
 * @method post
 */
ChallengeRouter.post("/updateviews", challengeController.updateViews);

/**
 * DELETE CHALLENGE
 * 
 * @route /v001/challenge/delete/:id
 * @method get
 */
ChallengeRouter.get("/delete/:id", challengeController.deleteChallenge);

/**
 * GET USER CHALLENGE
 * 
 * @route /v001/challenge/delete/:id
 * @method get
 */
 ChallengeRouter.get("/getUserChallenge/:id", challengeController.getUserChallenges);

module.exports = ChallengeRouter;
