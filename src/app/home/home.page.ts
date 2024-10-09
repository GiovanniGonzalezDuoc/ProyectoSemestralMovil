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

  // Método para guardar el post
  guardar() {
    this.bd.presentToast('bottom', 'El Post Se Guardó Correctamente.');
  }

  // Método para dar like
  like() {
    this.bd.presentToast('bottom', 'Se Dio Like Correctamente.');
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
