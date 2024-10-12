import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.page.html',
  styleUrls: ['./descripcion.page.scss'],
})
export class DescripcionPage implements OnInit {
  arregloPublicacion: any;
  likes: number = 25;
  nuevoComentario: string = '';
  isPopoverOpen = false;
  selectedOption!: string;
  fotoPredeterminada: string = "assets/icon/logo.png";
  categorias: any = {}; // Para almacenar los nombres de las categorías
  nombre_usuario: any;
  apellido_usuario: any;
  comentarios: any[] = []; // Arreglo propio para los comentarios
  rol_id_rol!:number;
  constructor(private router: Router, private activedrouter: ActivatedRoute, private bd: ServicebdService, private storage: NativeStorage) {
    this.activedrouter.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.arregloPublicacion = this.router.getCurrentNavigation()?.extras?.state?.['publicacion'];
      }
    });
  }

  ngOnInit() {
    this.bd.fetchCategorias().subscribe(categorias => {
      categorias.forEach(categoria => {
        this.categorias[categoria.id_categoria] = categoria.nombre_categoria;
      });
    });

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
    this.storage.getItem('rol_id_rol').then(id => {
      this.rol_id_rol = id;
    }).catch(err => {
      console.error('Error obteniendo id_usuario:', err);
    });

    if (this.arregloPublicacion) {
      this.cargarComentarios(this.arregloPublicacion.id_publicacion);
    }
  }

  openPopover(ev: any) {
    this.isPopoverOpen = true;
  }

  closePopover() {
    this.isPopoverOpen = false;
  }

  handleOption(option: string) {
    this.closePopover();
    setTimeout(() => {
      if (option === 'option1') {
        this.bd.presentToast('bottom', 'El Post Se Eliminó Correctamente.');
        this.volverAlInicio(); 
      } else if (option === 'option2') {
        this.bd.presentToast('bottom', 'Se Ha Seguido Correctamente Al Usuario.');
        this.volverAlInicio(); 
      }
    }, 0);
  }

  like() {
    this.bd.presentToast('bottom', 'Se Dio Like Correctamente.');
  }

  guardar() {
    this.bd.presentToast('bottom', 'El Post Se Guardó Correctamente.');
  }

  agregarComentario() {
    if (this.nuevoComentario.trim().length > 0) {
      const idPublicacion = this.arregloPublicacion.id_publicacion;
      const nombreUsuario = `${this.nombre_usuario || ''} ${this.apellido_usuario || ''}`.trim();
  
      // Inserta el comentario en la base de datos
      this.bd.insertarComentario(nombreUsuario, this.nuevoComentario, idPublicacion).then(() => {
        // Limpiar el textarea después de agregar el comentario
        this.nuevoComentario = '';
  
        // Recargar los comentarios
        this.cargarComentarios(idPublicacion);
  
        this.bd.presentToast('bottom', 'Comentario agregado correctamente.');
      }).catch(() => {
        this.bd.presentToast('bottom', 'Error al agregar el comentario.');
      });
    } else {
      this.bd.presentToast('bottom', 'No puedes agregar un comentario vacío.');
    }
  }
  comentario(){}

  cargarComentarios(idPublicacion: number) {
    this.bd.listarComentariosID(idPublicacion).then(() => {
      this.bd.fetchComentarios().subscribe(comentarios => {
        this.comentarios = comentarios.filter(c => c.publicacion_id_publicacion === idPublicacion);
      });
    });
  }

  volverAlInicio() {
    this.router.navigate(['/home']).then(() => {
      this.bd.fetchPublicacion().subscribe(publicaciones => {
        this.arregloPublicacion = publicaciones;
      });
    });
  }
}
