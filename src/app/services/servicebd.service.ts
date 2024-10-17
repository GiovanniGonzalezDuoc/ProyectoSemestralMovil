import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rol } from '../models/rol';
import { Publicacion } from '../models/publicacion';
import { Usuarios } from '../models/usuarios';
import { Control } from '../models/control';
import { Categoria } from '../models/categoria';
import { Comentarios } from '../models/comentarios';
import { Seguimiento } from '../models/seguimiento';
import { Guardado } from '../models/guardado';
import { Pregunta } from '../models/pregunta';
import { Carreras } from '../models/carreras';
import { Contacto } from '../models/contacto';


@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  //variable de conexión a Base de Datos
  public database!: SQLiteObject;

  //variables de creación de Tablas
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol (id_rol INTEGER PRIMARY KEY NOT NULL, nombre_rol TEXT NOT NULL);";
  tablaCarrera: string = "CREATE TABLE IF NOT EXISTS carrera (id_carrera INTEGER PRIMARY KEY NOT NULL, nombre_carrera TEXT NOT NULL);";
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario (id_usuario INTEGER PRIMARY KEY NOT NULL, nombre_usuario TEXT NOT NULL, apellido_usuario TEXT NOT NULL, id_carrera INTEGER NOT NULL, telefono INTEGER NOT NULL, correo_usuario TEXT NOT NULL, contrasena TEXT NOT NULL, rol_id_rol INTEGER NOT NULL, control_usuario_id_veto INTEGER, id_pregunta INTEGER NOT NULL, respuesta TEXT NOT NULL, FOREIGN KEY (rol_id_rol) REFERENCES rol(id_rol), FOREIGN KEY (control_usuario_id_veto) REFERENCES control_usuario(id_veto), FOREIGN KEY (id_pregunta) REFERENCES preguntas(id_pregunta), FOREIGN KEY (id_carrera) REFERENCES carrera(id_carrera));";
  tablaContacto: string = "CREATE TABLE IF NOT EXISTS contacto (id_contacto INTEGER PRIMARY KEY NOT NULL, correo_usuario_contacto TEXT NOT NULL, mensaje_contacto TEXT NOT NULL);";
  tablaPreguntas: string = "CREATE TABLE IF NOT EXISTS preguntas (id_pregunta INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, pregunta TEXT NOT NULL);";
  tablaPublicacion: string = "CREATE TABLE IF NOT EXISTS publicacion (id_publicacion INTEGER PRIMARY KEY NOT NULL, nombre_usuario_publicacion TEXT NOT NULL, titulo_publicacion TEXT NOT NULL, descripcion_publicacion TEXT NOT NULL, like_publicacion INTEGER, fecha_publicacion TEXT NOT NULL, usuario_id_usuario INTEGER, categoria_publicacion_id_categoria INTEGER, foto BLOB, FOREIGN KEY (usuario_id_usuario) REFERENCES usuario(id_usuario), FOREIGN KEY (categoria_publicacion_id_categoria) REFERENCES categoria_publicacion(id_categoria));";
  tablaControl_Usuario: string = "CREATE TABLE IF NOT EXISTS control_usuario (id_veto INTEGER PRIMARY KEY NOT NULL, tiempo_veto INTEGER NOT NULL, fecha_veto TEXT NOT NULL, motivo_veto TEXT NOT NULL, usuario_id_usuario INTEGER NOT NULL, FOREIGN KEY (usuario_id_usuario) REFERENCES usuario(id_usuario));";
  tablaComentario: string = "CREATE TABLE IF NOT EXISTS comentario (id_comentario INTEGER PRIMARY KEY NOT NULL, nombre_usuario_comentario TEXT NOT NULL, comentario_publicacion TEXT NOT NULL, publicacion_id_publicacion INTEGER NOT NULL, FOREIGN KEY (publicacion_id_publicacion) REFERENCES publicacion(id_publicacion));";
  tablaCategoria_Publicacion: string = "CREATE TABLE IF NOT EXISTS categoria_publicacion (id_categoria INTEGER PRIMARY KEY NOT NULL, nombre_categoria TEXT NOT NULL);";
  tablaGuardado_Publicacion: string = "CREATE TABLE IF NOT EXISTS guardado_publicacion (publicacion_id_publicacion INTEGER NOT NULL, usuario_id_usuario INTEGER NOT NULL, PRIMARY KEY (publicacion_id_publicacion, usuario_id_usuario), FOREIGN KEY (publicacion_id_publicacion) REFERENCES publicacion(id_publicacion), FOREIGN KEY (usuario_id_usuario) REFERENCES usuario(id_usuario));";
  tablaSeguimiento_Usuario: string = "CREATE TABLE IF NOT EXISTS seguimiento_usuario (usuario_id_usuario INTEGER NOT NULL, seguimiento_id_seguimiento INTEGER NOT NULL,PRIMARY KEY (usuario_id_usuario, seguimiento_id_seguimiento),FOREIGN KEY (usuario_id_usuario) REFERENCES usuario(id_usuario),FOREIGN KEY (seguimiento_id_seguimiento) REFERENCES usuario(id_usuario))";

  //variables para los insert por defecto en nuestras tablas
  registroRol: string = "INSERT or IGNORE INTO rol(id_rol,nombre_rol) VALUES (1,'usuario'), (2,'admin');";
  registroControl_Usuario: string = "INSERT or IGNORE INTO control_usuario(id_veto,tiempo_veto,fecha_veto,usuario_id_usuario) VALUES(1,7,'06/10/2024','1')"
  registroUsuario: string = "INSERT or IGNORE INTO usuario(id_usuario,nombre_usuario,apellido_usuario,telefono,correo_usuario,contrasena) Values (2,'Giovanni','Gonzalez','37742574','juan.cristian@duocuc.cl','Tumama132$');";
  registroAdmin: string = "INSERT or IGNORE INTO usuario(id_usuario,nombre_usuario,apellido_usuario,telefono,correo_usuario,contrasena,rol_id_rol) Values (1,'admin','admin','37742574','admin','admin',2);";

  //variables para guardar los datos de las consultas en las tablas
  listadoRol = new BehaviorSubject([]);
  listadoPublicacion = new BehaviorSubject([]);
  listadoUsuarios = new BehaviorSubject([]);
  listadoControlUsuario = new BehaviorSubject([]);
  listadoCategorias = new BehaviorSubject([]);
  listadoComentarios = new BehaviorSubject([]);
  listadoSeguimiento = new BehaviorSubject([]);
  listadoGuardado = new BehaviorSubject([]);
  listadoPreguntas = new BehaviorSubject([]);
  listadoCarreras = new BehaviorSubject([]);
  listadoContactos = new BehaviorSubject([]);

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController, private toastcontroller: ToastController) {
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

  async presentToast(position: 'top' | 'middle' | 'bottom', text: string) { //posición
    const toast = await this.toastcontroller.create({
      message: text,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
  dbState() {
    return this.isDBReady.asObservable();
  }
  //función para crear la Base De Datos
  createBD() {
    //verificar si la plataforma esta disponible
    this.platform.ready().then(() => {
      //Crear la base de datos
      this.sqlite.create({
        name: 'StudentRevolutionBD.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        //Capturar la conexion a la BD
        this.database = db;
        //llamamos a la funcion para crear las tablas
        this.crearTablas();
      }).catch(e => {
        this.presentAlert('Base De Datos', 'Error en crear la BD: ' + JSON.stringify((e)));
      })
    })
  }
  //Creacionde tablas
  async crearTablas() {
    try {
      //Carga Las Listas
      this.listarPublicaciones();
      this.listarRoles();
      this.listarUsuario();
      this.listarCategorias();
      this.listarComentarios();
      this.listarPreguntas();
      this.listarCarreras();
      this.listarContactos();
      this.listarControl();
      this.listarSeguimiento();
      this.listarGuardado();

      //ejecuto la creación de Tablas
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaCarrera, []);
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaContacto, []);
      await this.database.executeSql(this.tablaControl_Usuario, []);
      await this.database.executeSql(this.tablaCategoria_Publicacion, []);
      await this.database.executeSql(this.tablaPublicacion, []);
      await this.database.executeSql(this.tablaComentario, []);
      await this.database.executeSql(this.tablaGuardado_Publicacion, []);
      await this.database.executeSql(this.tablaSeguimiento_Usuario, []);
      await this.database.executeSql(this.tablaPreguntas, []);


      //ejecuto los insert por defecto en el caso que existan
      await this.database.executeSql(this.registroRol, []);
      await this.database.executeSql(this.registroUsuario, []);
      await this.database.executeSql(this.registroControl_Usuario, []);
      await this.database.executeSql(this.registroAdmin, []);

      //modifica el estado de la Base De Datos
      await this.isDBReady.next(true);

    } catch (e) {
      this.presentAlert('Creacion De Tablas', 'Error en crear la Tablas: ' + JSON.stringify(e));
    }
  }
  //APARTADO DE ROL
  //metodos para manipular los observables
  fetchRol(): Observable<Rol[]> {
    return this.listadoRol.asObservable();
  }
  listarRoles() {
    return this.database.executeSql('SELECT * FROM rol', []).then(res => {
      //variable para almacenar el rsultado de la consulta
      let items: Rol[] = [];
      //valido si trae al menos un registro
      if (res.rows.length > 0) {
        //recorro mi resultado
        for (var i = 0; i < res.rows.length; i++)
          //agrego los registros a mi lista
          items.push({
            id_rol: res.rows.item(i).id_rol,
            nombre_rol: res.rows.item(i).nombre_rol,
          })
      }
      this.listadoRol.next(items as any);
    })
  }

  eliminarRol(id: number) {
    return this.database.executeSql('DELETE FROM rol WHERE id_rol = ?', [id]).then(res => {
      this.presentAlert("Eliminar", "Rol Eliminado");
      this.listarRoles();
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error:' + JSON.stringify(e));
    })
  }

  modificarRol(id: number, nombre_rol: string) {
    return this.database.executeSql('UPDATE rol SET nombre_rol = ? WHERE id_rol = ?', [nombre_rol, id]).then(res => {
      this.presentAlert("Modificar", "Rol Modificado");
      this.listarRoles();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error:' + JSON.stringify(e));
    })
  }

  insertarRol(nombre_rol: string) {
    return this.database.executeSql('INSERT INTO rol(nombre_rol) VALUES (?)', [nombre_rol]).then(res => {
      this.presentAlert("Insertar", "Rol Insertado");
      this.listarRoles();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error:' + JSON.stringify(e));
    })
  }
  //APARTADO DE PUBLICACIONES
  fetchPublicacion(): Observable<Publicacion[]> {
    return this.listadoPublicacion.asObservable();
  }
  listarPublicaciones() {
    return this.database.executeSql(
      'SELECT * FROM publicacion ORDER BY fecha_publicacion DESC', // Ordenar por fecha de manera descendente
      []
    ).then(res => {
      // Variable para almacenar el resultado de la consulta
      let items: Publicacion[] = [];
      // Verifico si hay al menos un registro
      if (res.rows.length > 0) {
        // Recorro los resultados
        for (var i = 0; i < res.rows.length; i++) {
          // Agrego los registros a mi lista
          items.push({
            id_publicacion: res.rows.item(i).id_publicacion,
            nombre_usuario_publicacion: res.rows.item(i).nombre_usuario_publicacion,
            titulo_publicacion: res.rows.item(i).titulo_publicacion,
            descripcion_publicacion: res.rows.item(i).descripcion_publicacion,
            like_publicacion: res.rows.item(i).like_publicacion,
            fecha_publicacion: res.rows.item(i).fecha_publicacion,
            usuario_id_usuario: res.rows.item(i).usuario_id_usuario,
            categoria_publicacion_id_categoria: res.rows.item(i).categoria_publicacion_id_categoria,
            foto: res.rows.item(i).foto
          });
        }
      }
      // Actualizo la lista de publicaciones
      this.listadoPublicacion.next(items as any);
    }).catch(err => {
      console.error('Error al listar las publicaciones:', err);
    });
  }
  listarPublicacionesID(id: number) {
    return this.database.executeSql('SELECT * FROM publicacion WHERE usuario_id_usuario= ?', [id]).then(res => {
      //variable para almacenar el rsultado de la consulta
      let items: Publicacion[] = [];
      //valido si trae al menos un registro
      if (res.rows.length > 0) {
        //recorro mi resultado
        for (var i = 0; i < res.rows.length; i++)
          //agrego los registros a mi lista
          items.push({
            id_publicacion: res.rows.item(i).id_publicacion,
            nombre_usuario_publicacion: res.rows.item(i).nombre_usuario_publicacion,
            titulo_publicacion: res.rows.item(i).titulo_publicacion,
            descripcion_publicacion: res.rows.item(i).descripcion_publicacion,
            like_publicacion: res.rows.item(i).like_publicacion,
            fecha_publicacion: res.rows.item(i).fecha_publicacion,
            usuario_id_usuario: res.rows.item(i).usuario_id_usuario,
            categoria_publicacion_id_categoria: res.rows.item(i).categoria_publicacion_id_categoria,
            foto: res.rows.item(i).foto
          })
      }
      this.listadoPublicacion.next(items as any);
      return this.listarPublicaciones();
    })
  }
  listarPublicacionesCategorias(id: number) {
    return this.database.executeSql('SELECT * FROM publicacion WHERE categoria_publicacion_id_categoria= ?', [id])
      .then(res => {
        let items: Publicacion[] = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            items.push({
              id_publicacion: res.rows.item(i).id_publicacion,
              nombre_usuario_publicacion: res.rows.item(i).nombre_usuario_publicacion,
              titulo_publicacion: res.rows.item(i).titulo_publicacion,
              descripcion_publicacion: res.rows.item(i).descripcion_publicacion,
              like_publicacion: res.rows.item(i).like_publicacion,
              fecha_publicacion: res.rows.item(i).fecha_publicacion,
              usuario_id_usuario: res.rows.item(i).usuario_id_usuario,
              categoria_publicacion_id_categoria: res.rows.item(i).categoria_publicacion_id_categoria,
              foto: res.rows.item(i).foto
            });
          }
        } else {
          this.presentAlert("No hay publicaciones para esta categoría.",'');
        }
        this.listadoPublicacion.next(items as any);
        return items;  // Aquí se retorna el array con los items
      })
      .catch(err => {
        this.presentAlert('Error ejecutando consulta SQL:', err);
        throw err;
      });
  }
  descripcionPublicaciones(id: number): Promise<void> {
    return this.database.executeSql('SELECT * FROM publicacion WHERE id_publicacion = ?', [id]).then(res => {
      let items: Publicacion[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_publicacion: res.rows.item(i).id_publicacion,
            nombre_usuario_publicacion: res.rows.item(i).nombre_usuario_publicacion,
            titulo_publicacion: res.rows.item(i).titulo_publicacion,
            descripcion_publicacion: res.rows.item(i).descripcion_publicacion,
            like_publicacion: res.rows.item(i).like_publicacion,
            fecha_publicacion: res.rows.item(i).fecha_publicacion,
            usuario_id_usuario: res.rows.item(i).usuario_id_usuario,
            categoria_publicacion_id_categoria: res.rows.item(i).categoria_publicacion_id_categoria,
            foto: res.rows.item(i).foto
          });
        }
      }
      // Actualiza el observable con la publicación encontrada
      this.listadoPublicacion.next(items as any);

      // Llamar a listarPublicaciones para recargar todas las publicaciones
      return this.listarPublicaciones();
    });
  }
  aumentarLike(idPublicacion: number) {
    return this.database.executeSql('UPDATE publicacion SET like_publicacion = COALESCE(like_publicacion, 0) + 1 WHERE id_publicacion = ?', [idPublicacion]).then(res => {
      this.listarPublicaciones()
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error:' + JSON.stringify(e));
    })
  }
  eliminarPublicacion(id: number) {
    return this.database.executeSql('DELETE FROM publicacion WHERE id_publicacion = ?', [id]).then(res => {
      this.presentAlert("Eliminar", "Publicacion Eliminado");
      this.listarPublicaciones();
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error:' + JSON.stringify(e));
    })
  }
  eliminarPublicacionID(id: number) {
    return this.database.executeSql('DELETE FROM publicacion WHERE  = usuario_id_usuario ?', [id]).then(res => {
      this.presentAlert("Eliminar", "Publicacion Eliminado");
      this.listarPublicaciones();
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error:' + JSON.stringify(e));
    })
  }

  modificarPublicacion(id: number, titulo_publicacion: string, descripcion_publicacion: string) {
    return this.database.executeSql('UPDATE publicacion SET titulo_publicacion = ?, descripcion_publicacion = ? WHERE id_publicacion = ?', [titulo_publicacion, descripcion_publicacion, id]).then(res => {
      this.presentAlert("Modificar", "Publicacion Modificado");
      this.listarPublicaciones();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error:' + JSON.stringify(e));
    })
  }

  insertarPublicacion(nombre_usuario_publicacion: string, titulo_publicacion: string, descripcion_publicacion: string, categoria_publicacion: number, usuario_id_usuario: number, foto: Blob) {
    return this.database.executeSql('INSERT INTO publicacion(nombre_usuario_publicacion,titulo_publicacion,descripcion_publicacion,fecha_publicacion,categoria_publicacion_id_categoria,usuario_id_usuario,foto) VALUES (?,?,?,CURRENT_TIMESTAMP,?,?,?)', [nombre_usuario_publicacion, titulo_publicacion, descripcion_publicacion, categoria_publicacion, usuario_id_usuario, foto]).then(res => {
      this.presentAlert("Insertar", "Publicacion Insertado");
      this.listarPublicaciones();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error:' + JSON.stringify(e));
    })
  }
  //APARTADO DE Control De USUARIOS
  fetchControl(): Observable<Control[]> {
    return this.listadoControlUsuario.asObservable();
  }
  listarControl() {
    return this.database.executeSql('SELECT * FROM control_usuario', []).then(res => {
      //variable para almacenar el rsultado de la consulta
      let items: Control[] = [];
      //valido si trae al menos un registro
      if (res.rows.length > 0) {
        //recorro mi resultado
        for (var i = 0; i < res.rows.length; i++)
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
  verificarBaneo(id: number): Promise<{ tiempoRestante: number; motivo: string } | null> {
    return this.database.executeSql('SELECT * FROM control_usuario WHERE usuario_id_usuario = ?', [id]).then(res => {
      // Valido si trae al menos un registro
      if (res.rows.length > 0) {
        const ban = res.rows.item(0); // Obtener el primer registro
        const tiempoVeto = ban.tiempo_veto; // Suponiendo que este es el tiempo de baneo en horas
        const motivoVeto = ban.motivo_veto; // Motivo del baneo
  
        // Calcular el tiempo restante (esto puede requerir que manejes el tiempo de baneo)
        const fechaVeto = new Date(ban.fecha_veto); // Asegúrate de que la fecha se almacene correctamente en la base de datos
        const tiempoBaneo = tiempoVeto * 60 * 60 * 1000; // Convertir a milisegundos
        const tiempoRestante = Math.max(0, (fechaVeto.getTime() + tiempoBaneo - Date.now()) / (1000 * 60 * 60)); // Calcular el tiempo restante en horas
  
        // Si el tiempo restante es menor o igual a 0, significa que el baneo ha expirado
        if (tiempoRestante <= 0) {
          return null; // El baneo ha expirado
        }
  
        return {
          tiempoRestante: Math.ceil(tiempoRestante), // Redondear hacia arriba
          motivo: motivoVeto,
        };
      }
      return null; // Si no hay baneos, retornar null
    });
  }  

  eliminarControl(id: number) {
    return this.database.executeSql('DELETE FROM control_usuario WHERE id_veto = ?', [id]).then(res => {
      this.presentAlert("Eliminar", "Control Veto Eliminado");
      this.listarControl();
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error:' + JSON.stringify(e));
    })
  }

  modificarControl(id_veto: number, tiempo_veto: number, motivo_veto: number, usuario_id_usuario: number) {
    return this.database.executeSql('UPDATE control_usuario SET tiempo_veto = ?, motivo_veto = ?, usuario_id_usuario = ? WHERE id_veto = ?', [tiempo_veto, motivo_veto, usuario_id_usuario, id_veto]).then(res => {
      this.presentAlert("Modificar", "Control Veto Modificado");
      this.listarControl();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error:' + JSON.stringify(e));
    })
  }

  insertarControl(tiempo_veto: number, motivo_veto: string, usuario_id_usuario: number) {
    return this.database.executeSql('INSERT INTO control_usuario(tiempo_veto,fecha_veto,motivo_veto,usuario_id_usuario) VALUES (?,CURRENT_TIMESTAMP,?,?)', [tiempo_veto, motivo_veto, usuario_id_usuario]).then(res => {
      this.presentAlert("Insertar", "Control Veto Insertado");
      this.listarControl();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error:' + JSON.stringify(e));
    })
  }
  //APARTADO DE USUARIOS
  fetchUsuario(): Observable<Usuarios[]> {
    return this.listadoUsuarios.asObservable();
  }
  listarUsuario() {
    return this.database.executeSql('SELECT * FROM usuario', []).then(res => {
      //variable para almacenar el rsultado de la consulta
      let items: Usuarios[] = [];
      //valido si trae al menos un registro
      if (res.rows.length > 0) {
        //recorro mi resultado
        for (var i = 0; i < res.rows.length; i++)
          //agrego los registros a mi lista
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            nombre_usuario: res.rows.item(i).nombre_usuario,
            apellido_usuario: res.rows.item(i).apellido_usuario,
            id_carrera: res.rows.item(i).id_carrera,
            telefono: res.rows.item(i).telefono,
            correo_usuario: res.rows.item(i).correo_usuario,
            contrasena: res.rows.item(i).contrasena,
            rol_id_rol: res.rows.item(i).rol_id_rol,
            control_usuario_id_veto: res.rows.item(i).control_usuario_id_veto,
            id_pregunta: res.rows.item(i).id_pregunta,
            respuesta: res.rows.item(i).respuesta,
          })
      }
      this.listadoUsuarios.next(items as any);
    })
  }
  listarUsuarioIDSeguidor(id:number) {
    return this.database.executeSql('SELECT * FROM usuario id_usuario=?', [id]).then(res => {
      //variable para almacenar el rsultado de la consulta
      let items: Usuarios[] = [];
      //valido si trae al menos un registro
      if (res.rows.length > 0) {
        //recorro mi resultado
        for (var i = 0; i < res.rows.length; i++)
          //agrego los registros a mi lista
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            nombre_usuario: res.rows.item(i).nombre_usuario,
            apellido_usuario: res.rows.item(i).apellido_usuario,
            id_carrera: res.rows.item(i).id_carrera,
            telefono: res.rows.item(i).telefono,
            correo_usuario: res.rows.item(i).correo_usuario,
            contrasena: res.rows.item(i).contrasena,
            rol_id_rol: res.rows.item(i).rol_id_rol,
            control_usuario_id_veto: res.rows.item(i).control_usuario_id_veto,
            id_pregunta: res.rows.item(i).id_pregunta,
            respuesta: res.rows.item(i).respuesta,
          })
      }
      this.listadoUsuarios.next(items as any);
    })
  }
  listarUsuarioID(id: number): Promise<Usuarios | null> {
    return this.database.executeSql('SELECT * FROM usuario WHERE id_usuario = ?', [id])
      .then(res => {
        if (res.rows.length > 0) {
          // Si se encuentra un usuario, devolver el primer registro como un objeto
          const usuario: Usuarios = {
            id_usuario: res.rows.item(0).id_usuario,
            nombre_usuario: res.rows.item(0).nombre_usuario,
            apellido_usuario: res.rows.item(0).apellido_usuario,
            id_carrera: res.rows.item(0).id_carrera,
            telefono: res.rows.item(0).telefono,
            correo_usuario: res.rows.item(0).correo_usuario,
            contrasena: res.rows.item(0).contrasena,
            rol_id_rol: res.rows.item(0).rol_id_rol,
            control_usuario_id_veto: res.rows.item(0).control_usuario_id_veto,
            id_pregunta: res.rows.item(0).id_pregunta,
            respuesta: res.rows.item(0).respuesta,
          };
          return usuario;
        } else {
          // Si no se encuentra el usuario, devolver null
          return null;
        }
      })
      .catch(error => {
        console.error('Error al listar usuario por ID:', error);
        return null;
      });
  }
  verificarEmail(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM usuario WHERE correo_usuario = ?';
      this.database.executeSql(query, [email])
        .then((res) => {
          if (res.rows.length > 0) {
            resolve(true); // Usuario encontrado
          } else {
            resolve(false); // Usuario no encontrado
          }
        })
        .catch(e => {
          this.presentAlert('Encontrar Usuario', 'Error:' + JSON.stringify(e));
        })
    });
  }
  verificarRespuesta(correo_usuario: string, preguntaId: number, respuesta: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM usuario WHERE correo_usuario = ? AND id_pregunta = ? AND respuesta = ?';
      this.database.executeSql(query, [correo_usuario, preguntaId, respuesta])
        .then((res) => {
          if (res.rows.length > 0) {
            resolve(true); // Respuesta correcta
          } else {
            resolve(false); // Respuesta incorrecta
          }
        })
        .catch(e => {
          this.presentAlert('Verificar Respuesta', 'Error:' + JSON.stringify(e));
          reject(e);
        });
    });
  }
  recopilarDatos(email: string, contrasena: string) {
    return this.database.executeSql('SELECT id_usuario,nombre_usuario,apellido_usuario,rol_id_rol,correo_usuario FROM usuario WHERE correo_usuario = ? AND contrasena = ?', [email, contrasena]).then(res => {
      if (res.rows.length > 0) {
        const id_usuario = res.rows.item(0).id_usuario;
        const nombre_usuario = res.rows.item(0).nombre_usuario;
        const apellido_usuario = res.rows.item(0).apellido_usuario;
        const rol_id_rol = res.rows.item(0).rol_id_rol
        const correo_usuario = res.rows.item(0).correo_usuario
        return { id_usuario, nombre_usuario, apellido_usuario, rol_id_rol, correo_usuario }; // Retorna los datos si se verifica correctamente
      } else {
        this.presentAlert("Login", "Credenciales incorrectas. Intente de nuevo.");
        return null; // No se encontró el usuario
      }
    }).catch(e => {
      this.presentAlert('Login', 'Error: ' + JSON.stringify(e));
      return null; // Manejo de errores
    });
  }
  eliminarUsuario(id: number) {
    return this.database.executeSql('DELETE FROM usuario WHERE id_usuario = ?', [id]).then(res => {
      this.presentAlert("Eliminar", "Usuario Eliminado");
      this.listarUsuario();
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error:' + JSON.stringify(e));
    })
  }

  modificarUsuario(id: number, nombre_usuario: string, apellido_usuario: string, id_carrera: number, telefono: number, correo_usuario: string, contrasena: string, rol_id_rol: number) {
    return this.database.executeSql('UPDATE usuario SET nombre_usuario = ?, apellido_usuario = ?, id_carrera = ?, telefono = ?, correo_usuario = ?, contrasena = ?, rol_id_rol = ? WHERE id_usuario = ?', [nombre_usuario, apellido_usuario, id_carrera, telefono, correo_usuario, contrasena, rol_id_rol, id]).then(res => {
      this.presentAlert("Modificar", "Usuario Modificado");
      this.listarUsuario();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error:' + JSON.stringify(e));
    })
  }
  modificarInformacion(id: number, id_carrera: number, correo_usuario: string, telefono: number) {
    return this.database.executeSql('UPDATE usuario SET id_carrera = ?, correo_usuario = ?, telefono = ?  WHERE id_usuario = ?', [id_carrera, correo_usuario, telefono, id]).then(res => {
      this.presentAlert("Modificar", "Usuario Modificado");
      this.listarUsuario();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error:' + JSON.stringify(e));
    })
  }
  modificarContra(id: number, contrasena: string) {
    return this.database.executeSql('UPDATE usuario SET contrasena = ?  WHERE id_usuario = ?', [contrasena, id]).then(res => {
      this.presentAlert("Modificar", "Usuario Modificado");
      this.listarUsuario();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error:' + JSON.stringify(e));
    })
  }

  modificarContrasena(correo_usuario: string, contrasena: string) {
    return this.database.executeSql('UPDATE usuario SET contrasena = ? WHERE correo_usuario = ?', [contrasena, correo_usuario]).then(res => {
      this.presentAlert("Modificar", "Usuario Modificado");
      this.listarUsuario();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error:' + JSON.stringify(e));
    })
  }

  insertarUsuario(nombre_usuario: string, apellido_usuario: string, id_carrera: number, telefono: number, correo_usuario: string, contrasena: string, rol_id_rol: number, id_pregunta: number, respuesta: string) {
    return this.database.executeSql('INSERT INTO usuario(nombre_usuario,apellido_usuario,id_carrera,telefono,correo_usuario,contrasena,rol_id_rol,control_usuario_id_veto,id_pregunta,respuesta) VALUES (?,?,?,?,?,?,?,1,?,?)', [nombre_usuario, apellido_usuario, id_carrera, telefono, correo_usuario, contrasena, rol_id_rol, id_pregunta, respuesta]).then(res => {
      this.presentToast('bottom', 'Usuario Registrado Correctamente.')
      this.listarUsuario();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error:' + JSON.stringify(e));
    })
  }
  //APARTADO DE Categorias
  fetchCategorias(): Observable<Categoria[]> {
    return this.listadoCategorias.asObservable();
  }
  listarCategorias() {
    return this.database.executeSql('SELECT * FROM categoria_publicacion', []).then(res => {
      //variable para almacenar el rsultado de la consulta
      let items: Categoria[] = [];
      //valido si trae al menos un registro
      if (res.rows.length > 0) {
        //recorro mi resultado
        for (var i = 0; i < res.rows.length; i++)
          //agrego los registros a mi lista
          items.push({
            id_categoria: res.rows.item(i).id_categoria,
            nombre_categoria: res.rows.item(i).nombre_categoria,
          })
      }
      this.listadoCategorias.next(items as any);
    })
  }

  elimarCategoria(id: number) {
    return this.database.executeSql('DELETE FROM categoria_publicacion WHERE id_categoria = ?', [id]).then(res => {
      this.presentAlert("Eliminar", "Categoria Eliminada");
      this.listarCategorias();
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error:' + JSON.stringify(e));
    })
  }

  modificarCategoria(id: number, nombre_categoria: string) {
    return this.database.executeSql('UPDATE categoria_publicacion SET nombre_categoria = ? WHERE id_categoria = ?', [nombre_categoria, id]).then(res => {
      this.presentAlert("Modificar", "Categoria Modificada");
      this.listarCategorias();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error:' + JSON.stringify(e));
    })
  }

  insertarCategoria(nombre_categoria: string) {
    return this.database.executeSql('INSERT INTO categoria_publicacion(nombre_categoria) VALUES (?)', [nombre_categoria]).then(res => {
      this.presentAlert("Insertar", "Categoria Insertada");
      this.listarCategorias();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error:' + JSON.stringify(e));
    })
  }
  //APARTADO DE Comentarios
  fetchComentarios(): Observable<Comentarios[]> {
    return this.listadoComentarios.asObservable();
  }
  listarComentarios() {
    return this.database.executeSql('SELECT * FROM comentario', []).then(res => {
      //variable para almacenar el rsultado de la consulta
      let items: Comentarios[] = [];
      //valido si trae al menos un registro
      if (res.rows.length > 0) {
        //recorro mi resultado
        for (var i = 0; i < res.rows.length; i++)
          //agrego los registros a mi lista
          items.push({
            id_comentario: res.rows.item(i).id_comentario,
            nombre_usuario_comentario: res.rows.item(i).nombre_usuario_comentario,
            comentario_publicacion: res.rows.item(i).comentario_publicacion,
            publicacion_id_publicacion: res.rows.item(i).publicacion_id_publicacion
          })
      }
      this.listadoComentarios.next(items as any);
    })
  }
  listarComentariosID(id: number) {
    return this.database.executeSql('SELECT * FROM comentario WHERE publicacion_id_publicacion = ?', [id]).then(res => {
      //variable para almacenar el rsultado de la consulta
      let items: Comentarios[] = [];
      //valido si trae al menos un registro
      if (res.rows.length > 0) {
        //recorro mi resultado
        for (var i = 0; i < res.rows.length; i++)
          //agrego los registros a mi lista
          items.push({
            id_comentario: res.rows.item(i).id_comentario,
            nombre_usuario_comentario: res.rows.item(i).nombre_usuario_comentario,
            comentario_publicacion: res.rows.item(i).comentario_publicacion,
            publicacion_id_publicacion: res.rows.item(i).publicacion_id_publicacion
          })
      }
      this.listadoComentarios.next(items as any);
    })
  }

  eliminarComentario(id: number) {
    return this.database.executeSql('DELETE FROM comentario  WHERE id_comentario = ?', [id]).then(res => {
      this.presentAlert("Eliminar", "Comentario Eliminado");
      this.listarComentarios();
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error:' + JSON.stringify(e));
    })
  }

  modificarComentario(id: number, nombre_usuario_comentario: string, comentario_publicacion: string) {
    return this.database.executeSql('UPDATE comentario SET nombre_usuario_comentario = ?, comentario_publicacion = ? WHERE id_comentario = ?', [nombre_usuario_comentario, comentario_publicacion, id]).then(res => {
      this.presentAlert("Modificar", "Comentario Modificado");
      this.listarComentarios();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error:' + JSON.stringify(e));
    })
  }

  insertarComentario(nombre_usuario_comentario: string, comentario_publicacion: string, publicacion_id_publicacion: number) {
    return this.database.executeSql('INSERT INTO comentario(nombre_usuario_comentario,comentario_publicacion,publicacion_id_publicacion) VALUES (?,?,?)', [nombre_usuario_comentario, comentario_publicacion, publicacion_id_publicacion]).then(res => {
      this.presentAlert("Insertar", "Comentario Insertado");
      this.listarComentarios();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error:' + JSON.stringify(e));
    })
  }
  //APARTADO DE Seguimiento
  fetchSeguimiento(): Observable<Seguimiento[]> {
    return this.listadoSeguimiento.asObservable();
  }
  listarSeguimiento() {
    return this.database.executeSql('SELECT * FROM seguimiento_usuario', []).then(res => {
      let items: Seguimiento[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          let seguimiento = {
            usuario_id_usuario: res.rows.item(i).usuario_id_usuario,
            seguimiento_id_seguimiento: res.rows.item(i).seguimiento_id_seguimiento,
          };
          items.push(seguimiento);

          // Log para verificar los datos obtenidos
          console.log('Registro de seguimiento encontrado:', seguimiento);
        }
      }
      // Actualizar el observable con los elementos obtenidos
      this.listadoSeguimiento.next(items as any);
      return items;
    }).catch(err => {
      console.error('Error listando seguimiento:', err);
    });
  }
  listarSeguimientos(id:number) {
    return this.database.executeSql('SELECT * FROM seguimiento_usuario WHERE seguimiento_id_seguimiento = ?', [id]).then(res => {
      let items: Seguimiento[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          let seguimiento = {
            usuario_id_usuario: res.rows.item(i).usuario_id_usuario,
            seguimiento_id_seguimiento: res.rows.item(i).seguimiento_id_seguimiento,
          };
          items.push(seguimiento);

          // Log para verificar los datos obtenidos
          console.log('Registro de seguimiento encontrado:', seguimiento);
        }
      }
      // Actualizar el observable con los elementos obtenidos
      this.listadoSeguimiento.next(items as any);
      return items;
    }).catch(err => {
      console.error('Error listando seguimiento:', err);
    });
  }
  // Función para obtener el número de seguidores
  obtenerSeguidores(id_usuario: number): Promise<number> {
    return this.database.executeSql(
      'SELECT COUNT(*) as total FROM seguimiento_usuario WHERE seguimiento_id_seguimiento = ?',
      [id_usuario]
    ).then(res => {
      if (res.rows.length > 0) {
        return res.rows.item(0).total; // Devuelve el número de seguidores
      }
      return 0; // Si no hay seguidores, devuelve 0
    }).catch(err => {
      console.error('Error obteniendo seguidores:', err);
      return 0; // En caso de error, devuelve 0
    });
  }
  // Función para obtener el número de usuarios que el usuario actual sigue
  obtenerSeguidos(id_usuario: number): Promise<number> {
    return this.database.executeSql(
      'SELECT COUNT(*) as total FROM seguimiento_usuario WHERE usuario_id_usuario = ?',
      [id_usuario]
    ).then(res => {
      if (res.rows.length > 0) {
        return res.rows.item(0).total; // Devuelve el número de seguidos
      }
      return 0; // Si no hay seguidos, devuelve 0
    }).catch(err => {
      console.error('Error obteniendo seguidos:', err);
      return 0; // En caso de error, devuelve 0
    });
  }
  verificarSeguimiento(usuario_id_usuario: number, seguimiento_id_seguimiento: number): Promise<boolean> {
    return this.database.executeSql(
      'SELECT * FROM seguimiento_usuario WHERE usuario_id_usuario = ? AND seguimiento_id_seguimiento = ?',
      [usuario_id_usuario, seguimiento_id_seguimiento]
    ).then(res => {
      return res.rows.length > 0; // Devuelve true si ya existe el seguimiento
    }).catch(err => {
      console.error('Error al verificar seguimiento:', err);
      return false; // En caso de error, devuelve false por defecto
    });
  }
  eliminarSeguidor(id: number) {
    return this.database.executeSql('DELETE FROM seguimiento_usuario  WHERE id_comentario = ?', [id]).then(res => {
      this.presentAlert("Eliminar", "Seguidores Eliminado");
      this.listarSeguimiento();
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error:' + JSON.stringify(e));
    })
  }

  modificarSeguidor(usuario_id_usuario: number, seguimiento_id_seguimiento: number) {
    return this.database.executeSql('UPDATE seguimiento_usuario SET usuario_id_usuario = ?, seguimiento_id_seguimiento = ? WHERE usuario_id_usuario = ?', [usuario_id_usuario, seguimiento_id_seguimiento, usuario_id_usuario]).then(res => {
      this.presentAlert("Modificar", "Seguidores Modificado");
      this.listarSeguimiento();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error:' + JSON.stringify(e));
    })
  }

  insertarSeguidores(usuario_id_usuario: number, seguimiento_id_seguimiento: number) {
    return this.database.executeSql('INSERT INTO seguimiento_usuario(usuario_id_usuario,seguimiento_id_seguimiento) VALUES (?,?)', [usuario_id_usuario, seguimiento_id_seguimiento]).then(res => {
      this.presentAlert("Insertar", "Seguidores Insertado");
      this.listarSeguimiento();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error:' + JSON.stringify(e));
    })
  }
  //APARTADO DE Guardado
  fetchGuardado(): Observable<Guardado[]> {
    return this.listadoGuardado.asObservable();
  }
  listarGuardados() {
    return this.database.executeSql('SELECT * FROM guardado_publicacion', []).then(res => {
      //variable para almacenar el rsultado de la consulta
      let items: Guardado[] = [];
      //valido si trae al menos un registro
      if (res.rows.length > 0) {
        //recorro mi resultado
        for (var i = 0; i < res.rows.length; i++)
          //agrego los registros a mi lista
          items.push({
            publicacion_id_publicacion: res.rows.item(i).publicacion_id_publicacion,
            usuario_id_usuario: res.rows.item(i).usuario_id_usuario,
          })
      }
      this.listadoGuardado.next(items as any);
    })
  }
  listarGuardado(): Promise<Guardado[]> {
    return this.database.executeSql('SELECT * FROM guardado_publicacion', []).then(res => {
      let items: Guardado[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            publicacion_id_publicacion: res.rows.item(i).publicacion_id_publicacion,
            usuario_id_usuario: res.rows.item(i).usuario_id_usuario,
          });
        }
      }
      return items; // Devuelve el arreglo de guardados
    });
  }
  eliminarGuardado(id: number) {
    return this.database.executeSql('DELETE FROM guardado_publicacion  WHERE publicacion_id_publicacion = ?', [id]).then(res => {
      this.presentAlert("Eliminar", "La Publicacion Guardada Se Elimino");
      this.listarSeguimiento();
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error:' + JSON.stringify(e));
    })
  }

  modificarGuardado(publicacion_id_publicacion: number, usuario_id_usuario: number) {
    return this.database.executeSql('UPDATE guardado_publicacion SET publicacion_id_publicacion = ?, usuario_id_usuario = ? WHERE usuario_id_usuario = ?', [publicacion_id_publicacion, usuario_id_usuario, usuario_id_usuario]).then(res => {
      this.presentAlert("Modificar", "La Publicacion Guardada se Modifico");
      this.listarSeguimiento();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error:' + JSON.stringify(e));
    })
  }

  insertarGuardado(publicacion_id_publicacion: number, usuario_id_usuario: number) {
    return this.database.executeSql('INSERT INTO guardado_publicacion(publicacion_id_publicacion,usuario_id_usuario) VALUES (?,?)', [publicacion_id_publicacion, usuario_id_usuario]).then(res => {
      this.presentAlert("Insertar", "La Publicacion Se Guardo Correctamente.");
      this.listarSeguimiento();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error:' + JSON.stringify(e));
    })
  }
  //APARTADO DE Preguntas
  fetchPreguntas(): Observable<Pregunta[]> {
    return this.listadoPreguntas.asObservable();
  }
  listarPreguntas() {
    return this.database.executeSql('SELECT * FROM preguntas', []).then(res => {
      //variable para almacenar el rsultado de la consulta
      let items: Pregunta[] = [];
      //valido si trae al menos un registro
      if (res.rows.length > 0) {
        //recorro mi resultado
        for (var i = 0; i < res.rows.length; i++)
          //agrego los registros a mi lista
          items.push({
            id_pregunta: res.rows.item(i).id_pregunta,
            pregunta: res.rows.item(i).pregunta
          })
      }
      this.listadoPreguntas.next(items as any);
    })
  }
  listarPreguntasPorId(id: number): Promise<Pregunta | null> {
    return this.database.executeSql('SELECT * FROM preguntas WHERE id_pregunta = ?', [id]).then(res => {
      // Verifica si se obtuvo al menos un registro
      if (res.rows.length > 0) {
        // Retorna la pregunta correspondiente
        return {
          id_pregunta: res.rows.item(0).id_pregunta,
          pregunta: res.rows.item(0).pregunta,
        };
      }
      return null; // Si no se encontró la pregunta, retorna null
    }).catch(e => {
      console.error('Error al listar pregunta por ID:', e);
      return null; // Manejo de errores
    });
  }
  eliminarPreguntas(id: number) {
    return this.database.executeSql('DELETE FROM preguntas  WHERE id_pregunta = ?', [id]).then(res => {
      this.presentAlert("Eliminar", "La Pregunta se elimino");
      this.listarPreguntas();
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error:' + JSON.stringify(e));
    })
  }

  modificarPreguntas(id_pregunta: number, pregunta: string) {
    return this.database.executeSql('UPDATE preguntas SET  pregunta = ? WHERE id_pregunta = ?', [pregunta, id_pregunta]).then(res => {
      this.presentAlert("Modificar", "La Pregunta se Modifico");
      this.listarPreguntas();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error:' + JSON.stringify(e));
    })
  }

  insertarPreguntas(pregunta: string) {
    return this.database.executeSql('INSERT INTO preguntas(pregunta) VALUES (?)', [pregunta]).then(res => {
      this.presentAlert("Insertar", "La Pregunta Se Inserto Correctamente.");
      this.listarPreguntas();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error:' + JSON.stringify(e));
    })
  }
  //APARTADO DE Carreras
  fetchCarreras(): Observable<Carreras[]> {
    return this.listadoCarreras.asObservable();
  }
  listarCarreras() {
    return this.database.executeSql('SELECT * FROM carrera ', []).then(res => {
      //variable para almacenar el rsultado de la consulta
      let items: Carreras[] = [];
      //valido si trae al menos un registro
      if (res.rows.length > 0) {
        //recorro mi resultado
        for (var i = 0; i < res.rows.length; i++)
          //agrego los registros a mi lista
          items.push({
            id_carrera: res.rows.item(i).id_carrera,
            nombre_carrera: res.rows.item(i).nombre_carrera
          })
      }
      this.listadoCarreras.next(items as any);
    })
  }
  listarCarrerasId(id: number): Promise<Carreras | null> {
    return this.database.executeSql('SELECT * FROM carrera WHERE id_carrera = ?', [id]).then(res => {
      // Verifica si se obtuvo al menos un registro
      if (res.rows.length > 0) {
        // Retorna la pregunta correspondiente
        return {
          id_carrera: res.rows.item(0).id_carrera,
          nombre_carrera: res.rows.item(0).nombre_carrera,
        };
      }
      return null; // Si no se encontró la pregunta, retorna null
    }).catch(e => {
      console.error('Error al listar Carrera por ID:', e);
      return null; // Manejo de errores
    });
  }
  eliminarCarrera(id: number) {
    return this.database.executeSql('DELETE FROM carrera  WHERE id_carrera = ?', [id]).then(res => {
      this.presentAlert("Eliminar", "La Carrera se elimino");
      this.listarPreguntas();
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error:' + JSON.stringify(e));
    })
  }

  modificarCarrera(id_carrera: number, nombre_carrera: string) {
    return this.database.executeSql('UPDATE carrera SET  nombre_carrera = ? WHERE id_carrera = ?', [nombre_carrera, id_carrera]).then(res => {
      this.presentAlert("Modificar", "La Carrera se Modifico");
      this.listarPreguntas();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error:' + JSON.stringify(e));
    })
  }

  insertarCarrera(nombre_carrera: string) {
    return this.database.executeSql('INSERT INTO carrera(nombre_carrera) VALUES (?)', [nombre_carrera]).then(res => {
      this.presentAlert("Insertar", "La Carrera Se Inserto Correctamente.");
      this.listarPreguntas();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error:' + JSON.stringify(e));
    })
  }
  //APARTADO DE Contacto
  fetchContacto(): Observable<Contacto[]> {
    return this.listadoContactos.asObservable();
  }
  listarContactos() {
    return this.database.executeSql('SELECT * FROM contacto', []).then(res => {
      //variable para almacenar el rsultado de la consulta
      let items: Contacto[] = [];
      //valido si trae al menos un registro
      if (res.rows.length > 0) {
        //recorro mi resultado
        for (var i = 0; i < res.rows.length; i++)
          //agrego los registros a mi lista
          items.push({
            id_contacto: res.rows.item(i).id_contacto,
            correo_usuario_contacto: res.rows.item(i).correo_usuario_contacto,
            mensaje_contacto: res.rows.item(i).mensaje_contacto
          })
      }
      this.listadoContactos.next(items as any);
    })
  }
  listarContactoId(id: number): Promise<Contacto | null> {
    return this.database.executeSql('SELECT * FROM contacto WHERE id_contacto = ?', [id]).then(res => {
      // Verifica si se obtuvo al menos un registro
      if (res.rows.length > 0) {
        // Retorna la pregunta correspondiente
        return {
          id_contacto: res.rows.item(0).id_contacto,
          correo_usuario_contacto: res.rows.item(0).correo_usuario_contacto,
          mensaje_contacto: res.rows.item(0).mensaje_contacto
        };
      }
      return null; // Si no se encontró la pregunta, retorna null
    }).catch(e => {
      console.error('Error al listar contacto por ID:', e);
      return null; // Manejo de errores
    });
  }
  eliminarContacto(id: number) {
    return this.database.executeSql('DELETE FROM contacto  WHERE id_contacto = ?', [id]).then(res => {
      this.presentAlert("Eliminar", "La Contacto se elimino");
      this.listarPreguntas();
    }).catch(e => {
      this.presentAlert('Eliminar', 'Error:' + JSON.stringify(e));
    })
  }

  modificarContacto(id_contacto: number, correo_usuario_contacto: string, mensaje_contacto: string) {
    return this.database.executeSql('UPDATE contacto SET  correo_usuario_contacto = ?, mensaje_contacto = ? WHERE id_contacto = ?', [correo_usuario_contacto, mensaje_contacto, id_contacto]).then(res => {
      this.presentAlert("Modificar", "La Contacto se Modifico");
      this.listarPreguntas();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error:' + JSON.stringify(e));
    })
  }

  insertarContacto(correo_usuario_contacto: string, mensaje_contacto: string) {
    return this.database.executeSql('INSERT INTO contacto(correo_usuario_contacto,mensaje_contacto) VALUES (?,?)', [correo_usuario_contacto, mensaje_contacto]).then(res => {
      this.listarPreguntas();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error:' + JSON.stringify(e));
    })
  }
}
