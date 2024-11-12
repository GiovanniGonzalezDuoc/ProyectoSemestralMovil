import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-publicacion',
  templateUrl: './modificar-publicacion.page.html',
  styleUrls: ['./modificar-publicacion.page.scss'],
})
export class ModificarPublicacionPage implements OnInit {

  arregloPublicacion: any = {};  // Asegúrate de inicializar el objeto
  id_usuario!: number;
  nombre_usuario: any;
  apellido_usuario: any;
  categorias: any[] = [];  // Aquí se almacenarán las categorías desde la BD
  categoriasSeleccionadas: number[] = [];  // Para las categorías seleccionadas
  rol_id_rol!: number;
  foto!: any;

  constructor(
    private router: Router,
    private bd: ServicebdService,
    private storage: NativeStorage,
    private activedrouter: ActivatedRoute
  ) {
    this.activedrouter.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.arregloPublicacion = this.router.getCurrentNavigation()?.extras?.state?.['publicacion'];
      }
    });
  }

  ngOnInit() {
    this.listarCategorias();
    this.categoriasSeleccionadas = this.arregloPublicacion.categoria_publicacion_id_categoria;

    // Recuperar datos del usuario almacenados en NativeStorage
    this.storage.getItem('id_usuario').then(id => {
      this.id_usuario = id;
      this.arregloPublicacion.id_usuario = id;
    }).catch(err => {
      console.error('Error obteniendo id_usuario:', err);
    });

    this.storage.getItem('nombre_usuario').then(nombre => {
      this.nombre_usuario = nombre;
      this.arregloPublicacion.nombre_usuario = nombre;
    }).catch(err => {
      console.error('Error obteniendo nombre_usuario:', err);
    });

    this.storage.getItem('apellido_usuario').then(apellido => {
      this.apellido_usuario = apellido;
      this.arregloPublicacion.apellido_usuario = apellido;
    }).catch(err => {
      console.error('Error obteniendo apellido_usuario:', err);
    });

    this.storage.getItem('rol_id_rol').then(id => {
      this.rol_id_rol = id;
      this.arregloPublicacion.rol_id_rol = id;
    }).catch(err => {
      console.error('Error obteniendo id_rol:', err);
    });
  }
  listarCategorias() {
    this.bd.fetchCategorias().subscribe(categoria => {
      this.categorias = categoria;
    });
  }

  publicar() {
    if (this.arregloPublicacion.titulo_publicacion === "" || this.arregloPublicacion.descripcion_publicacion === "" || this.categoriasSeleccionadas.length === 0) {
      this.bd.presentAlert("La Publicación está incompleta.", "Favor de rellenar todos los campos de la publicación.");
      return;
    }

    const categoria_publicacion = this.categoriasSeleccionadas[0]; // Asume que la publicación puede tener solo una categoría por ahora
    const id_usuario = this.arregloPublicacion.id_usuario;
    const foto = this.arregloPublicacion.foto;

    const publicacionData = {
      nombre_usuario_publicacion: `${this.arregloPublicacion.nombre_usuario || ''} ${this.arregloPublicacion.apellido_usuario || ''}`.trim(),
      titulo_publicacion: this.arregloPublicacion.titulo_publicacion,
      descripcion_publicacion: this.arregloPublicacion.descripcion_publicacion,
      categoria_publicacion: categoria_publicacion,
      id_usuario,
      foto
    };

    // Llamada a modificarPublicaciones con los argumentos requeridos
    this.bd.modificarPublicaciones(
      this.arregloPublicacion.id_publicacion,
      publicacionData.titulo_publicacion,
      publicacionData.descripcion_publicacion,
      publicacionData.categoria_publicacion,
      publicacionData.foto
    ).then(() => {
      this.bd.presentToast('bottom', 'Publicación modificada correctamente.');
      this.router.navigate(['/home']);
    }).catch(err => {
      console.error(err);
    });
  }

  // Función para tomar la foto
  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
  
    // Guarda la ruta de la imagen
    this.arregloPublicacion.foto = image.webPath;
  };
}
