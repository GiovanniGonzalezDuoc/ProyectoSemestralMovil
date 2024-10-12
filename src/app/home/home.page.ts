import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicebdService } from '../services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
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
  rol_id_rol!:number;
  categorias: any = {};
  // Variable que contendrá la foto predeterminada
  fotoPredeterminada: string = "assets/icon/logo.png";

  constructor(private router: Router, private bd: ServicebdService, private storage:NativeStorage) {
    this.bd.dbState().subscribe(data => {
      //validar si la bd esta lista
      if (data) {
        //subscribir al observable de la listaRoles
        this.bd.fetchPublicacion().subscribe(res => {
          this.arregloPublicacion = res;
          this.loadCategoriaNames();
        })
      }
    })
    this.storage.getItem('rol_id_rol').then(id => {
      this.rol_id_rol = id;
    }).catch(err => {
      console.error('Error obteniendo id_usuario:', err);
    });
  }
  loadCategoriaNames() {
    this.bd.fetchCategorias().subscribe(categorias => {
      categorias.forEach(categoria => {
        this.categorias[categoria.id_categoria] = categoria.nombre_categoria; // Suponiendo que tu categoría tiene propiedades id_categoria y nombre
      });
    });
  }

  // Método para navegar a la descripción de la publicación
  comentario(id: number) {
    this.router.navigate(['/descripcion', id]);
  }

  // Método para likear el post
  like(idPublicacion: number) {
    // Primero, actualizamos el número de likes en la base de datos
    this.bd.aumentarLike(idPublicacion).then(() => {
      this.bd.presentToast('bottom', 'Se Dio Like Correctamente.');
    }).catch(err => {
      console.error('Error al dar like:', err);
      this.bd.presentToast('bottom', 'Error al dar like.');
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

}
