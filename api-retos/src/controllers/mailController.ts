import { Mail } from "../helpers/mail";
import { Config } from "../helpers/config";

/**
 * MailController
 *
 * Envía mensajes de correo
 *
 * @author David V <davidvalorwork@gmail.com>
 * @copyright Retail Servicios Externos SL
 */

export class MailController {
  /**
   * El constructor
   */
  private constructor() {
    // Es privado
  }

  /**
   * Correo que se envía para validar la cuenta
   *
   * @param {User} user               El usuario
   * @param {string} validationLink   El enlace para validar la cuenta
   *
   * @return {void}
   */
  public static verifyAccount(user: any, validationLink: string): void {
    // Envía el correo para la validación de la cuenta de usuario creada
    Mail.send({
      to: user.email,
      subject: `Verificar cuenta`,
      template: "verification",
      context: {
        name: user.name,
        last_name: user.last_name || "",
        link: validationLink,
      },
    })
      .then((result) => {
        console.info(
          `[OK] Mensaje ${result} enviado con éxito a ${user.email}`
        );
      })
      .catch((error) => {
        console.error(`[ERROR] ${error}`);
      });
  }

  public static verifyAccountParents(user: any, validationLink: string): void {
    // Envía el correo para la validación de la cuenta de usuario creada
    Mail.send({
      to: user.parents_email,
      subject: `Verificar cuenta`,
      template: "verification_parents",
      context: {
        name: user.parents_name,
        last_name: user.parents_last_name || "",
        name_young: user.name,
        last_name_young: user.last_name,
        link: validationLink,
      },
    })
      .then((result) => {
        console.info(
          `[OK] Mensaje ${result} enviado con éxito a ${user.parents_email}`
        );
      })
      .catch((error) => {
        console.error(`[ERROR] ${error}`);
      });
  }

  /**
   * Correo que se envía cuando se produce un intento de acceso no conocido
   *
   * @param {User}   user             El usuario
   * @param {any}    geo              Los datos de geolocalización
   * @param {string} link             El enlace
   *
   * @return {void}
   */
  public static unknowAccess(user: any, geo: any, link: string): void {
    Mail.send({
      to: user.email,
      subject: "Acceso desconocido",
      template: "diferentIp",
      context: {
        name: user.name,
        last_name: user.last_name || "",
        link: link,
        ip: geo.ip,
        city: geo.city,
        country: geo.country,
      },
    })
      .then((result) => {
        console.info(
          `[OK] Mensaje ${result} enviado con éxito a ${user.email}`
        );
      })
      .catch((error) => {
        console.error(`[ERROR] ${error}`);
      });
  }

  /**
   * Correo que se envía cuando se produce un intento de acceso fallido
   *
   * @param {User}   user             El usuario
   * @param {any}    geo              Los datos de geolocalización
   * @param {string} link             El enlace
   *
   * @return {void}
   */
  public static attempFailed(user: any, geo: any, link: string): void {
    Mail.send({
      to: user.email,
      subject: `Intento fallido`,
      template: "attempts",
      context: {
        name: user.name,
        last_name: user.last_name || "",
        link: link,
        ip: geo.ip || "",
        city: geo.city || "",
        country: geo.country || "",
      },
    })
      .then((result) => {
        console.info(
          `[OK] Mensaje ${result} enviado con éxito a ${user.email}`
        );
      })
      .catch((error) => {
        console.error(`[ERROR] ${error}`);
      });
  }

  /**
   * Correo que se envía cuando una nueva cuenta ha sido creada
   *
   * @param {User} user               El usuario
   * @param {string} validationLink   El enlace
   *
   * @return {void}
   */
  public static newAccountCreated(user: any, link: string): void {
    Mail.send({
      to: Config.get("app.admin"),
      subject: `Nuevo usuario`,
      template: "newUser",
      context: {
        name: user.name,
        last_name: user.last_name || "",
        email: user.email,
        link: link,
      },
    })
      .then((result) => {
        console.info(
          `[OK] Mensaje ${result} enviado con éxito a ${user.email}`
        );
      })
      .catch((error) => {
        console.error(`[ERROR] ${error}`);
      });
  }

  /**
   * Correo que se envía para la recuperación de contraseña
   *
   * @param {User} user               El usuario
   * @param {string} validationLink   El enlace para validar la cuenta
   *
   * @return {void}
   */
  public static recoveryPassword(user: any, link: string): void {
    // Envía el correo de recuperación de contraseña
    Mail.send({
      to: user.email,
      subject: `Recuperar contraseña`,
      template: "forgotPassword",
      context: {
        name: user.name,
        last_name: user.last_name,
        link: link,
      },
    })
      .then((result) => {
        console.info(
          `[OK] Mensaje ${result} enviado con éxito a ${user.email}`
        );
      })
      .catch((error) => {
        console.error(`[ERROR] ${error}`);
      });
  }

  /**
   * Correo del formulario de contacto de la aplicación
   *
   * @param {User} user               El usuario
   *
   * @return {void}
   */
  public static contactUs(user: any): void {
    // Correo para el administrador del sitio
    Mail.send({
      to: Config.get("app.admin"),
      subject: `Atención al cliente`,
      template: "contactUsEs",
      context: user,
    })
      .then((result) => {
        console.info(
          `[OK] Mensaje ${result} enviado con éxito a ${Config.get(
            "app.admin"
          )}`
        );
      })
      .catch((error) => {
        console.error(`[ERROR] ${error}`);
      });

    // Correo para el usuario
    Mail.send({
      to: user.email,
      template: user.lang == "es" ? "replyUserEs" : "replyUserEn",
      subject: user.lang == "es" ? "Atención al cliente" : "Customer Support",
      context: user,
    })
      .then((result) => {
        console.info(
          `[OK] Mensaje ${result} enviado con éxito a ${user.email}`
        );
      })
      .catch((error) => {
        console.error(`[ERROR] ${error}`);
      });
  }
}
