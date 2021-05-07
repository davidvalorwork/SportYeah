/**
 * Clase Alert
 *
 * Contiene métodos útiles para mandar notificaciones a usuarios
 *
 * @author David V <davidvalorwork@gmail.com>
 * @copyright Retail Servicios Externos SL
 *
 */

import { match } from "assert";
import Comment from "../models/comment";
import User from "../models/user";
import { Config } from "./config";
import { Environment } from "./environment";
import { Socket } from "./socket";
export class Alert {
  /**
   * El constructor
   */
  private constructor() {
    // Constructor Privado
  }

  /**
   * Avisa que tiene una nueva notificacion
   *
   */
  // public static notification(user): void {
  //   Socket.findOneByIdUser(user)
  //     .then((user) => {
  //       Socket.IO.to(user.id).emit("notification");
  //     })
  //     .catch((err) => {});
  // }
}
