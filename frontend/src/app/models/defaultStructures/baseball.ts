import { Injectable } from "@angular/core"
import { NodeStructure } from "src/app/models/defaultStructures/NodeStructure"

@Injectable({
  providedIn: "root",
})
export class Baseball {
  constructor(){}
  assetsRoute: string = `./assets/images/structure/` // ruta para imagenes prueba
  defaultImg: string = `./assets/images/logox.png` // Imagen de sportyeah
  

  /*
   * Entrenadores
   */

  juan: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Juan`,
    `Entrenador`,
    `Futura leyenda del Baseball...`,
     true,
  )

  juanita: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Juanita`,
    `Entrenador`,
    `Futura leyenda del Baseball...`,
    true
  )

  /*
   * Jugadores
   */

  antonia: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Antonia`,
    `Pivot`,
    `Futura leyenda del Baseball...`,
    true,
  )

  antonio: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Antonio`,
    `Pivot`,
    `Futura leyenda del Baseball...`,
    true,
  )

  /*
   * Plantillas
   * PL
   */
  
  PLmasculino: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.antonio],
    `Equipo`,
    `Plantilla`,
    `Nuestra mejor selecci??n`,
    true
  )

  PLfemenino: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.antonia],
    `Equipo`,
    `Plantilla`,
    `Nuestra mejor selecci??n`,
    true
  )

  /*
   * Staff
   * S
   */

  Smasculino: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.juan],
    `Staff`,
    `Staff`,
    `Nuestra mejor selecci??n`,
    true
  )

  Sfemenino: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.juanita],
    `Staff`,
    `Staff`,
    `Nuestra mejor selecci??n`,
    true
  )

  /*
   * Categorias
   * C
   */

  CcategoriaProfesionalM: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Categoria Profesional`,
    `Primer Equipo`,
    `Nuestra mejor selecci??n`,
     true
  )

  CcategoriaProfesionalF: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Categoria Profesional`,
    `Primer Equipo`,
    `Nuestra mejor selecci??n`,
     true
  )

  CbenjaminesM: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Benjamines`,
    `Benjamines`,
    `Nuestra mejor selecci??n`,
    true,
  )

  CbenjaminesF: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Benjamines`,
    `Benjamines`,
    `Nuestra mejor selecci??n`,
    true,
  )

  CalevinesM: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Alevines`,
    `Alevines`,
    `Nuestra mejor selecci??n`,
    true,
  )

  CalevinesF: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Alevines`,
    `Alevines`,
    `Nuestra mejor selecci??n`,
    true,
  )

  CinfantilM: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Infantil`,
    `Infantil`,
    `Nuestra mejor selecci??n`,
    true,
  )

  CinfantilF: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Infantil`,
    `Infantil`,
    `Nuestra mejor selecci??n`,
    true,
  )

  CcadeteM: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Cadete`,
    `Cadete`,
    `Nuestra mejor selecci??n`,
    true
  )


  CcadeteF: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Cadete`,
    `Cadete`,
    `Nuestra mejor selecci??n`,
    true
  )

  CjuvenilM: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Juvenil`,
    `Juvenil`,
    `Nuestra mejor selecci??n`,
    true,
  )

  CjuvenilF: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Juvenil`,
    `Juvenil`,
    `Nuestra mejor selecci??n`,
    true,
  )

  CseniorM: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [ this.Smasculino, this.PLmasculino ],
    `Senior`,
    `Senior`,
    `Nuestra mejor selecci??n`,
    true,
  )

  CseniorF: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.Sfemenino, this.PLfemenino],
    `Senior`,
    `Senior`,
    `Nuestra mejor selecci??n`,
    true,
  )
  
  /*
   * Divisiones
   * D
   */

  DMasculina: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [
      this.CcategoriaProfesionalM,
      this.CbenjaminesM,
      this.CalevinesM,
      this.CinfantilM,
      this.CcadeteM,
      this.CjuvenilM,
      this.CseniorM
    ],
    `Masculino`,
    `Divisi??n Masculina`,
    `Nuestra selecci??n de jovenes mejor preparados`,
    true,
  )

  DFemenino: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [
      this.CcategoriaProfesionalF,
      this.CbenjaminesF,
      this.CalevinesF,
      this.CinfantilF,
      this.CcadeteF,
      this.CjuvenilF,
      this.CseniorF
    ],
    `Femenino`,
    `Divisi??n Femenina`,
    `Nuestra famosa selecci??n, lo mejor de lo mejor`,
    true,
  )



  /*
   * Puestos gerenciales
   * PG
   */

  PGpresidente: NodeStructure = new NodeStructure (
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Presidente`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true
  )

  PGdirectorGeneral: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Director General`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorDeportivo: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Director Deportivo`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorRRHH: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Director RRHH`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorFinanciero: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Director Financiero`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorProyectos: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Director de Proyectos`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true,
  )

  PGdirectorComunicacion: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [],
    `Director Comunicaci??n`,
    `Pepe Escamilla`,
    `Director Ejecutivo de nuestro club, encargado de...`,
    true
  )

  /*
   * Organigrama
   */

  organigrama: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [
      this.PGpresidente,
      this.PGdirectorGeneral,
      this.PGdirectorDeportivo,
      this.PGdirectorRRHH,
      this.PGdirectorFinanciero,
      this.PGdirectorProyectos,
      this.PGdirectorComunicacion
    ],
    `Organigrama`,
    `Organigrama`,
    `Junta directiva del club encargada de...`,
    false,
  )

  /*
   * Estructura para soccer
   */

  estructuraClub: NodeStructure = new NodeStructure(
    [`https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`],
    [this.DMasculina,this.DMasculina],
    `Estructura Club`,
    `Estructura Club`,
    `Esta es la estructura de nuestro club`,
    false
  )

  structure: NodeStructure = new NodeStructure(
    [this.defaultImg],
    [
      this.organigrama,
      this.estructuraClub
    ],
    `Club`,
    `Nuestro Gran Club`,
    `Aqu?? encontraras toda la informaci??n de nuestro club.`,
    true
  )

}