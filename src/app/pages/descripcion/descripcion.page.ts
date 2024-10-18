import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selectedOption!: string;
  fotoPredeterminada: string = "assets/icon/logo.png";
  categorias: any = {}; // Para almacenar los nombres de las categorías
  nombre_usuario: any;
  apellido_usuario: any;
  comentarios: any[] = []; // Arreglo propio para los comentarios
  rol_id_rol!: number;
  idUsuarioSeguir!: number;
  id_usuario!: number;
  fotoUrl!: string; // Nueva propiedad para almacenar la URL de la imagen


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

  openPopover(ev: any) {
    this.isPopoverOpen = true;
  }

  closePopover() {
    this.isPopoverOpen = false;
  }

  handleOption(option: string, idUsuarioSeguir: number) {
    idUsuarioSeguir = this.arregloPublicacion.usuario_id_usuario;
    this.closePopover();
    setTimeout(() => {
      if (option === 'option1') {
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
        // Opción para banear usuario
        this.solicitarTiempoBaneo(idUsuarioSeguir);
      } else if (option === 'option2') {
        // Lógica para seguir a un usuario
        this.storage.getItem('id_usuario').then(idUsuarioActual => {
          // Verificar si ya lo sigue
          this.bd.verificarSeguimiento(idUsuarioActual, idUsuarioSeguir).then(isFollowing => {
            if (!isFollowing) {
              // Si no lo sigue, agregar a la tabla seguimiento
              this.bd.insertarSeguidores(idUsuarioActual, idUsuarioSeguir).then(async () => {
                this.bd.presentToast('bottom', 'Se Ha Seguido Correctamente Al Usuario.');

                // Enviar notificación local
                await LocalNotifications.schedule({
                  notifications: [
                    {
                      title: '¡Nuevo Seguidor!',
                      body: `${this.nombre_usuario} te ha seguido.`,
                      id: 1,
                      schedule: { at: new Date(Date.now() + 1000 * 5) }, // Notificación después de 5 segundos
                      sound: undefined, // Omitir este campo
                      attachments: [], // O puedes dejarlo fuera si no lo usas
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
      }
    }, 0);
  }

  like(idPublicacion: number) {
    // Primero, actualizamos el número de likes en la base de datos
    this.bd.aumentarLike(idPublicacion).then(() => {
      this.bd.presentToast('bottom', 'Se Dio Like Correctamente.');
    }).catch(err => {
      console.error('Error al dar like:', err);
      this.bd.presentToast('bottom', 'Error al dar like.');
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
      this.bd.fetchComentarios().subscribe(comentarios => {
        this.comentarios = comentarios.filter(c => c.publicacion_id_publicacion === idPublicacion);
      });
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
}
