import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-publicaciones-guardadas',
  templateUrl: './publicaciones-guardadas.page.html',
  styleUrls: ['./publicaciones-guardadas.page.scss'],
})
export class PublicacionesGuardadasPage implements OnInit {
  id_usuario!: number;
  nombre_usuario: any;
  apellido_usuario: any;
  rol_id_rol!: number;
  fotoPredeterminada: string = "assets/icon/logo.png";

  seguidores: number = 0;
  siguiendo: number = 0;

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
    },
  ];

  constructor(
    private router: Router,
    private storage: NativeStorage,
    private bd: ServicebdService
  ) {
    this.bd.dbState().subscribe(data => {
      if (data) {
        this.storage.getItem('id_usuario').then(id => {
          this.id_usuario = id;

          // Obtener las publicaciones guardadas para el usuario actual
          this.bd.listarGuardado().then(guardados => {
            const publicacionIds = guardados
              .filter(g => g.usuario_id_usuario === this.id_usuario)
              .map(g => g.publicacion_id_publicacion);

            // Listar todas las publicaciones y filtrar las guardadas
            this.bd.listarPublicaciones().then(() => {
              this.bd.fetchPublicacion().subscribe(publicaciones => {
                this.arregloPublicacion = publicaciones.filter(
                  p => publicacionIds.includes(p.id_publicacion)
                );
              });
            }).catch(err => {
              console.error('Error listando publicaciones:', err);
            });
          }).catch(err => {
            console.error('Error listando publicaciones guardadas:', err);
          });

          // Obtener número de seguidores
          this.bd.obtenerSeguidores(this.id_usuario).then(seguidores => {
            this.seguidores = seguidores;
            console.log('Número de seguidores:', seguidores);
          }).catch(err => {
            console.error('Error obteniendo número de seguidores:', err);
          });

          // Obtener número de seguidos
          this.bd.obtenerSeguidos(this.id_usuario).then(seguidos => {
            this.siguiendo = seguidos;
            console.log('Número de seguidos:', seguidos);
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

  openContact() {
    this.router.navigate(['/contacto']);
  }

  descripcion(x: any) {
    let navigationExtras: NavigationExtras = {
      state: { publicacion: x }
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
