import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { LocalNotifications } from '@capacitor/local-notifications';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.page.html',
  styleUrls: ['./descripcion.page.scss'],
})
export class DescripcionPage implements OnInit {
  arregloPublicacion: any;
  likes: number = 25;
  nuevoComentario: string = '';
  isPopoverOpen = false;
  isCommentPopoverOpen = false;
  selectedOption!: string;
  fotoPredeterminada: string = "assets/icon/logo.png";
  categorias: any = {}; // Para almacenar los nombres de las categorías
  nombre_usuario: any;
  apellido_usuario: any;
  comentarios: any; // Arreglo propio para los comentarios
  comentarios2: any[] = []; // Arreglo propio para los comentarios
  rol_id_rol!: number;
  idUsuarioSeguir!: number;
  selectedComentarioId!: number;
  id_usuario!: number;
  fotoUrl!: string; // Nueva propiedad para almacenar la URL de la imagen
  UsuarioID!: number;
  comentario_nombre_usuario: string = "";
  comentarioSeleccionado: any;


  constructor(private router: Router, private activedrouter: ActivatedRoute, private bd: ServicebdService, private storage: NativeStorage, private alertController: AlertController) {
    this.activedrouter.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.arregloPublicacion = this.router.getCurrentNavigation()?.extras?.state?.['publicacion'];
      }
    });
  }

  ngOnInit() {
    this.bd.fetchCategorias().subscribe(categorias => {
      categorias.forEach(categoria => {
        this.categorias[categoria.id_categoria] = categoria.nombre_categoria;
      });
    });
    this.storage.getItem('id_usuario').then(id => {
      this.id_usuario = id;
    }).catch(err => {
      console.error('Error obteniendo id_usuario:', err);
    });
    this.storage.getItem('nombre_usuario').then(nombre => {
      this.nombre_usuario = nombre;
    }).catch(err => {
      console.error('Error obteniendo nombre_usuario:', err);
    });

    this.storage.getItem('apellido_usuario').then(apellido => {
      this.apellido_usuario = apellido;
    }).catch(err => {
      console.error('Error obteniendo apellido_usuario:', err);
    });
    this.storage.getItem('rol_id_rol').then(id => {
      this.rol_id_rol = id;
    }).catch(err => {
      console.error('Error obteniendo id_usuario:', err);
    });

    if (this.arregloPublicacion) {
      this.cargarComentarios(this.arregloPublicacion.id_publicacion);
    }
  }

  tipoSeleccionado!: string;

  openPopover(ev: any, tipo: 'comentario' | 'publicacion') {
    this.tipoSeleccionado = tipo;
    this.isPopoverOpen = true;
  }

  closePopover() {
    this.tipoSeleccionado = "";
    this.isPopoverOpen = false;
  }

  selectComentario(comentario: any) {
    this.comentarioSeleccionado = comentario; // Almacena el comentario que se seleccionó
  }

  handleOption(option: string, idUsuarioSeguir: number, comentario_nombre_usuario?: string) {
    this.closePopover();
    setTimeout(() => {
      if (option === 'option1') {
        idUsuarioSeguir = this.arregloPublicacion.usuario_id_usuario;
        // Eliminar post
        if (idUsuarioSeguir === this.id_usuario) {
          this.bd.presentToast('bottom', 'El Post Se Eliminó Correctamente.');
          this.bd.eliminarPublicacion(this.arregloPublicacion.id_publicacion);
          this.volverAlInicio();
        } else {
          this.bd.presentToast('bottom', 'El Post No Se Eliminó Correctamente Debido a que no te pertenece.');
          this.volverAlInicio();
        }
      } else if (option === 'option3') {
        idUsuarioSeguir = this.arregloPublicacion.usuario_id_usuario;
        // Opción para banear usuario
        this.solicitarTiempoBaneo(idUsuarioSeguir);
      } else if (option === 'option2') {
        idUsuarioSeguir = this.arregloPublicacion.usuario_id_usuario;
        // Lógica para seguir a un usuario
        this.storage.getItem('id_usuario').then(idUsuarioActual => {
          // Verificar si el usuario está intentando seguirse a sí mismo
          if (idUsuarioActual === idUsuarioSeguir) {
            this.bd.presentToast('bottom', 'No puedes seguirte a ti mismo.');
            return; // Salir de la función si es el mismo usuario
          }
          // Verificar si ya lo sigue
          this.bd.verificarSeguimiento(idUsuarioActual, idUsuarioSeguir).then(isFollowing => {
            if (!isFollowing) {
              // Si no lo sigue, agregar a la tabla seguimiento
              this.bd.insertarSeguidores(idUsuarioActual, idUsuarioSeguir).then(async () => {
                this.bd.presentToast('bottom', 'Se ha seguido correctamente al usuario.');

                // Enviar notificación local
                await LocalNotifications.schedule({
                  notifications: [
                    {
                      title: '¡Nuevo Seguidor!',
                      body: `${this.nombre_usuario} te ha seguido.`,
                      id: 1,
                      schedule: { at: new Date(Date.now() + 1000 * 5) }, // Notificación después de 5 segundos
                      sound: undefined,
                      attachments: [],
                      actionTypeId: '',
                      extra: null,
                    },
                  ],
                });

                this.volverAlInicio();
              }).catch(err => {
                console.error('Error al seguir al usuario:', err);
                this.bd.presentToast('bottom', 'Error al seguir al usuario.');
              });
            } else {
              // Ya lo sigue
              this.bd.presentToast('bottom', 'Ya estás siguiendo a este usuario.');
            }
          }).catch(err => {
            console.error('Error al verificar seguimiento:', err);
          });
        }).catch(err => {
          console.error('Error obteniendo id_usuario:', err);
        });
      }else if (option === 'option4') {
          const nombreUsuario = `${this.nombre_usuario || ''} ${this.apellido_usuario || ''}`.trim();
          idUsuarioSeguir = this.arregloPublicacion.usuario_id_usuario;
          // Lógica para seguir a un usuario
          this.storage.getItem('id_usuario').then(idUsuarioActual => {
            // Verificar si el usuario está intentando seguirse a sí mismo
            if (idUsuarioActual === idUsuarioSeguir || nombreUsuario === this.comentarioSeleccionado.nombre_usuario_comentario){
              this.bd.presentToast('bottom', 'No puedes seguirte a ti mismo.');
              return; // Salir de la función si es el mismo usuario
            }
            // Verificar si ya lo sigue
            this.bd.verificarSeguimiento(idUsuarioActual, idUsuarioSeguir).then(isFollowing => {
              if (!isFollowing) {
                // Si no lo sigue, agregar a la tabla seguimiento
                this.bd.insertarSeguidores(idUsuarioActual, idUsuarioSeguir).then(async () => {
                  this.bd.presentToast('bottom', 'Se ha seguido correctamente al usuario.');
  
                  // Enviar notificación local
                  await LocalNotifications.schedule({
                    notifications: [
                      {
                        title: '¡Nuevo Seguidor!',
                        body: `${this.nombre_usuario} te ha seguido.`,
                        id: 1,
                        schedule: { at: new Date(Date.now() + 1000 * 5) }, // Notificación después de 5 segundos
                        sound: undefined,
                        attachments: [],
                        actionTypeId: '',
                        extra: null,
                      },
                    ],
                  });
  
                  this.volverAlInicio();
                }).catch(err => {
                  console.error('Error al seguir al usuario:', err);
                  this.bd.presentToast('bottom', 'Error al seguir al usuario.');
                });
              } else {
                // Ya lo sigue
                this.bd.presentToast('bottom', 'Ya estás siguiendo a este usuario.');
              }
            }).catch(err => {
              console.error('Error al verificar seguimiento:', err);
            });
          }).catch(err => {
            console.error('Error obteniendo id_usuario:', err);
          });
      } else if (option === 'banearPublicacion') {
        // Banear publicación
        this.solicitarTiempoBaneoPublicacion(this.arregloPublicacion.id_publicacion);
      } else if (option === 'eliminarComentario' && this.comentarioSeleccionado) {
        const nombreUsuario = `${this.nombre_usuario || ''} ${this.apellido_usuario || ''}`.trim();

        const idSeguidorUsuario = this.comentarioSeleccionado.id_comentario;

        // Verificamos si el nombre de usuario del comentario coincide con el nombre del usuario logueado
        if (nombreUsuario === this.comentarioSeleccionado.nombre_usuario_comentario) {
          this.bd.presentToast('bottom', 'El Comentario Se Eliminó Correctamente.');

          // Llamamos a la función para eliminar el comentario, pasando el nombre de usuario
          this.bd.eliminarComentario(idSeguidorUsuario).then(() => {
            // Recargar los comentarios
            this.cargarComentarios(this.arregloPublicacion.id_publicacion);
          }).catch(err => {
            this.bd.presentToast('bottom', 'Error al eliminar el comentario.');
          });
        } else {
          this.bd.presentToast('bottom', 'No tienes permiso para eliminar este comentario.');
        }
      } else if (option === 'banearComentario') {
        // Banear comentario
        idUsuarioSeguir = this.comentarioSeleccionado.id_comentario;
        this.solicitarTiempoBaneoComentario(idUsuarioSeguir);
      } else if (option === 'editarPost') {
        const IdUsuario = this.id_usuario;
        if (IdUsuario === this.arregloPublicacion.usuario_id_usuario) {
          idUsuarioSeguir = this.arregloPublicacion;
          let navigationExtras: NavigationExtras = {
            state: {
              publicacion: idUsuarioSeguir // Pasamos la publicación completa
            }
          };
          this.router.navigate(['/modificar-publicacion'], navigationExtras);
        } else {
          this.bd.presentToast("bottom", "Esta Publicacion No Te Pertenece.")
        }
      } else if (option === 'editarComentario') {
        const nombreUsuario = `${this.nombre_usuario || ''} ${this.apellido_usuario || ''}`.trim();
        if (nombreUsuario === this.comentarioSeleccionado.nombre_usuario_comentario) {
          const idSeguidorUsuario = this.comentarioSeleccionado;
          let navigationExtras: NavigationExtras = {
            state: {
              comentario: idSeguidorUsuario // Pasamos la publicación completa
            }
          };
          this.router.navigate(['/modificar-comentario'], navigationExtras);
        } else {
          this.bd.presentToast("bottom", "Este Comentario No Te Pertenece.")
        }
      }
    }, 0);
  }


  // Método para likear o quitar like de una publicación con límite de un like por usuario
  like(idPublicacion: number) {
    // Obtener el id del usuario desde el almacenamiento
    this.storage.getItem('id_usuario').then(idUsuario => {
      const key = `likes_usuario_${idUsuario}`;

      // Obtener el listado de likes que el usuario ha dado (si existe)
      this.storage.getItem(key).then((likes: number[]) => {
        // Si no existe el arreglo, inicializamos uno vacío
        if (!likes) {
          likes = [];
        }

        // Verificar si el usuario ya dio like a esta publicación
        const index = likes.indexOf(idPublicacion);

        if (index === -1) {
          // **Caso 1: No ha dado like**
          // Aumentamos el número de likes en la base de datos
          this.bd.aumentarLike(idPublicacion).then(() => {
            // Agregamos el ID de la publicación al arreglo de likes
            likes.push(idPublicacion);

            // Guardamos el arreglo actualizado en el almacenamiento local
            this.storage.setItem(key, likes).then(() => {
              this.bd.presentToast('bottom', 'Se dio like correctamente.');
            }).catch(err => {
              console.error('Error al actualizar el almacenamiento local:', err);
              this.bd.presentToast('bottom', 'Error al registrar el like.');
            });
          }).catch(err => {
            console.error('Error al aumentar el número de likes:', err);
            this.bd.presentToast('bottom', 'Error al dar like.');
          });
        } else {
          // **Caso 2: Ya ha dado like, por lo que quitamos el like**
          // Reducimos el número de likes en la base de datos
          this.bd.disminuirLike(idPublicacion).then(() => {
            // Removemos el ID de la publicación del arreglo de likes
            likes.splice(index, 1);

            // Guardamos el arreglo actualizado en el almacenamiento local
            this.storage.setItem(key, likes).then(() => {
              this.bd.presentToast('bottom', 'Se quitó el like correctamente.');
            }).catch(err => {
              console.error('Error al actualizar el almacenamiento local:', err);
              this.bd.presentToast('bottom', 'Error al quitar el like.');
            });
          }).catch(err => {
            console.error('Error al disminuir el número de likes:', err);
            this.bd.presentToast('bottom', 'Error al quitar el like.');
          });
        }
      }).catch(() => {
        // Si no existe el registro, significa que el usuario aún no ha dado like
        this.bd.aumentarLike(idPublicacion).then(() => {
          // Creamos un nuevo arreglo de likes con el ID actual de la publicación
          const newLikes = [idPublicacion];

          // Guardamos este arreglo en el almacenamiento local
          this.storage.setItem(key, newLikes).then(() => {
            this.bd.presentToast('bottom', 'Se dio like correctamente.');
          }).catch(err => {
            console.error('Error al guardar el nuevo arreglo de likes:', err);
            this.bd.presentToast('bottom', 'Error al registrar el like.');
          });
        }).catch(err => {
          console.error('Error al aumentar el número de likes:', err);
          this.bd.presentToast('bottom', 'Error al dar like.');
        });
      });
    }).catch(err => {
      console.error('Error obteniendo id_usuario:', err);
      this.bd.presentToast('bottom', 'Error al obtener el usuario.');
    });
  }


  guardar() {
    // Asumiendo que tienes acceso al ID de la publicación actual
    const publicacionId = this.arregloPublicacion.id_publicacion; // Asegúrate de que esto se refiere al ID correcto
    // También necesitas el ID del usuario que está guardando la publicación
    this.storage.getItem('id_usuario').then(usuarioId => {
      // Verificar si la publicación ya está guardada
      this.bd.listarGuardado().then(guardados => {
        const yaGuardado = guardados.some(guardado => guardado.publicacion_id_publicacion === publicacionId && guardado.usuario_id_usuario === usuarioId);

        if (!yaGuardado) {
          // Insertar la publicación en la tabla guardado
          this.bd.insertarGuardado(publicacionId, usuarioId).then(() => {
            this.bd.presentToast('bottom', 'El Post Se Guardó Correctamente.');
          }).catch(err => {
            console.error('Error al guardar el post:', err);
            this.bd.presentToast('bottom', 'Error al guardar el post.');
          });
        } else {
          this.bd.presentToast('bottom', 'Ya has guardado este post.');
        }
      }).catch(err => {
        console.error('Error al listar guardados:', err);
      });
    }).catch(err => {
      console.error('Error obteniendo id_usuario:', err);
    });
  }

  agregarComentario() {
    if (this.nuevoComentario.trim().length > 0) {
      const idPublicacion = this.arregloPublicacion.id_publicacion;
      const nombreUsuario = `${this.nombre_usuario || ''} ${this.apellido_usuario || ''}`.trim();

      // Inserta el comentario en la base de datos
      this.bd.insertarComentario(nombreUsuario, this.nuevoComentario, idPublicacion).then(() => {
        // Limpiar el textarea después de agregar el comentario
        this.nuevoComentario = '';

        // Recargar los comentarios
        this.cargarComentarios(idPublicacion);

        this.bd.presentToast('bottom', 'Comentario agregado correctamente.');
      }).catch(() => {
        this.bd.presentToast('bottom', 'Error al agregar el comentario.');
      });
    } else {
      this.bd.presentToast('bottom', 'No puedes agregar un comentario vacío.');
    }
  }
  comentario() { }

  cargarComentarios(idPublicacion: number) {
    this.bd.listarComentariosID(idPublicacion).then(() => {
      this.bd.fetchControlComentarios().subscribe(comban => {
        this.bd.fetchComentarios().subscribe(com => {
          this.comentarios = com.filter(c =>
            !comban.some(ban => ban.comentario_id_comentario === c.id_comentario));
          this.comentarios2 = com.filter(c =>
            !comban.some(ban => ban.comentario_id_comentario === c.id_comentario));
        });
      })
    });
  }

  volverAlInicio() {
    this.router.navigate(['/home']).then(() => {
      this.bd.fetchPublicacion().subscribe(publicaciones => {
        this.arregloPublicacion = publicaciones;
      });
    });
  }
  // Método para solicitar el tiempo de baneo
  async solicitarTiempoBaneo(usuarioId: number) {
    const alert = await this.alertController.create({
      header: 'Baneo de Usuario',
      inputs: [
        {
          name: 'tiempoBaneo',
          type: 'number',
          placeholder: 'Tiempo en horas'
        },
        {
          name: 'motivoBaneo',
          type: 'text',
          placeholder: 'Motivo del baneo' // Nuevo campo para el mensaje
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Aceptar',
          handler: (data: { tiempoBaneo: any; motivoBaneo: string; }) => {
            const tiempoBaneo = data.tiempoBaneo;
            const motivo = data.motivoBaneo; // Obtener el motivo del baneo

            if (tiempoBaneo && tiempoBaneo > 0) {
              const fechaActual = new Date();
              const fechaBaneo = new Date(fechaActual.getTime() + (tiempoBaneo * 60 * 60 * 1000)); // Convertir horas a milisegundos

              // Concatenar el motivo ingresado con el texto "Baneado por administrador"
              const mensajeBaneo = motivo ? `${motivo} - Baneado por administrador` : 'Baneado por administrador';

              this.bd.insertarControl(tiempoBaneo, mensajeBaneo, usuarioId).then(() => {
                this.bd.presentToast('bottom', 'Usuario baneado correctamente.');
              }).catch(err => {
                console.error('Error al banear usuario:', err);
                this.bd.presentToast('bottom', 'Error al banear usuario.');
              });
            } else {
              this.bd.presentToast('bottom', 'Por favor ingresa un tiempo válido.');
            }
          }
        }
      ]
    });

    await alert.present();
  }
  // Método para solicitar el tiempo de baneo de una publicación
  async solicitarTiempoBaneoPublicacion(idPublicacion: number) {
    const alert = await this.alertController.create({
      header: 'Baneo de Publicación',
      inputs: [
        {
          name: 'tiempoBaneo',
          type: 'number',
          placeholder: 'Tiempo en horas'
        },
        {
          name: 'motivoBaneo',
          type: 'text',
          placeholder: 'Motivo del baneo'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Aceptar',
          handler: (data: { tiempoBaneo: any; motivoBaneo: string }) => {
            const tiempoBaneo = data.tiempoBaneo;
            const motivo = data.motivoBaneo;

            if (tiempoBaneo && tiempoBaneo > 0) {
              const mensajeBaneo = motivo ? `${motivo} - Baneado por administrador` : 'Baneado por administrador';

              this.bd.insertarControlPublicacion(tiempoBaneo, mensajeBaneo, idPublicacion).then(async () => {
                this.bd.presentToast('bottom', 'Publicación baneada correctamente.');

                // Programar y enviar notificación local sobre el baneo
                const mensajeNotificacion = `La publicación ha sido baneada por ${tiempoBaneo} horas. Motivo: ${motivo || 'No especificado'}.`;
                await LocalNotifications.schedule({
                  notifications: [
                    {
                      title: 'Publicación Baneada',
                      body: mensajeNotificacion,
                      id: 1,
                      schedule: { at: new Date(Date.now() + 1000 * 5) }, // Notificación después de 5 segundos
                      sound: undefined,
                      attachments: [],
                      actionTypeId: '',
                      extra: null,
                    },
                  ],
                });

                // Redirigir al inicio o recargar la página según sea necesario
                this.volverAlInicio();
              }).catch(err => {
                console.error('Error al banear la publicación:', err);
                this.bd.presentToast('bottom', 'Error al banear la publicación.');
              });
            } else {
              this.bd.presentToast('bottom', 'Por favor ingresa un tiempo válido.');
            }
          }
        }
      ]
    });

    await alert.present();
  }
  // Método para solicitar el tiempo de baneo de un comentario
  async solicitarTiempoBaneoComentario(idComentario: number) {
    const alert = await this.alertController.create({
      header: 'Baneo de Comentario',
      inputs: [
        {
          name: 'tiempoBaneo',
          type: 'number',
          placeholder: 'Tiempo en horas'
        },
        {
          name: 'motivoBaneo',
          type: 'text',
          placeholder: 'Motivo del baneo'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Aceptar',
          handler: (data: { tiempoBaneo: any; motivoBaneo: string }) => {
            const tiempoBaneo = data.tiempoBaneo;
            const motivo = data.motivoBaneo;

            if (tiempoBaneo && tiempoBaneo > 0) {
              const mensajeBaneo = motivo ? `${motivo} - Baneado por administrador` : 'Baneado por administrador';

              this.bd.insertarControlComentarios(tiempoBaneo, mensajeBaneo, idComentario).then(async () => {
                this.bd.presentToast('bottom', 'Comentario baneado correctamente.');

                // Programar y enviar notificación local sobre el baneo
                const mensajeNotificacion = `Tu comentario ha sido baneado por ${tiempoBaneo} horas. Motivo: ${motivo || 'No especificado'}.`;
                await LocalNotifications.schedule({
                  notifications: [
                    {
                      title: 'Comentario Baneado',
                      body: mensajeNotificacion,
                      id: 1,
                      schedule: { at: new Date(Date.now() + 1000 * 5) }, // Notificación después de 5 segundos
                      sound: undefined,
                      attachments: [],
                      actionTypeId: '',
                      extra: null,
                    },
                  ],
                });

                // Recargar los comentarios después de realizar el baneo
                this.cargarComentarios(this.arregloPublicacion.id_publicacion);
              }).catch(err => {
                console.error('Error al banear el comentario:', err);
                this.bd.presentToast('bottom', 'Error al banear el comentario.');
              });
            } else {
              this.bd.presentToast('bottom', 'Por favor ingresa un tiempo válido.');
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
