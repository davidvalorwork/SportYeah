import * as express from "express";

/**
 * BaseController
 *
 * Controlador Base, todos los controladores heredan de él
 *
 * @author David V <davidvalorwork@gmail.com>
 * @copyright Retail Servicios Externos SL
 */

export class BaseController {
  /**
   * La aplicación express
   */
  protected app: any;

  /**
   * El constructor
   */
  public constructor() {
    this.app = express();
  }

  /**
   * Obtiene el enrutador de la aplicación
   *
   * @returns {express.Express}
   */
  public router(): express.Express {
    return this.app;
  }
}
