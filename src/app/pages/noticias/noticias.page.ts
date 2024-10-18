import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ApiService } from 'src/app/services/api.service';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  arregloNoticias: any = []; // Para almacenar las noticias
  rol_id_rol!: number; // Para almacenar el rol del usuario
  fotoPredeterminada: string = "assets/icon/logo.png";

  constructor(
    private router: Router, 
    private bd: ServicebdService, 
    private storage: NativeStorage,
    private api: ApiService
  ) {
    this.api.getPosts().subscribe(
      (res) => {
        // Ordenamos las noticias por id_publicacion en orden descendente
        this.arregloNoticias = res.sort((a: any, b: any) => b.id_publicacion - a.id_publicacion);
      },
      (err: string) => {
        this.bd.presentAlert('Información', 'Error: ' + err);
      }
    );
  }

  ngOnInit() {
    this.storage.getItem('rol_id_rol').then(res=>{
      this.rol_id_rol = res;
    })
  }

  descripcion(noticia: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        Noticias: noticia // Pasamos la noticia seleccionada a la página de descripción
      }
    };
    this.router.navigate(['/descripcion-noticias'], navigationExtras);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToNoticias() {
    this.router.navigate(['/noticias']);
  }
}
