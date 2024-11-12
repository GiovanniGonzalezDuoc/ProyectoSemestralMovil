import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-lista-control-publicacion',
  templateUrl: './lista-control-publicacion.page.html',
  styleUrls: ['./lista-control-publicacion.page.scss'],
})
export class ListaControlPublicacionPage implements OnInit {

  arregloPublicacion: any[] = [];
  publicacionesban: any = {}; // Cambiar a un objeto para asociar publicaciones baneadas por ID
  rol_id_rol!: number;
  categorias: any = {};
  fotoPredeterminada: string = "assets/icon/logo.png";

  constructor(private router: Router, private bd: ServicebdService, private storage: NativeStorage) {
    this.storage.getItem('id_usuario').then(idUsuario => {
      this.bd.dbState().subscribe(data => {
        if (data) {
          this.bd.fetchControlPublicaciones().subscribe(banpubli => {
            this.bd.fetchPublicacion().subscribe(res => {
              this.arregloPublicacion = res.filter(publicacion => 
                banpubli.some(ban => 
                  ban.publicacion_id_publicacion === publicacion.id_publicacion &&
                  publicacion.usuario_id_usuario === idUsuario
                )
              );
              this.loadCategoriaNames();
              this.loadBanList(banpubli); // Pasamos el listado de publicaciones baneadas
            });
          });
        }
      });
    }).catch(err => {
      this.bd.presentAlert('Error obteniendo id_usuario:', err);
    });

    this.storage.getItem('rol_id_rol').then(id => {
      this.rol_id_rol = id;
    }).catch(err => {
      console.error('Error obteniendo rol_id_rol:', err);
    });
  }

  ngOnInit() {}

  loadCategoriaNames() {
    this.bd.fetchCategorias().subscribe(categorias => {
      categorias.forEach(categoria => {
        this.categorias[categoria.id_categoria] = categoria.nombre_categoria;
      });
    });
  }

  loadBanList(banpubli: any[]) {
    // Asociamos la información de baneo con cada publicación por su ID
    banpubli.forEach(ban => {
      this.publicacionesban[ban.publicacion_id_publicacion] = {
        motivo: ban.motivo_veto_publicacion,
        fechaDesbaneo: ban.fecha_veto_publicacion,
        tiempo: ban.tiempo_veto_publicacion,
      };
    });
  }

  navigateToPublicacion() {
    this.router.navigate(['/lista-control-publicacion']);
  }

  navigateToComentario() {
    this.router.navigate(['/lista-control-comentario']);
  }
}
