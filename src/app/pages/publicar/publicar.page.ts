import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.page.html',
  styleUrls: ['./publicar.page.scss'],
})
export class PublicarPage implements OnInit {
  Titulo: string = "";
  Contenido: string = "";
  id_usuario!: number;
  nombre_usuario: any;
  apellido_usuario: any;
  categorias: any[] = []; // Aquí se almacenarán las categorías desde la BD
  categoriasSeleccionadas: number[] = []; // Para las categorías seleccionadas

  constructor(
    private router: Router, 
    private bd: ServicebdService,
    private storage: NativeStorage
  ) {}

  ngOnInit() {
    // Cargar las categorías desde la BD
    this.bd.fetchCategorias().subscribe(categorias => {
      this.categorias = categorias;
    });

    // Recuperar datos del usuario almacenados en NativeStorage
    this.storage.getItem('id_usuario').then(id => {
      this.id_usuario = id;
    }).catch(err => {
      console.error('Error obteniendo id_usuario:', err);
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
  }

  publicar() {
    if (this.Titulo === "" || this.Contenido === "" || this.categoriasSeleccionadas.length === 0) {
      this.bd.presentAlert("La Publicación está incompleta.", "Favor de rellenar todos los campos de la publicación.");
      return;
    }

    const categoria_publicacion = this.categoriasSeleccionadas[0];
    const id_usuario = this.id_usuario;
    
    const publicacionData = {
      nombre_usuario_publicacion: `${this.nombre_usuario || ''} ${this.apellido_usuario || ''}`.trim(),
      titulo_publicacion: this.Titulo,
      descripcion_publicacion: this.Contenido,
      categoria_publicacion: categoria_publicacion,
      id_usuario
    };

    // Llamada a insertarPublicacion con los argumentos requeridos
    this.bd.insertarPublicacion(
      publicacionData.nombre_usuario_publicacion,
      publicacionData.titulo_publicacion,
      publicacionData.descripcion_publicacion,
      publicacionData.categoria_publicacion,
      publicacionData.id_usuario // El quinto argumento
    ).then(() => {
      this.bd.presentToast('bottom', 'Se publicó correctamente.');
      this.router.navigate(['/home']);
    }).catch(err => {
      console.error(err);
    });
  }  
}
