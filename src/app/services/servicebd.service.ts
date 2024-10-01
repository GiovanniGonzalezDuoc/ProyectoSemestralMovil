import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rol } from '../models/rol';


@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
//variable de conexión a Base de Datos
  public database!: SQLiteObject;

  //variables de creación de Tablas
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol (id_rol INTEGER PRIMARY KEY NOT NULL,nombre_rol TEXT NOT NULL);";
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario (id_usuario INTEGER PRIMARY KEY NOT NULL,nombre_usuario TEXT NOT NULL,apellido_usuario TEXT NOT NULL,carrera_usuario TEXT NOT NULL,telefono INTEGER NOT NULL,correo_usuario TEXT NOT NULL,contrasena TEXT NOT NULL,rol_id_rol INTEGER NOT NULL,control_usuario_id_veto INTEGER,FOREIGN KEY (rol_id_rol) REFERENCES rol(id_rol));";
  tablaPublicacion: string = "CREATE TABLE IF NOT EXISTS publicacion (id_publicacion INTEGER PRIMARY KEY NOT NULL, nombre_usuario_publicacion TEXT NOT NULL, titulo_publicacion TEXT NOT NULL, descripcion_publicacion TEXT NOT NULL, like_publicacion INTEGER NOT NULL, fecha_publicacion TEXT NOT NULL, usuario_id_usuario INTEGER NOT NULL, FOREIGN KEY (usuario_id_usuario) REFERENCES usuario(id_usuario));";
  tablaControl_Usuario: string = "CREATE TABLE IF NOT EXISTS control_usuario (id_veto INTEGER PRIMARY KEY NOT NULL, tiempo_veto INTEGER NOT NULL, fecha_veto TEXT NOT NULL, motivo_veto TEXT NOT NULL, usuario_id_usuario INTEGER NOT NULL, FOREIGN KEY (usuario_id_usuario) REFERENCES usuario(id_usuario));";
  tablaSeguimiento: string = "CREATE TABLE IF NOT EXISTS seguimiento (id_seguimiento INTEGER PRIMARY KEY NOT NULL, usuario_seguimiento TEXT NOT NULL);";
  tablaComentario: string = "CREATE TABLE IF NOT EXISTS comentario (id_comentario INTEGER PRIMARY KEY NOT NULL, nombre_usuario_comentario TEXT NOT NULL, comentario_publicacion TEXT NOT NULL, publicacion_id_publicacion INTEGER NOT NULL, FOREIGN KEY (publicacion_id_publicacion) REFERENCES publicacion(id_publicacion));";
  tablaCategoria_Publicacion: string = "CREATE TABLE IF NOT EXISTS categoria_publicacion (id_categoria INTEGER PRIMARY KEY NOT NULL, nombre_categoria TEXT NOT NULL, publicacion_id_publicacion INTEGER NOT NULL, FOREIGN KEY (publicacion_id_publicacion) REFERENCES publicacion(id_publicacion));";
  tablaGuardado_Publicacion: string = "CREATE TABLE IF NOT EXISTS guardado_publicacion (publicacion_id_publicacion INTEGER NOT NULL, usuario_id_usuario INTEGER NOT NULL, PRIMARY KEY (publicacion_id_publicacion, usuario_id_usuario), FOREIGN KEY (publicacion_id_publicacion) REFERENCES publicacion(id_publicacion), FOREIGN KEY (usuario_id_usuario) REFERENCES usuario(id_usuario));";
  tablaSeguimiento_Usuario: string = "CREATE TABLE IF NOT EXISTS seguimiento_usuario (usuario_id_usuario INTEGER NOT NULL, seguimiento_id_seguimiento INTEGER NOT NULL, PRIMARY KEY (usuario_id_usuario, seguimiento_id_seguimiento), FOREIGN KEY (seguimiento_id_seguimiento) REFERENCES seguimiento(id_seguimiento), FOREIGN KEY (usuario_id_usuario) REFERENCES usuario(id_usuario));";

  //variables para los insert por defecto en nuestras tablas
  registroRol: string = "INSERT or IGNORE INTO rol(id_rol,nombre_rol) VALUES (1,'usuario'), (2,'admin');";
  registroUsuario: string = "INSERT or IGNORE INTO usuario(id_usuario,nombre_usuario,apellido_usuario,carrera_usuario,telefono,correo_usuario,contrasena) Values (2,'Giovanni','Gonzalez','Ingeniero En Informatica','37742574','juan.cristian@duocuc.cl','Tumama132$');";
  
  //variables para guardar los datos de las consultas en las tablas
  listadoRol = new BehaviorSubject([]);

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject (false);

  constructor(private sqlite: SQLite, private platform: Platform,private alertController: AlertController) {
    this.createBD();
   }

  async presentAlert(titulo: string, msj:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  //metodos para manipular los observables
  fetchNoticias(): Observable<Rol[]>{
    return this.listadoRol.asObservable();
  }
  dbState(){
    return this.isDBReady.asObservable();
  }
  //función para crear la Base De Datos
  createBD(){
    //verificar si la plataforma esta disponible
    this.platform.ready().then(()=>{
      //Crear la base de datos
      this.sqlite.create({
        name: 'StudentRevolution.db',
        location: 'default'
      }).then((db: SQLiteObject)=>{
        //Capturar la conexion a la BD
        this.database = db;
        //llamamos a la funcion para crear las tablas
        this.crearTablas();
      }).catch(e=>{
        this.presentAlert('Base De Datos','Error en crear la BD: ' + JSON.stringify((e)));
      })
    })
  }
  //Creacionde tablas
  async crearTablas(){
    try{
      await this.database.executeSql("DROP TABLE IF EXISTS rol", []);
      //ejecuto la creación de Tablas
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaPublicacion, []);
      await this.database.executeSql(this.tablaControl_Usuario, []);
      await this.database.executeSql(this.tablaSeguimiento, []);
      await this.database.executeSql(this.tablaComentario, []);
      await this.database.executeSql(this.tablaCategoria_Publicacion, []);
      await this.database.executeSql(this.tablaGuardado_Publicacion, []);
      await this.database.executeSql(this.tablaSeguimiento_Usuario, []);


      //ejecuto los insert por defecto en el caso que existan
      await this.database.executeSql(this.registroRol,[]);
      await this.database.executeSql(this.registroUsuario,[]);

      //modifica el estado de la Base De Datos
      await this.isDBReady.next(true);
      
    }catch(e){
      this.presentAlert('Creacion De Tablas','Error en crear la Tablas: ' + JSON.stringify(e));
    }
  }
}
