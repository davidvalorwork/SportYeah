/**
 * Enumeración HttpResponseCode
 *
 * Codigos de respuesta HTTP estándar
 *
 * @author David V <davidvalorwork@gmail.com>
 * @copyright Retail Servicios Externos SL
 *
 */

export enum HttpResponse {
  // Mensajes HTTP
  Ok = 200,

  // Errores HTTP
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalError = 500,
}
