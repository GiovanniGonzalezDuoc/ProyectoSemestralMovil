import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  id_usuario!:number;
  nombre_usuario:any;
  apellido_usuario:any;
  rol_id_rol!:number;
  fotoPredeterminada: string = "assets/icon/logo.png";

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
  categorias: any = {};

  constructor(private router:Router, private storage:NativeStorage, private bd:ServicebdService) {
    this.bd.dbState().subscribe(data => {
      // Validar si la base de datos está lista
      if (data) {
        // Obtener el ID del usuario antes de listar las publicaciones
        this.storage.getItem('id_usuario').then(id => {
          this.id_usuario = id;

          // Llamar a la función listarPublicacionesID para cargar las publicaciones del usuario
          this.bd.listarPublicacionesID(this.id_usuario).then(() => {
            // Suscribirse al observable de fetchPublicacion
            this.bd.fetchPublicacion().subscribe(publicaciones => {
              // Filtrar las publicaciones por el usuario actual
              this.arregloPublicacion = publicaciones.filter(p => p.usuario_id_usuario === this.id_usuario);
            });
          }).catch(err => {
            console.error('Error listando publicaciones:', err);
          });

        }).catch(err => {
          console.error('Error obteniendo id_usuario:', err);
        });
      }
    });
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

  ngOnInit() {
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
  }

  openSettings(){
    this.router.navigate(['/ajustes']);
  }
  openContact(){
    this.router.navigate(['/contacto'])
  }
}
