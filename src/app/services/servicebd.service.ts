import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rol } from '../models/rol';
import { Publicacion } from '../models/publicacion';
import { Usuarios } from '../models/usuarios';
import { Control } from '../models/control';


@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
//variable de conexión a Base de Datos
  public database!: SQLiteObject;

  //variables de creación de Tablas
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol (id_rol INTEGER PRIMARY KEY NOT NULL, nombre_rol TEXT NOT NULL);";
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario (id_usuario INTEGER PRIMARY KEY NOT NULL, nombre_usuario TEXT NOT NULL, apellido_usuario TEXT NOT NULL, carrera_usuario TEXT NOT NULL, telefono INTEGER NOT NULL, correo_usuario TEXT NOT NULL, contrasena TEXT NOT NULL, rol_id_rol INTEGER NOT NULL, control_usuario_id_veto INTEGER, FOREIGN KEY (rol_id_rol) REFERENCES rol(id_rol), FOREIGN KEY (control_usuario_id_veto) REFERENCES control_usuario(id_veto));";
  tablaPublicacion: string = "CREATE TABLE IF NOT EXISTS publicacion (id_publicacion INTEGER PRIMARY KEY NOT NULL, nombre_usuario_publicacion TEXT NOT NULL, titulo_publicacion TEXT NOT NULL, descripcion_publicacion TEXT NOT NULL, like_publicacion INTEGER, fecha_publicacion TEXT NOT NULL, usuario_id_usuario INTEGER , categoria_publicacion_id_categoria INTEGER , FOREIGN KEY (usuario_id_usuario) REFERENCES usuario(id_usuario), FOREIGN KEY (categoria_publicacion_id_categoria) REFERENCES categoria_publicacion(id_categoria));";
  tablaControl_Usuario: string = "CREATE TABLE IF NOT EXISTS control_usuario (id_veto INTEGER PRIMARY KEY NOT NULL, tiempo_veto INTEGER NOT NULL, fecha_veto TEXT NOT NULL, motivo_veto TEXT NOT NULL, usuario_id_usuario INTEGER NOT NULL, FOREIGN KEY (usuario_id_usuario) REFERENCES usuario(id_usuario));";
  tablaSeguimiento: string = "CREATE TABLE IF NOT EXISTS seguimiento (id_seguimiento INTEGER PRIMARY KEY NOT NULL, usuario_seguimiento TEXT NOT NULL);";
  tablaComentario: string = "CREATE TABLE IF NOT EXISTS comentario (id_comentario INTEGER PRIMARY KEY NOT NULL, nombre_usuario_comentario TEXT NOT NULL, comentario_publicacion TEXT NOT NULL, publicacion_id_publicacion INTEGER NOT NULL, FOREIGN KEY (publicacion_id_publicacion) REFERENCES publicacion(id_publicacion));";
  tablaCategoria_Publicacion: string = "CREATE TABLE IF NOT EXISTS categoria_publicacion (id_categoria INTEGER PRIMARY KEY NOT NULL, nombre_categoria TEXT NOT NULL);";
  tablaGuardado_Publicacion: string = "CREATE TABLE IF NOT EXISTS guardado_publicacion (publicacion_id_publicacion INTEGER NOT NULL, usuario_id_usuario INTEGER NOT NULL, PRIMARY KEY (publicacion_id_publicacion, usuario_id_usuario), FOREIGN KEY (publicacion_id_publicacion) REFERENCES publicacion(id_publicacion), FOREIGN KEY (usuario_id_usuario) REFERENCES usuario(id_usuario));";
  tablaSeguimiento_Usuario: string = "CREATE TABLE IF NOT EXISTS seguimiento_usuario (usuario_id_usuario INTEGER NOT NULL, seguimiento_id_seguimiento INTEGER NOT NULL, PRIMARY KEY (usuario_id_usuario, seguimiento_id_seguimiento), FOREIGN KEY (seguimiento_id_seguimiento) REFERENCES seguimiento(id_seguimiento), FOREIGN KEY (usuario_id_usuario) REFERENCES usuario(id_usuario));";  

  //variables para los insert por defecto en nuestras tablas
  registroRol: string = "INSERT or IGNORE INTO rol(id_rol,nombre_rol) VALUES (1,'usuario'), (2,'admin');";
  registroUsuario: string = "INSERT or IGNORE INTO usuario(id_usuario,nombre_usuario,apellido_usuario,carrera_usuario,telefono,correo_usuario,contrasena) Values (2,'Giovanni','Gonzalez','Ingeniero En Informatica','37742574','juan.cristian@duocuc.cl','Tumama132$');";
  registroPublicacion: string = "INSERT or IGNORE INTO publicacion(id_publicacion,nombre_usuario_publicacion,titulo_publicacion,descripcion_publicacion,like_publicacion,fecha_publicacion,usuario_id_usuario)values(1,'Giovanni Gonzalez','Seba WEKO','SOY MUITO GAY',15,'3/10/2024',1);"
  //variables para guardar los datos de las consultas en las tablas
  listadoRol = new BehaviorSubject([]);
  listadoPublicacion = new BehaviorSubject([]);
  listadoUsuarios = new BehaviorSubject([]);
  listadoControlUsuario = new BehaviorSubject([]);

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject (false);

  constructor(private sqlite: SQLite, private platform: Platform,private alertController: AlertController, private toastcontroller:ToastController) {
    this.createBD();
   }

   async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['ok'],
    });

    await alert.present();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom',text:string) { //posición
    const toast = await this.toastcontroller.create({
      message: text,
      duration: 1500,
      position: position,
    });

    await toast.present();
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
      //Carga Las Listas
      this.listarPublicaciones();
      this.listarRoles();
      this.listarUsuario();

      //ejecuto la creación de Tablas
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaControl_Usuario, []);
      await this.database.executeSql(this.tablaSeguimiento, []);
      await this.database.executeSql(this.tablaCategoria_Publicacion, []);
      await this.database.executeSql(this.tablaPublicacion, []);
      await this.database.executeSql(this.tablaComentario, []);
      await this.database.executeSql(this.tablaGuardado_Publicacion, []);
      await this.database.executeSql(this.tablaSeguimiento_Usuario, []);


      //ejecuto los insert por defecto en el caso que existan
      await this.database.executeSql(this.registroRol,[]);
      await this.database.executeSql(this.registroUsuario,[]);
      await this.database.executeSql(this.registroPublicacion,[]);

      //modifica el estado de la Base De Datos
      await this.isDBReady.next(true);
      
    }catch(e){
      this.presentAlert('Creacion De Tablas','Error en crear la Tablas: ' + JSON.stringify(e));
    }
  }
  //APARTADO DE ROL
  //metodos para manipular los observables
  fetchRol(): Observable<Rol[]>{
    return this.listadoRol.asObservable();
  }
  listarRoles(){
    return this.database.executeSql('SELECT * FROM rol', []).then(res=>{
      //variable para almacenar el rsultado de la consulta
      let items: Rol[] = [];
      //valido si trae al menos un registro
      if(res.rows.length > 0){
        //recorro mi resultado
        for(var i=0; i < res.rows.length; i++)
        //agrego los registros a mi lista
        items.push({
          id_rol: res.rows.item(i).id_rol,
          nombre_rol: res.rows.item(i).nombre_rol,
        })
      }
      this.listadoRol.next(items as any);
    })
  }

  eliminarRol(id:number){
    return this.database.executeSql('DELETE FROM rol WHERE id_rol = ?', [id] ).then(res =>{
      this.presentAlert("Eliminar","Rol Eliminado");
      this.listarRoles();
    }).catch(e=>{
      this.presentAlert('Eliminar','Error:'+ JSON.stringify(e));
    })
  }

  modificarRol(id:number,nombre_rol:string){
    return this.database.executeSql('UPDATE rol SET nombre_rol = ? WHERE id_rol = ?',[nombre_rol,id]).then(res =>{
      this.presentAlert("Modificar","Rol Modificado");
      this.listarRoles();
    }).catch(e=>{
      this.presentAlert('Modificar','Error:'+ JSON.stringify(e));
    })
  }

  insertarRol(nombre_rol:string){
    return this.database.executeSql('INSERT INTO rol(nombre_rol) VALUES (?)',[nombre_rol]).then(res =>{
      this.presentAlert("Insertar","Rol Insertado");
      this.listarRoles();
    }).catch(e=>{
      this.presentAlert('Insertar','Error:'+ JSON.stringify(e));
    })
  }
  //APARTADO DE PUBLICACIONES
  fetchPublicacion(): Observable<Publicacion[]>{
    return this.listadoPublicacion.asObservable();
  }
  listarPublicaciones(){
    return this.database.executeSql('SELECT * FROM publicacion', []).then(res=>{
      //variable para almacenar el rsultado de la consulta
      let items: Publicacion[] = [];
      //valido si trae al menos un registro
      if(res.rows.length > 0){
        //recorro mi resultado
        for(var i=0; i < res.rows.length; i++)
        //agrego los registros a mi lista
        items.push({
            id_publicacion: res.rows.item(i).id_publicacion,
            nombre_usuario_publicacion: res.rows.item(i).nombre_usuario_publicacion,
            titulo_publicacion: res.rows.item(i).titulo_publicacion,
            descripcion_publicacion: res.rows.item(i).descripcion_publicacion,
            like_publicacion: res.rows.item(i).like_publicacion,
            fecha_publicacion: res.rows.item(i).fecha_publicacion,
            usuario_id_publicacion: res.rows.item(i).usuario_id_publicacion,
            categoria_publicacion_id_categoria: res.rows.item(i).categoria_publicacion_id_categoria,
        })
      }
      this.listadoPublicacion.next(items as any);
    })
  }

  eliminarPublicacion(id:number){
    return this.database.executeSql('DELETE FROM publicacion WHERE id_publicacion = ?', [id] ).then(res =>{
      this.presentAlert("Eliminar","Publicacion Eliminado");
      this.listarPublicaciones();
    }).catch(e=>{
      this.presentAlert('Eliminar','Error:'+ JSON.stringify(e));
    })
  }

  modificarPublicacion(id:number,titulo_publicacion:string,descripcion_publicacion:string){
    return this.database.executeSql('UPDATE publicacion SET titulo_publicacion = ?, descripcion_publicacion = ? WHERE id_publicacion = ?',[titulo_publicacion,descripcion_publicacion,id]).then(res =>{
      this.presentAlert("Modificar","Publicacion Modificado");
      this.listarPublicaciones();
    }).catch(e=>{
      this.presentAlert('Modificar','Error:'+ JSON.stringify(e));
    })
  }

  insertarPublicacion(nombre_usuario_publicacion:string,titulo_publicacion:string,descripcion_publicacion:string,categoria_publicacion:number){
    return this.database.executeSql('INSERT INTO publicacion(nombre_usuario_publicacion,titulo_publicacion,descripcion_publicacion,fecha_publicacion,categoria_publicacion_id_categoria) VALUES (?,?,?,CURRENT_TIMESTAMP,?)',[nombre_usuario_publicacion,titulo_publicacion,descripcion_publicacion,categoria_publicacion]).then(res =>{
      this.presentAlert("Insertar","Publicacion Insertado");
      this.listarPublicaciones();
    }).catch(e=>{
      this.presentAlert('Insertar','Error:'+ JSON.stringify(e));
    })
  }
  //APARTADO DE Control De USUARIOS
  fetchControl(): Observable<Control[]>{
    return this.listadoControlUsuario.asObservable();
  }
  listarControl(){
    return this.database.executeSql('SELECT * FROM control_usuario', []).then(res=>{
      //variable para almacenar el rsultado de la consulta
      let items: Control[] = [];
      //valido si trae al menos un registro
      if(res.rows.length > 0){
        //recorro mi resultado
        for(var i=0; i < res.rows.length; i++)
        //agrego los registros a mi lista
        items.push({
            id_veto: res.rows.item(i).id_veto,
            tiempo_veto: res.rows.item(i).tiempo_veto,
            fecha_veto: res.rows.item(i).fecha_veto,
            motivo_veto: res.rows.item(i).motivo_veto,
            usuario_id_usuario: res.rows.item(i).usuario_id_usuario,
        })
      }
      this.listadoControlUsuario.next(items as any);
    })
  }

  eliminarControl(id:number){
    return this.database.executeSql('DELETE FROM control_usuario WHERE id_veto = ?', [id] ).then(res =>{
      this.presentAlert("Eliminar","Control Veto Eliminado");
      this.listarControl();
    }).catch(e=>{
      this.presentAlert('Eliminar','Error:'+ JSON.stringify(e));
    })
  }

  modificarControl(id_veto:number,tiempo_veto:number,motivo_veto:number,usuario_id_usuario:number){
    return this.database.executeSql('UPDATE control_usuario SET tiempo_veto = ?, motivo_veto = ?, usuario_id_usuario = ? WHERE id_veto = ?',[tiempo_veto,motivo_veto,usuario_id_usuario,id_veto]).then(res =>{
      this.presentAlert("Modificar","Control Veto Modificado");
      this.listarControl();
    }).catch(e=>{
      this.presentAlert('Modificar','Error:'+ JSON.stringify(e));
    })
  }

  insertarControl(tiempo_veto:number,motivo_veto:string,usuario_id_usuario:number){
    return this.database.executeSql('INSERT INTO control_usuario(tiempo_veto,fecha_veto,motivo_veto,usuario_id_usuario) VALUES (?,CURRENT_TIMESTAMP,?,?)',[tiempo_veto,motivo_veto,usuario_id_usuario]).then(res =>{
      this.presentAlert("Insertar","Control Veto Insertado");
      this.listarControl();
    }).catch(e=>{
      this.presentAlert('Insertar','Error:'+ JSON.stringify(e));
    })
  }
  //APARTADO DE USUARIOS
  fetchUsuario(): Observable<Usuarios[]>{
    return this.listadoUsuarios.asObservable();
  }
  listarUsuario(){
    return this.database.executeSql('SELECT * FROM usuario', []).then(res=>{
      //variable para almacenar el rsultado de la consulta
      let items: Usuarios[] = [];
      //valido si trae al menos un registro
      if(res.rows.length > 0){
        //recorro mi resultado
        for(var i=0; i < res.rows.length; i++)
        //agrego los registros a mi lista
        items.push({
            id_usuario: res.rows.item(i).id_usuario,
            nombre_usuario: res.rows.item(i).nombre_usuario,
            apellido_usuario: res.rows.item(i).apellido_usuario,
            carerra_usuario: res.rows.item(i).carerra_usuario,
            telefono: res.rows.item(i).telefono,
            correo_usuario: res.rows.item(i).correo_usuario,
            contrasena: res.rows.item(i).contrasena,
            rol_id_rol: res.rows.item(i).rol_id_rol,
            control_usuario_id_veto: res.rows.item(i).control_usuario_id_veto,
        })
      }
      this.listadoUsuarios.next(items as any);
    })
  }

  eliminarUsuario(id:number){
    return this.database.executeSql('DELETE FROM usuario WHERE id_usuario = ?', [id] ).then(res =>{
      this.presentAlert("Eliminar","Usuario Eliminado");
      this.listarUsuario();
    }).catch(e=>{
      this.presentAlert('Eliminar','Error:'+ JSON.stringify(e));
    })
  }

  modificarUsuario(id:number,nombre_usuario:string,apellido_usuario:string,carrera_usuario:string,telefono:number,correo_usuario:string,contrasena:string,rol_id_rol:number){
    return this.database.executeSql('UPDATE usuario SET nombre_usuario = ?, apellido_usuario = ?, carrera_usuario = ?, telefono = ?, correo_usuario = ?, contrasena = ?, rol_id_rol = ? WHERE id_usuario = ?',[nombre_usuario,apellido_usuario,carrera_usuario,telefono,correo_usuario,contrasena,rol_id_rol,id]).then(res =>{
      this.presentAlert("Modificar","Usuario Modificado");
      this.listarUsuario();
    }).catch(e=>{
      this.presentAlert('Modificar','Error:'+ JSON.stringify(e));
    })
  }

  insertarUsuario(nombre_usuario:string,apellido_usuario:string,carrera_usuario:string,telefono:number,correo_usuario:string,contrasena:string,rol_id_rol:number){
    return this.database.executeSql('INSERT INTO usuario(nombre_usuario,apellido_usuario,carrera_usuario,telefono,correo_usuario,contrasena,rol_id_rol,control_usuario_id_veto) VALUES (?,?,?,?,?,?,?,1)',[nombre_usuario,apellido_usuario,carrera_usuario,telefono,correo_usuario,contrasena,rol_id_rol]).then(res =>{
      this.presentAlert("Insertar","Usuario Insertado");
      this.listarUsuario();
    }).catch(e=>{
      this.presentAlert('Insertar','Error:'+ JSON.stringify(e));
    })
  }


}
