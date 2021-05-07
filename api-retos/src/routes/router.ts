import * as express from "express";

/**
 * Router
 *
 * Manage routes of the app
 *
 * @author David V <davidvalorwork@gmail.com>
 * @copyright Retail Servicios Externos SL
 */

export class Router {
  /**
   * El router de express
   */
  protected route: any;

  /**
   * El constructor
   *
   * @param {Express.express} app     La aplicacion express
   */
  public constructor(app: express.Express) {
    this.route = app;

    // Carga las rutas
    this.router();
  }

  /**
   * Rutas principales de la aplicación
   *
   * Llama a los restantes enrutadores
   */
  public router(): void {
    /**
     * Challenge Router
     *
     * @route /v001/challenge/...
     */
    this.route.use("/v001/challenge", require("./challengeRoute"));
  }
}
