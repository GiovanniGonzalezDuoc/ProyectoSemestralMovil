import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-lista-control-comentario',
  templateUrl: './lista-control-comentario.page.html',
  styleUrls: ['./lista-control-comentario.page.scss'],
})
export class ListaControlComentarioPage implements OnInit {

  arregloComentarios: any[] = [];
  comentariosBan: any = {}; // Guardará los detalles de baneo por ID de comentario
  rol_id_rol!: number;
  categorias: any = {};
  fotoPredeterminada: string = "assets/icon/logo.png";

  constructor(private router: Router, private bd: ServicebdService, private storage: NativeStorage) {
    this.storage.getItem('id_usuario').then(idUsuario => {
      this.bd.dbState().subscribe(data => {
        if (data) {
          this.bd.fetchControlComentarios().subscribe(banComentarios => {
            this.bd.fetchPublicacion().subscribe(publicaciones => {
              this.bd.fetchComentarios().subscribe(comentarios => {
                this.arregloComentarios = comentarios.filter(comentario => {
                  const isBanned = banComentarios.some(ban => ban.comentario_id_comentario === comentario.id_comentario);
                  const perteneceAlUsuario = publicaciones.some(publicacion => 
                    publicacion.id_publicacion === comentario.publicacion_id_publicacion &&
                    publicacion.usuario_id_usuario === idUsuario
                  );
                  return isBanned && perteneceAlUsuario;
                });
                this.loadCategoriaNames();
                this.loadBanList(banComentarios);
              });
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

  loadBanList(banComentarios: any[]) {
    banComentarios.forEach(ban => {
      this.comentariosBan[ban.comentario_id_comentario] = {
        motivo: ban.motivo_veto_comentario,
        fechaDesbaneo: ban.fecha_veto_comentario,
        tiempo: ban.tiempo_veto_comentario,
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
