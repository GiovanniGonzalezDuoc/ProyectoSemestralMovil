import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-comentario',
  templateUrl: './modificar-comentario.page.html',
  styleUrls: ['./modificar-comentario.page.scss'],
})
export class ModificarComentarioPage implements OnInit {
  arregloComentario:any;
  id_usuario!: number;
  rol_id_rol!: number;
  foto!: any;


  constructor(
    private router: Router,
    private bd: ServicebdService,
    private storage: NativeStorage,
    private activedrouter:ActivatedRoute,
  ) {
    this.activedrouter.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.arregloComentario = this.router.getCurrentNavigation()?.extras?.state?.['comentario'];
      }
    });
   }

  ngOnInit() {
    // Recuperar datos del usuario almacenados en NativeStorage
    this.storage.getItem('id_usuario').then(id => {
      this.id_usuario = id;
    }).catch(err => {
      console.error('Error obteniendo id_usuario:', err);
    });
    this.storage.getItem('rol_id_rol').then(id => {
      this.rol_id_rol = id;
    }).catch(err => {
      console.error('Error obteniendo id_usuario:', err);
    });
  }

  modificar(){
    this.bd.modificarComentario(this.arregloComentario.id_comentario,this.arregloComentario.nombre_usuario_comentario,this.arregloComentario.comentario_publicacion)
  }

}
