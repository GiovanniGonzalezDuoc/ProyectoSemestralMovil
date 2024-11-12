import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  id_usuario!: number;
  nombre_usuario: any;
  apellido_usuario: any;
  rol_id_rol!: number;
  fotoPredeterminada: string = "assets/icon/logo.png";
  
  seguidores: number = 0; // Variable para el número de seguidores
  siguiendo: number = 0; // Variable para el número de seguidos

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
  ];

  constructor(private router: Router, private storage: NativeStorage, private bd: ServicebdService) {
    this.bd.dbState().subscribe(data => {
      if (data) {
        // Obtener el ID del usuario antes de listar las publicaciones y seguidores
        this.storage.getItem('id_usuario').then(id => {
          this.id_usuario = id;

          // Llamar a la función listarPublicacionesID para cargar las publicaciones del usuario
          this.bd.listarPublicacionesID(this.id_usuario).then(() => {
            this.bd.fetchPublicacion().subscribe(publicaciones => {
              // Filtrar las publicaciones por el usuario actual
              this.arregloPublicacion = publicaciones.filter(p => p.usuario_id_usuario === this.id_usuario);
            });
          }).catch(err => {
            console.error('Error listando publicaciones:', err);
          });

          // Obtener número de seguidores
          this.bd.obtenerSeguidores(this.id_usuario).then(seguidores => {
            this.seguidores = seguidores;
            console.log('Número de seguidores:', seguidores); // Depuración
          }).catch(err => {
            console.error('Error obteniendo número de seguidores:', err);
          });

          // Obtener número de seguidos
          this.bd.obtenerSeguidos(this.id_usuario).then(seguidos => {
            this.siguiendo = seguidos;
            console.log('Número de seguidos:', seguidos); // Depuración
          }).catch(err => {
            console.error('Error obteniendo número de seguidos:', err);
          });
        }).catch(err => {
          console.error('Error obteniendo id_usuario:', err);
        });
      }
    });
    
    this.storage.getItem('rol_id_rol').then(id => {
      this.rol_id_rol = id;
    }).catch(err => {
      console.error('Error obteniendo rol_id_rol:', err);
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

  openSettings() {
    this.router.navigate(['/ajustes']);
  }
  openBanList(){
    this.router.navigate(['/lista-control-publicacion']);
  }
  openContact() {
    this.router.navigate(['/contacto']);
  }
  descripcion(x: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        publicacion: x 
      }
    };
    this.router.navigate(['/descripcion'], navigationExtras);
  }

  naviageToPerfil() {
    this.router.navigate(['/perfil']);
  }

  navigateToGuardados() {
    this.router.navigate(['/publicaciones-guardadas']);
  }
}
