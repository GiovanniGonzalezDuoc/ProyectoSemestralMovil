import { Component, OnInit } from '@angular/core';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { NavigationExtras, Router } from '@angular/router';
import { Seguimiento } from 'src/app/models/seguimiento';

@Component({
  selector: 'app-listado-seguidores',
  templateUrl: './listado-seguidores.page.html',
  styleUrls: ['./listado-seguidores.page.scss'],
})
export class ListadoSeguidoresPage implements OnInit {
  arregloSeguidores: any[] = [];  // Aquí se almacenarán los seguidores
  id_usuario!: number;  // ID del usuario actual
  fotoPredeterminada: string = "assets/icon/logo.png";
  rol_id_rol!: number;

  constructor(private router: Router, private bd: ServicebdService, private storage: NativeStorage) { }

  ngOnInit() {
    // Obtener el id del usuario desde NativeStorage
    this.storage.getItem('id_usuario').then((id: number) => {
      this.id_usuario = id;
      this.cargarSeguidores();  // Cargar los seguidores del usuario actual
    }).catch(err => {
      console.error('Error obteniendo id_usuario:', err);
    });

    this.storage.getItem('rol_id_rol').then(id => {
      this.rol_id_rol = id;
    }).catch(err => {
      console.error('Error obteniendo rol_id_rol:', err);
    });
  }

  // Función para cargar los seguidores del usuario actual
  async cargarSeguidores() {
    if (this.id_usuario) {
      try {
        const seguidores = await this.bd.listarSeguimientos(this.id_usuario);
        if (seguidores) {
          await this.loadSeguidoresNames(seguidores);  // Cargar los nombres de los seguidores
        }
      } catch (err) {
        console.error('Error al listar seguidores:', err);
      }
    }
  }

  // Función para cargar los nombres de los seguidores
  async loadSeguidoresNames(seguidores: Seguimiento[]) { // Asegúrate de que "Seguimiento" sea el tipo correcto
    for (const seguidor of seguidores) {
      const usuario = await this.bd.listarUsuarioID(seguidor.usuario_id_usuario);
      if (usuario) {
        this.arregloSeguidores.push({
          id_usuario: usuario.id_usuario,
          nombre_usuario: usuario.nombre_usuario,
          apellido_usuario: usuario.apellido_usuario,
        });
      }
    }
  }

  // Navegar al perfil del seguidor seleccionado
  perfil(x: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        informacion:x
      }
    };
    this.router.navigate(['/perfil-seguidor'], navigationExtras);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToNoticias() {
    this.router.navigate(['/noticias']);
  }
}
