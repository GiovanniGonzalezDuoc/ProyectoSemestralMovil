import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-perfil-seguidor',
  templateUrl: './perfil-seguidor.page.html',
  styleUrls: ['./perfil-seguidor.page.scss'],
})
export class PerfilSeguidorPage implements OnInit {
  arregloSeguidores: any; // Objeto que representa un solo seguidor
  id_usuario!: number;
  nombre_usuario: any;
  apellido_usuario: any;
  rol_id_rol!: number;
  fotoPredeterminada: string = "assets/icon/logo.png";

  seguidores: number = 0; // Variable para el número de seguidores
  siguiendo: number = 0; // Variable para el número de seguidos

  arregloPublicacion: any[] = []; // Arreglo para las publicaciones del seguidor

  constructor(private router: Router, private storage: NativeStorage, private bd: ServicebdService, private activedrouter: ActivatedRoute) {
    // Obtener el seguidor enviado desde ListadoSeguidoresPage
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.arregloSeguidores = this.router.getCurrentNavigation()?.extras?.state?.['informacion'];
      this.id_usuario = this.arregloSeguidores.id_usuario; // Obtener el ID del seguidor
    }

    this.storage.getItem('rol_id_rol').then(id => {
      this.rol_id_rol = id;
    }).catch(err => {
      console.error('Error obteniendo rol_id_rol:', err);
    });
  }

  ngOnInit() {
    // Cargar datos del usuario seleccionado
    if (this.arregloSeguidores) {
      this.nombre_usuario = this.arregloSeguidores.nombre_usuario;
      this.apellido_usuario = this.arregloSeguidores.apellido_usuario;

      // Cargar publicaciones del seguidor
      this.cargarPublicaciones();

      // Obtener número de seguidores y seguidos
      this.obtenerSeguidoresYSeguidos();
    }
  }

  // Función para cargar las publicaciones del seguidor
  async cargarPublicaciones() {
    try {
      // Obtener las publicaciones del seguidor
      await this.bd.listarPublicacionesID(this.id_usuario);
      this.bd.fetchPublicacion().subscribe(publicaciones => {
        // Filtrar las publicaciones por el ID del seguidor
        this.arregloPublicacion = publicaciones.filter(p => p.usuario_id_usuario === this.id_usuario);
      });
    } catch (err) {
      console.error('Error listando publicaciones:', err);
    }
  }

  // Función para obtener el número de seguidores y seguidos del seguidor
  async obtenerSeguidoresYSeguidos() {
    try {
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
    } catch (err) {
      console.error('Error obteniendo seguidores y seguidos:', err);
    }
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
