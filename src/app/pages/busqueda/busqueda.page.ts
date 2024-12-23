import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ToastController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {
  arregloPublicacion: any = [
    {
      id_publicacion: '',
      nombre_usuario_publicacion: '',
      titulo_publicacion: '',
      descripcion_publicacion: '',
      like_publicacion: '',
      fecha_publicacion: '',
      usuario_id_usuario: '',
      categoria_publicacion_id_categoria: '',
    }
  ]
  rol_id_rol!: number;
  categorias: any = {};
  // Variable que contendrá la foto predeterminada
  fotoPredeterminada: string = "assets/icon/logo.png";
  categoriaId!: number;

  constructor(private router: Router, private bd: ServicebdService, private storage: NativeStorage, private activedrouter: ActivatedRoute) {
    // Escuchar los parámetros del router y obtener el id_categoria
    this.activedrouter.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.categoriaId = this.router.getCurrentNavigation()?.extras?.state?.['id_categoria'];
        // Llamar a loadPublicaciones después de que tengamos la categoría
        this.loadPublicaciones();
      }
    });

    // Verificar si la base de datos está lista antes de cargar las categorías
    this.bd.dbState().subscribe(data => {
      if (data) {
        this.loadCategoriaNames();  // Cargar los nombres de las categorías
      }
    });

    // Obtener el rol del usuario
    this.storage.getItem('rol_id_rol').then(id => {
      this.rol_id_rol = id;
    }).catch(err => {
      console.error('Error obteniendo rol_id_rol:', err);
    });
    this.loadAllPublicaciones()
  }
  ngOnInit() {

  }
  // Cargar las publicaciones de la categoría seleccionada
  loadPublicaciones() {
    if (this.categoriaId) {
      console.log("Cargando publicaciones para la categoría:", this.categoriaId); // Confirmación
      // Llamar a la función listarPublicacionesCategorias y pasarle el id_categoria
      this.bd.listarPublicacionesCategorias(this.categoriaId).then(() => {
        this.bd.fetchPublicacion().subscribe(res => {
          this.arregloPublicacion = res;
        });
      }).catch(err => {
        this.bd.presentAlert('Error al listar publicaciones:', err);
      });
    } else {
      this.bd.presentAlert('No se seleccionó ninguna categoría.', '');
    }
  }
  loadAllPublicaciones() {
    const publicacionesObservable = this.bd.fetchPublicacion();
    if (publicacionesObservable) {
      publicacionesObservable.subscribe(res => {
        this.arregloPublicacion = res;
      }, err => {
        console.error('Error al obtener publicaciones:', err);
      });
    } else {
      console.error('fetchPublicacion() retornó undefined o null');
    }
  }

  loadCategoriaNames() {
    this.bd.fetchCategorias().subscribe(categorias => {
      categorias.forEach(categoria => {
        this.categorias[categoria.id_categoria] = categoria.nombre_categoria; // Suponiendo que tu categoría tiene propiedades id_categoria y nombre
      });
    });
  }

  // Método para navegar a la descripción de la publicación
  comentario(publicacion: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        publicacion: publicacion // Pasamos la publicación completa
      }
    };
    this.router.navigate(['/descripcion'], navigationExtras);
  }

  // Método para likear el post con límite de un like por usuario
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
        if (!likes.includes(idPublicacion)) {
          // Si no ha dado like, aumentamos el número de likes en la base de datos
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
          this.bd.presentToast('bottom', 'Ya has dado like a este post.');
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
  // Método para Guardar El post
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
  descripcion(x: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        publicacion: x
      }
    };
    this.router.navigate(['/descripcion'], navigationExtras);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToNoticias() {
    this.router.navigate(['/noticias']);
  }
}
