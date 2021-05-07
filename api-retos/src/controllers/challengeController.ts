/**
 * UserController
 *
 * Controlador de usuarios
 *
 * @author David V <davidvalorwork@gmail.com>
 * @copyright Retail Servicios Externos SL
 */

import { BaseController } from "./baseController";
import { HttpResponse } from "../helpers/httpResponse";
import { Request, Response } from "express";

/**
 * Modelos necesarios
 */
import Challenge from "../models/Challenge";

/**
 * Clases de utilidad necesarias
 */
import { Web } from "../helpers/web";
import { Crypto } from "../helpers/crypto";
import { Net } from "../helpers/net";
import { Authentication } from "../routes/middleware/authentication";

/**
 * Controlador de envío de correos
 */
import { MailController as Mailer } from "./mailController";
import Comments from "../models/comment";
import Reaction from "../models/Reaction";

export class ChallengeController extends BaseController {
  /**
   * El constructor
   */
  public constructor() {
    // Llamamos al constructor padre
    super();
  }

  /**
   * Get Newest Challenges
   *
   * @route /v001/challenge/all
   * @method get
   */
  public getNew(request: Request, respose: Response) {
    Challenge.getNew()
      .then((challenges) => {
        respose.status(HttpResponse.Ok).json({
          challenges,
        });
      })
      .catch((error) => {
        respose.status(HttpResponse.NotFound).json({
          error,
        });
      });
  }

  /**
   * Get One Challenges
   *
   * @route /v001/challenge/:id
   * @method get
   */
  public getById(request: Request, respose: Response) {
    Challenge.getById(request.params.id)
      .then((challenge) => {
        respose.status(HttpResponse.Ok).json({
          challenge,
        });
      })
      .catch((error) => {
        respose.status(HttpResponse.NotFound).json({
          error,
        });
      });
  }

  /**
   * Get Parent Challenge
   *
   * @route /v001/challenge/:id
   * @method get
   */
  public getParent(request: Request, respose: Response) {
    Challenge.getParent(request.params.id)
      .then((challenge) => {
        respose.status(HttpResponse.Ok).json({
          challenge,
        });
      })
      .catch((error) => {
        respose.status(HttpResponse.NotFound).json({
          error,
        });
      });
  }

   /**
   * Get User Challenge
   *
   * @route /v001/challenge/:id
   * @method get
   */
    public getUserChallenges(request: Request, respose: Response) {
      Challenge.getUserChallenges(request.params.id)
        .then((challenges) => {
          respose.status(HttpResponse.Ok).json({
            challenges,
          });
        })
        .catch((error) => {
          respose.status(HttpResponse.NotFound).json({
            error,
          });
        });
    }

  /**
   * Create Challenge
   *
   * @route /v001/challenge/create
   * @method post
   *
   * BODY
   *
   * {
   *  "challenging": {
   *    "userId": {
   *      "referenceId": "ajskdflaksdjf",
   *      "appName": "Kecuki"
   *    },
   *    "media": "ajkdflasdfjk",
   *    "reactions": [],
   *    "comments": [],
   *    "display": 0
   *  },
   *  "challenged": {
   *    "userId": {
   *      "referenceId": "ajskdflaksdjf",
   *      "appName": "Kecuki"
   *    },
   *    "media": "ajkdflasdfjk",
   *    "reactions": [],
   *    "comments": [],
   *    "display": 0
   *  },
   *  "awards": [
   *    {
   *      "place": 1,
   *      "title": "string",
   *      "description": "string"
   *    }
   *  ],
   *  "instructions": "asdfasdfasdfasdf"
   *}
   *
   */

  public create(request: Request, response: Response) {
    const newChallenge = request.body;
    Challenge.create(newChallenge)
      .then((challenge) => {
        response.status(HttpResponse.Ok).json(challenge);
      })
      .catch((error) => {
        response.status(HttpResponse.BadRequest).json(error);
      });
  }

  /** Create Comment
   * @route /v001/challenge/comment
   * @method post
   *
   * @param referenceId id of the reference
   * @param comment comment Data
   */

  public async createComment(req: Request, res: Response) {
    const comment = req.body.comment;
    const referenceId = req.body.referenceId;
    Comments.create(comment, referenceId)
      .then((comment) => {
        res.status(HttpResponse.Ok).json(comment);
      })
      .catch((err) => {
        res.status(HttpResponse.BadRequest).json(err);
      });
  }

  /**
   * Create Reaction
   *
   * @route /v001/challenge/reaction
   * @method post
   *
   * @param referenceId id of the reference
   * @param reaction reaction Data
   */
  public async createReaction(req: Request, res: Response) {
    const reaction = req.body.reaction;
    const referenceId = req.body.referenceId;
    Reaction.create(reaction, referenceId)
      .then((reaction) => {
        res.status(HttpResponse.Ok).json(reaction);
      })
      .catch((err) => {
        res.status(HttpResponse.BadRequest).json(err);
      });
  }

  /**
   * UPDATE VIEWS
   *
   * @route /v001/challenge/views
   * @method post
   *
   * @param idC id challenge
   * @param views views array
   */
  public async updateViews(req: Request, res: Response) {
    Challenge.updateViews(req.body.idC, req.body.views)
      .then((r) => {
        console.log(r);
        res.status(HttpResponse.Ok).json(r);
      })
      .catch((e: Error) => {
        console.log(e);
        res.status(HttpResponse.BadRequest).json(e);
      });
  }

  /**
   * DELETE CHALLENGE
   *
   *
   *
   *
   */
  public async deleteChallenge(req: Request, res: Response){
    Challenge.deleteChallenge(req.params.id)
      .then((r:any)=>{
        console.log(r)
        res.status(HttpResponse.Ok).json(r)
      })
      .catch((e:Error)=>{
        console.log(e);
        res.status(HttpResponse.BadRequest).json(e)
      })
  }
}
